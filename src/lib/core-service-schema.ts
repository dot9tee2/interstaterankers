import type { CoreServiceContent } from '@/components/sections/CoreServicePage';

const site = 'https://interstaterankers.com';

/** Describe published content only; proposal-dependent work retains its qualifiers. */
export function coreServiceSchema(content: CoreServiceContent) {
  const c = content;
  const url = `${site}/services/${c.slug}`;
  const serviceId = `${url}#service`;
  const provider = { '@id': `${site}/#organization` };
  const section = (id: string, name: string, text: string) => ({
    '@type': 'WebPageElement', '@id': `${url}#${id}`, url: `${url}#${id}`,
    name, text, about: { '@id': serviceId }, inLanguage: 'en-US',
  });
  const details = (items: { title: string; description: string }[]) =>
    items.map((item) => `${item.title}: ${item.description}`).join('\n\n');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url,
        name: c.headline, description: c.description, inLanguage: 'en-US',
        isPartOf: { '@id': `${site}/#website` }, publisher: provider,
        about: { '@id': serviceId }, mainEntity: { '@id': serviceId },
        breadcrumb: { '@id': `${url}#breadcrumbs` },
        relatedLink: c.related.map((item) => new URL(item.href, site).href),
        hasPart: [
          section('overview', c.intro.title, `${c.intro.paragraphs.join('\n\n')}\n\n${details(c.fit)}`),
          section('scope', 'The work behind the service', details(c.deliverables)),
          section('process', 'Step-by-step onboarding process', c.process.map((item, index) => `${index + 1}. ${item.title}: ${item.description}`).join('\n\n')),
          ...c.sections.map((item) => section(item.id, item.title, [
            ...item.paragraphs, ...(item.items ? [details(item.items)] : []),
          ].join('\n\n'))),
          section('reporting', 'ISR HQ & reporting', details(c.reporting)),
          section('getting-started', 'Getting started', c.requirements.join('\n')),
          section('pricing', 'Scope & pricing', [c.pricing.description,
            `Included in the agreed scope:\n${c.pricing.included.join('\n')}`,
            `Separate costs and responsibilities:\n${c.pricing.separate.join('\n')}`,
          ].join('\n\n')),
          { '@id': `${url}#questions` },
        ],
      },
      {
        '@type': 'Service', '@id': serviceId, url, name: c.name,
        description: c.description, serviceType: c.name, provider,
        areaServed: { '@type': 'Country', name: 'United States' },
        audience: { '@type': 'BusinessAudience', audienceType: details(c.fit) },
        termsOfService: [c.pricing.description,
          ...c.faqs.filter((item) => /cancel/i.test(item.question)).map((item) => item.answer),
        ].join('\n\n'),
        availableChannel: {
          '@type': 'ServiceChannel',
          serviceUrl: `${site}/contact?service=${encodeURIComponent(c.slug)}`,
        },
        offers: {
          '@type': 'Offer', '@id': `${url}#offer`, url: `${url}#pricing`,
          name: `${c.name} — agreed service scope`, description: c.pricing.description,
          seller: provider, itemOffered: { '@id': serviceId },
          ...(c.pricing.startingMonthlyPrice !== undefined ? {
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              minPrice: c.pricing.startingMonthlyPrice, priceCurrency: 'USD',
              unitText: 'month', priceType: 'Starting price',
              description: c.pricing.description,
            },
          } : {}),
        },
        subjectOf: { '@id': `${url}#webpage` },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumbs`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${site}/services` },
          { '@type': 'ListItem', position: 3, name: c.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#questions`, url: `${url}#questions`,
        isPartOf: { '@id': `${url}#webpage` }, about: { '@id': serviceId },
        inLanguage: 'en-US', mainEntity: c.faqs.map(({ question, answer }) => ({
          '@type': 'Question', name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };
}
