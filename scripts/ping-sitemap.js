import fetch from 'node-fetch';

const SITE_URL = process.env.SITE_URL || 'https://interstaterankers.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

// Function to ping search engines about sitemap updates
async function pingSearchEngines() {
  console.log('🔔 Pinging search engines about sitemap updates...');
  console.log(`📍 Sitemap URL: ${SITEMAP_URL}`);

  const pingUrls = [
    {
      name: 'Google',
      url: `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    },
    {
      name: 'Bing',
      url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    }
  ];

  const results = [];

  for (const engine of pingUrls) {
    try {
      console.log(`📡 Pinging ${engine.name}...`);
      
      const response = await fetch(engine.url, {
        method: 'GET',
        headers: {
          'User-Agent': 'InterStateRankers-Sitemap-Ping/1.0'
        }
      });

      if (response.ok) {
        console.log(`✅ ${engine.name}: Successfully pinged`);
        results.push({ engine: engine.name, status: 'success', message: 'Ping successful' });
      } else {
        console.log(`⚠️ ${engine.name}: HTTP ${response.status} - ${response.statusText}`);
        results.push({ 
          engine: engine.name, 
          status: 'warning', 
          message: `HTTP ${response.status} - ${response.statusText}` 
        });
      }
    } catch (error) {
      console.error(`❌ ${engine.name}: Error pinging - ${error.message}`);
      results.push({ 
        engine: engine.name, 
        status: 'error', 
        message: error.message 
      });
    }
  }

  // Summary
  console.log('\n📋 Ping Results Summary:');
  results.forEach(result => {
    const icon = result.status === 'success' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`   ${icon} ${result.engine}: ${result.message}`);
  });

  const successCount = results.filter(r => r.status === 'success').length;
  console.log(`\n🎯 Successfully pinged ${successCount}/${results.length} search engines`);

  return results;
}

// Function to validate sitemap before pinging
async function validateSitemap() {
  try {
    console.log('🔍 Validating sitemap before pinging...');
    
    const response = await fetch(SITEMAP_URL);
    
    if (!response.ok) {
      throw new Error(`Sitemap not accessible: HTTP ${response.status}`);
    }

    const content = await response.text();
    
    // Basic validation
    if (!content.includes('<?xml version="1.0" encoding="UTF-8"?>')) {
      throw new Error('Invalid XML declaration');
    }
    
    if (!content.includes('<urlset') || !content.includes('</urlset>')) {
      throw new Error('Invalid sitemap structure');
    }

    const urlCount = (content.match(/<url>/g) || []).length;
    console.log(`✅ Sitemap is valid with ${urlCount} URLs`);
    
    return true;
  } catch (error) {
    console.error(`❌ Sitemap validation failed: ${error.message}`);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting sitemap ping process...\n');
  
  // Validate sitemap first
  const isValid = await validateSitemap();
  
  if (!isValid) {
    console.log('❌ Sitemap validation failed. Aborting ping process.');
    process.exit(1);
  }
  
  // Ping search engines
  const results = await pingSearchEngines();
  
  // Exit with appropriate code
  const hasErrors = results.some(r => r.status === 'error');
  const hasWarnings = results.some(r => r.status === 'warning');
  
  if (hasErrors) {
    console.log('\n❌ Some pings failed. Check the errors above.');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('\n⚠️ Some pings had warnings but completed.');
    process.exit(0);
  } else {
    console.log('\n🎉 All pings completed successfully!');
    process.exit(0);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

export { pingSearchEngines, validateSitemap };
