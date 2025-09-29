import fs from 'fs';
import path from 'path';
import xmlFormatter from 'xml-formatter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to format XML with proper indentation
function formatSitemap() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap-0.xml');
  const mainSitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  console.log('🔍 Checking sitemap files...');
  console.log('Sitemap path:', sitemapPath);
  console.log('Main sitemap path:', mainSitemapPath);
  
  try {
    // Check if sitemap files exist
    if (!fs.existsSync(sitemapPath)) {
      console.error('❌ sitemap-0.xml not found at:', sitemapPath);
      process.exit(1);
    }
    
    // Read the generated sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    console.log('📄 Original sitemap content length:', sitemapContent.length);
    console.log('📄 First 200 chars:', sitemapContent.substring(0, 200));
    
    // Format the XML with proper indentation
    const formattedXml = xmlFormatter(sitemapContent, {
      indentation: '  ',
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n'
    });
    
    console.log('📄 Formatted sitemap content length:', formattedXml.length);
    console.log('📄 First 200 chars of formatted:', formattedXml.substring(0, 200));
    
    // Write the formatted XML back
    fs.writeFileSync(sitemapPath, formattedXml, 'utf8');
    console.log('✅ sitemap-0.xml formatted and saved');
    
    // Also format the main sitemap if it exists
    if (fs.existsSync(mainSitemapPath)) {
      const mainSitemapContent = fs.readFileSync(mainSitemapPath, 'utf8');
      const formattedMainXml = xmlFormatter(mainSitemapContent, {
        indentation: '  ',
        filter: (node) => node.type !== 'Comment',
        collapseContent: true,
        lineSeparator: '\n'
      });
      fs.writeFileSync(mainSitemapPath, formattedMainXml, 'utf8');
      console.log('✅ sitemap.xml formatted and saved');
    } else {
      console.log('⚠️ Main sitemap not found, skipping');
    }
    
    console.log('✅ Sitemap files formatted successfully');
  } catch (error) {
    console.error('❌ Error formatting sitemap:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

formatSitemap();
