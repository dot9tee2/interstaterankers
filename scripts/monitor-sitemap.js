import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to check sitemap accessibility
async function checkSitemapAccessibility() {
  const sitemapUrl = 'https://interstaterankers.com/sitemap.xml';
  
  try {
    console.log('🔍 Checking sitemap accessibility...');
    
    const response = await fetch(sitemapUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const content = await response.text();
    const urlCount = (content.match(/<url>/g) || []).length;
    
    console.log(`✅ Sitemap is accessible`);
    console.log(`   • URL: ${sitemapUrl}`);
    console.log(`   • Status: ${response.status} ${response.statusText}`);
    console.log(`   • Size: ${content.length} bytes`);
    console.log(`   • URLs: ${urlCount}`);
    
    return {
      accessible: true,
      status: response.status,
      size: content.length,
      urlCount,
      content
    };
  } catch (error) {
    console.error(`❌ Sitemap accessibility check failed: ${error.message}`);
    return {
      accessible: false,
      error: error.message
    };
  }
}

// Function to check robots.txt
async function checkRobotsTxt() {
  const robotsUrl = 'https://interstaterankers.com/robots.txt';
  
  try {
    console.log('🤖 Checking robots.txt...');
    
    const response = await fetch(robotsUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const content = await response.text();
    const hasSitemapReference = content.includes('Sitemap:');
    
    console.log(`✅ Robots.txt is accessible`);
    console.log(`   • URL: ${robotsUrl}`);
    console.log(`   • Status: ${response.status} ${response.statusText}`);
    console.log(`   • Sitemap referenced: ${hasSitemapReference ? 'Yes' : 'No'}`);
    
    if (hasSitemapReference) {
      const sitemapLine = content.split('\n').find(line => line.includes('Sitemap:'));
      console.log(`   • Sitemap line: ${sitemapLine?.trim()}`);
    }
    
    return {
      accessible: true,
      status: response.status,
      hasSitemapReference,
      content
    };
  } catch (error) {
    console.error(`❌ Robots.txt check failed: ${error.message}`);
    return {
      accessible: false,
      error: error.message
    };
  }
}

// Function to validate sitemap structure
function validateSitemapStructure(content) {
  const issues = [];
  
  // Check XML declaration
  if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    issues.push('Missing XML declaration');
  }
  
  // Check namespace
  if (!content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    issues.push('Missing sitemap namespace');
  }
  
  // Check urlset tags
  if (!content.includes('<urlset') || !content.includes('</urlset>')) {
    issues.push('Invalid urlset structure');
  }
  
  // Count URLs
  const urlCount = (content.match(/<url>/g) || []).length;
  const locCount = (content.match(/<loc>/g) || []).length;
  const lastmodCount = (content.match(/<lastmod>/g) || []).length;
  const changefreqCount = (content.match(/<changefreq>/g) || []).length;
  const priorityCount = (content.match(/<priority>/g) || []).length;
  
  if (locCount !== urlCount) {
    issues.push(`Mismatch: ${urlCount} URLs but ${locCount} locations`);
  }
  
  // Check for duplicate URLs
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlPattern.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicateUrls.length > 0) {
    issues.push(`Duplicate URLs found: ${[...new Set(duplicateUrls)].join(', ')}`);
  }
  
  // Check for invalid URLs
  const invalidUrls = [];
  urls.forEach(url => {
    try {
      new URL(url);
    } catch (e) {
      invalidUrls.push(url);
    }
  });
  
  if (invalidUrls.length > 0) {
    issues.push(`Invalid URLs found: ${invalidUrls.join(', ')}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    stats: {
      urlCount,
      locCount,
      lastmodCount,
      changefreqCount,
      priorityCount
    }
  };
}

// Function to generate monitoring report
function generateReport(sitemapCheck, robotsCheck, validation) {
  const report = {
    timestamp: new Date().toISOString(),
    sitemap: sitemapCheck,
    robots: robotsCheck,
    validation: validation,
    overall: {
      status: 'unknown',
      issues: []
    }
  };
  
  // Determine overall status
  if (!sitemapCheck.accessible) {
    report.overall.status = 'critical';
    report.overall.issues.push('Sitemap not accessible');
  } else if (!robotsCheck.accessible) {
    report.overall.status = 'warning';
    report.overall.issues.push('Robots.txt not accessible');
  } else if (!robotsCheck.hasSitemapReference) {
    report.overall.status = 'warning';
    report.overall.issues.push('Sitemap not referenced in robots.txt');
  } else if (!validation.isValid) {
    report.overall.status = 'warning';
    report.overall.issues.push(...validation.issues);
  } else {
    report.overall.status = 'healthy';
  }
  
  return report;
}

// Function to save report
function saveReport(report) {
  const reportsDir = path.join(process.cwd(), 'sitemap-reports');
  
  // Create reports directory if it doesn't exist
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const filename = `sitemap-monitor-${new Date().toISOString().split('T')[0]}.json`;
  const filepath = path.join(reportsDir, filename);
  
  // Read existing reports for this date
  let existingReports = [];
  if (fs.existsSync(filepath)) {
    try {
      existingReports = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    } catch (error) {
      console.log('⚠️ Could not read existing reports, creating new file');
    }
  }
  
  // Add new report
  existingReports.push(report);
  
  // Keep only last 30 reports
  if (existingReports.length > 30) {
    existingReports = existingReports.slice(-30);
  }
  
  // Save reports
  fs.writeFileSync(filepath, JSON.stringify(existingReports, null, 2));
  
  console.log(`📊 Report saved to: ${filepath}`);
  
  return filepath;
}

// Main monitoring function
async function monitorSitemap() {
  console.log('🔍 Starting sitemap monitoring...\n');
  
  // Check sitemap accessibility
  const sitemapCheck = await checkSitemapAccessibility();
  
  // Check robots.txt
  const robotsCheck = await checkRobotsTxt();
  
  // Validate sitemap structure
  let validation = { isValid: false, issues: ['Sitemap not accessible'], stats: {} };
  if (sitemapCheck.accessible) {
    validation = validateSitemapStructure(sitemapCheck.content);
  }
  
  // Generate report
  const report = generateReport(sitemapCheck, robotsCheck, validation);
  
  // Display results
  console.log('\n📋 Monitoring Results:');
  console.log(`   • Overall Status: ${report.overall.status.toUpperCase()}`);
  
  if (report.overall.issues.length > 0) {
    console.log('   • Issues:');
    report.overall.issues.forEach(issue => {
      console.log(`     - ${issue}`);
    });
  } else {
    console.log('   • No issues found');
  }
  
  // Save report
  const reportPath = saveReport(report);
  
  // Exit with appropriate code
  if (report.overall.status === 'critical') {
    console.log('\n❌ Critical issues found. Immediate attention required.');
    process.exit(1);
  } else if (report.overall.status === 'warning') {
    console.log('\n⚠️ Warning issues found. Review recommended.');
    process.exit(0);
  } else {
    console.log('\n✅ All checks passed. Sitemap is healthy.');
    process.exit(0);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  monitorSitemap().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

export { monitorSitemap, checkSitemapAccessibility, checkRobotsTxt, validateSitemapStructure };
