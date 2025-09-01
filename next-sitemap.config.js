/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.SITE_URL || 'https://interstaterankers.com';

export default {
	siteUrl,
	generateRobotsTxt: true,
	changefreq: 'weekly',
	priority: 0.7,
	exclude: ['/pricing'],
	robotsTxtOptions: {
		policies: [
			{ userAgent: '*', allow: '/' },
		],
		additionalSitemaps: [
			`${siteUrl}/sitemap.xml`,
		],
	},
	transform: async (config, path) => {
		let priority = 0.7;
		if (path === '/') priority = 1.0;
		else if (path.startsWith('/services')) priority = 0.9;
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


