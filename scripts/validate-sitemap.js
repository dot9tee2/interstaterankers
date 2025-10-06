import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to validate sitemap XML structure
function validateSitemapXML(xmlContent) {
  const errors = [];
  const warnings = [];
  
  // Check XML declaration
  if (!xmlContent.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
    errors.push('Missing XML declaration');
  }
  
  // Check for proper namespace
  if (!xmlContent.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    errors.push('Missing sitemap namespace');
  }
  
  // Check for urlset tags
  if (!xmlContent.includes('<urlset') || !xmlContent.includes('</urlset>')) {
    errors.push('Invalid sitemap structure - missing urlset tags');
  }
  
  // Count and validate URLs
  const urlMatches = xmlContent.match(/<url>/g) || [];
  const urlCount = urlMatches.length;
  
  if (urlCount === 0) {
    warnings.push('No URLs found in sitemap');
  }
  
  // Check for required URL elements
  const locMatches = xmlContent.match(/<loc>/g) || [];
  const lastmodMatches = xmlContent.match(/<lastmod>/g) || [];
  const changefreqMatches = xmlContent.match(/<changefreq>/g) || [];
  const priorityMatches = xmlContent.match(/<priority>/g) || [];
  
  if (locMatches.length !== urlCount) {
    errors.push(`Mismatch: ${urlCount} URLs but ${locMatches.length} locations`);
  }
  
  if (lastmodMatches.length !== urlCount) {
    warnings.push(`Mismatch: ${urlCount} URLs but ${lastmodMatches.length} lastmod dates`);
  }
  
  if (changefreqMatches.length !== urlCount) {
    warnings.push(`Mismatch: ${urlCount} URLs but ${changefreqMatches.length} changefreq values`);
  }
  
  if (priorityMatches.length !== urlCount) {
    warnings.push(`Mismatch: ${urlCount} URLs but ${priorityMatches.length} priority values`);
  }
  
  // Check for valid URLs
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  let match;
  const invalidUrls = [];
  
  while ((match = urlPattern.exec(xmlContent)) !== null) {
    const url = match[1];
    try {
      new URL(url);
    } catch (e) {
      invalidUrls.push(url);
    }
  }
  
  if (invalidUrls.length > 0) {
    errors.push(`Invalid URLs found: ${invalidUrls.join(', ')}`);
  }
  
  // Check for duplicate URLs
  const urls = [];
  urlPattern.lastIndex = 0; // Reset regex
  while ((match = urlPattern.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  
  const duplicateUrls = urls.filter((url, index) => urls.indexOf(url) !== index);
  if (duplicateUrls.length > 0) {
    errors.push(`Duplicate URLs found: ${[...new Set(duplicateUrls)].join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    urlCount,
    stats: {
      totalUrls: urlCount,
      locations: locMatches.length,
      lastmod: lastmodMatches.length,
      changefreq: changefreqMatches.length,
      priority: priorityMatches.length
    }
  };
}

// Function to analyze sitemap content
function analyzeSitemap(xmlContent) {
  const analysis = {
    pages: [],
    insights: [],
    categories: [],
    other: []
  };
  
  const urlPattern = /<loc>(.*?)<\/loc>/g;
  let match;
  
  while ((match = urlPattern.exec(xmlContent)) !== null) {
    const url = match[1];
    const path = new URL(url).pathname;
    
    if (path === '/') {
      analysis.pages.push({ url, path, type: 'homepage' });
    } else if (path.startsWith('/insights/')) {
      if (path === '/insights') {
        analysis.pages.push({ url, path, type: 'insights-main' });
      } else if (path.includes('/category/')) {
        analysis.categories.push({ url, path, type: 'category' });
      } else {
        analysis.insights.push({ url, path, type: 'blog-post' });
      }
    } else if (['/about', '/contact', '/services', '/pricing', '/projects'].includes(path)) {
      analysis.pages.push({ url, path, type: 'static-page' });
    } else {
      analysis.other.push({ url, path, type: 'other' });
    }
  }
  
  return analysis;
}

// Main validation function
function validateSitemap() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const sitemap0Path = path.join(process.cwd(), 'public', 'sitemap-0.xml');
  
  console.log('🔍 Validating sitemap files...\n');
  
  // Check if Next.js sitemap exists
  if (!fs.existsSync(sitemapPath)) {
    console.error('❌ sitemap.xml not found at:', sitemapPath);
    console.log('💡 Make sure you have a sitemap.ts file in src/app/');
    return false;
  }
  
  // Check if old next-sitemap files exist (for comparison)
  const hasOldSitemap = fs.existsSync(sitemap0Path);
  if (hasOldSitemap) {
    console.log('⚠️ Found old sitemap-0.xml from next-sitemap package');
    console.log('💡 Consider removing next-sitemap and using Next.js built-in sitemap');
  }
  
  try {
    // Read and validate main sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    console.log('📄 Validating sitemap.xml...');
    
    const validation = validateSitemapXML(sitemapContent);
    
    if (validation.isValid) {
      console.log('✅ Sitemap XML structure is valid');
    } else {
      console.log('❌ Sitemap validation failed:');
      validation.errors.forEach(error => console.log(`   • ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      console.log('⚠️ Warnings:');
      validation.warnings.forEach(warning => console.log(`   • ${warning}`));
    }
    
    // Analyze content
    const analysis = analyzeSitemap(sitemapContent);
    
    console.log('\n📊 Sitemap Analysis:');
    console.log(`   • Total URLs: ${validation.urlCount}`);
    console.log(`   • Static pages: ${analysis.pages.length}`);
    console.log(`   • Blog posts: ${analysis.insights.length}`);
    console.log(`   • Categories: ${analysis.categories.length}`);
    console.log(`   • Other: ${analysis.other.length}`);
    
    // Show breakdown
    if (analysis.pages.length > 0) {
      console.log('\n📄 Static Pages:');
      analysis.pages.forEach(page => {
        console.log(`   • ${page.path} (${page.type})`);
      });
    }
    
    if (analysis.insights.length > 0) {
      console.log('\n📝 Blog Posts:');
      analysis.insights.slice(0, 5).forEach(post => {
        console.log(`   • ${post.path}`);
      });
      if (analysis.insights.length > 5) {
        console.log(`   ... and ${analysis.insights.length - 5} more`);
      }
    }
    
    if (analysis.categories.length > 0) {
      console.log('\n📂 Categories:');
      analysis.categories.forEach(category => {
        console.log(`   • ${category.path}`);
      });
    }
    
    if (analysis.other.length > 0) {
      console.log('\n❓ Other URLs:');
      analysis.other.forEach(other => {
        console.log(`   • ${other.path}`);
      });
    }
    
    // Check if this is a sitemap index or direct sitemap
    console.log('\n📋 Sitemap Type:');
    
    if (sitemapContent.includes('<sitemapindex')) {
      console.log('✅ Sitemap is formatted as sitemap index');
    } else if (sitemapContent.includes('<urlset')) {
      console.log('✅ Sitemap is formatted as direct URL set');
    } else {
      console.log('⚠️ Unknown sitemap format');
    }
    
    // Final summary
    console.log('\n📋 Validation Summary:');
    console.log(`   • Structure: ${validation.isValid ? '✅ Valid' : '❌ Invalid'}`);
    console.log(`   • Total URLs: ${validation.urlCount}`);
    console.log(`   • Errors: ${validation.errors.length}`);
    console.log(`   • Warnings: ${validation.warnings.length}`);
    
    return validation.isValid;
    
  } catch (error) {
    console.error('❌ Error validating sitemap:', error);
    return false;
  }
}

// Run validation
const isValid = validateSitemap();
process.exit(isValid ? 0 : 1);
