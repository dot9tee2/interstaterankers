/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://interstaterankers.com';

export default {
	siteUrl,
	generateRobotsTxt: true,
	changefreq: 'weekly',
	priority: 0.7,
	// Remove pricing from exclude to include it in sitemap
	// exclude: ['/pricing'],
	// Add formatting options for better readability
	format: true,
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', allow: '/' },
		],
	},
	transform: async (config, path) => {
		let priority = 0.7;
		if (path === '/') priority = 1.0;
		else if (path.startsWith('/services')) priority = 0.9;
		else if (path.startsWith('/pricing')) priority = 0.8;
		
		return {
			loc: path,
			changefreq: 'weekly',
			priority,
			lastmod: new Date().toISOString(),
			alternateRefs: [
				{ href: siteUrl, hreflang: 'en-us' },
			],
		};
	},
};


