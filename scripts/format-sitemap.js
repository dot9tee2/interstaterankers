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
  
  try {
    // Read the generated sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    
    // Format the XML with proper indentation
    const formattedXml = xmlFormatter(sitemapContent, {
      indentation: '  ',
      filter: (node) => node.type !== 'Comment',
      collapseContent: true,
      lineSeparator: '\n'
    });
    
    // Write the formatted XML back
    fs.writeFileSync(sitemapPath, formattedXml, 'utf8');
    
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
    }
    
    console.log('✅ Sitemap files formatted successfully');
  } catch (error) {
    console.error('❌ Error formatting sitemap:', error);
    process.exit(1);
  }
}

formatSitemap();
