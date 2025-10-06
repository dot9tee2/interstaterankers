import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy generated sitemap to public directory
function copySitemap() {
  const sourcePath = path.join(process.cwd(), '.next', 'server', 'app', 'sitemap.xml.body');
  const targetPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  
  console.log('📋 Copying sitemap to public directory...');
  console.log('Source:', sourcePath);
  console.log('Target:', targetPath);
  
  try {
    // Check if source file exists
    if (!fs.existsSync(sourcePath)) {
      console.error('❌ Generated sitemap not found at:', sourcePath);
      console.log('💡 Make sure the build completed successfully');
      process.exit(1);
    }
    
    // Copy the file
    fs.copyFileSync(sourcePath, targetPath);
    
    // Verify the copy
    if (fs.existsSync(targetPath)) {
      const stats = fs.statSync(targetPath);
      console.log('✅ Sitemap copied successfully');
      console.log(`   • Size: ${stats.size} bytes`);
      console.log(`   • Location: ${targetPath}`);
    } else {
      console.error('❌ Failed to copy sitemap');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error copying sitemap:', error);
    process.exit(1);
  }
}

copySitemap();
