<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Interstate Rankers - Sitemap</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
          }
          
          .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          
          .header {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            font-weight: 700;
          }
          
          .header p {
            font-size: 1.1rem;
            opacity: 0.9;
          }
          
          .stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
            flex-wrap: wrap;
          }
          
          .stat {
            text-align: center;
          }
          
          .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #ffd700;
          }
          
          .stat-label {
            font-size: 0.9rem;
            opacity: 0.8;
          }
          
          .content {
            padding: 40px;
          }
          
          .url-list {
            list-style: none;
          }
          
          .url-item {
            background: #f8f9fa;
            margin-bottom: 15px;
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
          }
          
          .url-item:hover {
            transform: translateX(5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-left-color: #ffd700;
          }
          
          .url-link {
            color: #1e3c72;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            display: block;
            margin-bottom: 8px;
          }
          
          .url-link:hover {
            color: #667eea;
            text-decoration: underline;
          }
          
          .url-meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            font-size: 0.9rem;
            color: #666;
          }
          
          .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
          }
          
          .priority {
            background: #e3f2fd;
            color: #1976d2;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 600;
          }
          
          .priority.high { background: #e8f5e8; color: #2e7d32; }
          .priority.medium { background: #fff3e0; color: #f57c00; }
          .priority.low { background: #fce4ec; color: #c2185b; }
          
          .lastmod {
            color: #666;
          }
          
          .changefreq {
            background: #f3e5f5;
            color: #7b1fa2;
            padding: 2px 8px;
            border-radius: 12px;
            font-weight: 600;
          }
          
          .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            border-top: 1px solid #e9ecef;
          }
          
          .footer a {
            color: #667eea;
            text-decoration: none;
          }
          
          .footer a:hover {
            text-decoration: underline;
          }
          
          @media (max-width: 768px) {
            .header h1 { font-size: 2rem; }
            .stats { gap: 20px; }
            .content { padding: 20px; }
            .url-meta { flex-direction: column; gap: 10px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Interstate Rankers</h1>
            <p>Complete Sitemap - All Pages & Resources</p>
            <div class="stats">
              <div class="stat">
                <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
                <div class="stat-label">Total URLs</div>
              </div>
              <div class="stat">
                <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[sitemap:priority = '1.0'])"/></div>
                <div class="stat-label">High Priority</div>
              </div>
              <div class="stat">
                <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url[contains(sitemap:loc, '/insights/')])"/></div>
                <div class="stat-label">Blog Posts</div>
              </div>
            </div>
          </div>
          
          <div class="content">
            <ul class="url-list">
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <xsl:sort select="sitemap:priority" data-type="number" order="descending"/>
                <li class="url-item">
                  <a href="{sitemap:loc}" class="url-link">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                  <div class="url-meta">
                    <div class="meta-item">
                      <span>Priority:</span>
                      <span class="priority">
                        <xsl:attribute name="class">
                          <xsl:choose>
                            <xsl:when test="sitemap:priority >= 0.8">priority high</xsl:when>
                            <xsl:when test="sitemap:priority >= 0.6">priority medium</xsl:when>
                            <xsl:otherwise>priority low</xsl:otherwise>
                          </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </div>
                    <div class="meta-item">
                      <span>Updated:</span>
                      <span class="lastmod">
                        <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                      </span>
                    </div>
                    <div class="meta-item">
                      <span>Frequency:</span>
                      <span class="changefreq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </div>
                  </div>
                </li>
              </xsl:for-each>
            </ul>
          </div>
          
          <div class="footer">
            <p>
              Generated by <a href="https://interstaterankers.com">Interstate Rankers</a> | 
              Last updated: <xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod, 1, 10)"/>
            </p>
            <p style="margin-top: 10px; font-size: 0.9rem;">
              This sitemap helps search engines discover and index all pages on our website.
            </p>
          </div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

