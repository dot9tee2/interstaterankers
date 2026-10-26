// Run against a local server: node scripts/check-core-services.mjs [base URL]
import assert from "node:assert/strict";

const baseUrl = process.argv[2] || "http://localhost:8080";
const slugs = ["gmb", "answering", "seo", "ppc"];
// Simulate the HTTPS reverse proxy when checking a local production server.
// The public-site HTTPS redirect remains enabled.
const request = (url) => fetch(url, { headers: { "x-forwarded-proto": "https" } });
const stripTags = (s) => s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

for (const slug of slugs) {
  const response = await request(`${baseUrl}/services/${slug}`);
  assert.equal(response.status, 200, `${slug}: response`);
  const html = await response.text();
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
  assert.ok(main, `${slug}: main content`);
  assert.equal((main.match(/<h1\b/g) || []).length, 1, `${slug}: one main heading`);
  const words = stripTags(main).split(/\s+/).length;
  assert.ok(words >= 1600, `${slug}: substantial content (${words} words)`);

  const ids = [...main.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length, `${slug}: unique section IDs`);
  for (const match of main.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(ids.includes(match[1]), `${slug}: section link #${match[1]}`);
  }
  assert.ok(main.includes(`/contact?service=${slug}`), `${slug}: relevant proposal link`);
  assert.ok(main.includes("Demonstration account"), `${slug}: screenshot labelled`);
  assert.ok(!/Draft hold|Internal note|Proposed policy/.test(main), `${slug}: no editorial instructions`);
  assert.ok(main.includes(`aria-controls="${slug === "gmb" ? "gbp" : slug}-starting-answer"`), `${slug}: relevant starting-point selector`);
  const visualSections = {
    gmb: ["service-area", "profile-activity", "reviews-and-recovery"],
    answering: ["coverage", "booking-rules", "pilot", "call-information"],
    seo: ["technical-and-content", "services-and-locations", "content-that-helps"],
    ppc: ["targeting-real-services", "budget-and-landing-pages", "lead-quality"],
  };
  for (const id of visualSections[slug]) {
    const section = main.match(new RegExp(`<section\\b[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/section>`))?.[1];
    assert.ok(section?.includes("<figure"), `${slug}: ${id} illustration`);
    assert.ok(section?.includes("<details"), `${slug}: ${id} full explanation remains accessible`);
  }

  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const graph = scripts.flatMap((m) => {
    const value = JSON.parse(m[1]);
    return value["@graph"] || [value];
  });
  const service = graph.find((item) => item["@type"] === "Service");
  assert.equal(service?.url, `https://interstaterankers.com/services/${slug}`, `${slug}: service schema URL`);
  assert.equal(service.provider['@id'], 'https://interstaterankers.com/#organization', `${slug}: shared provider identity`);
  assert.ok(graph.some((item) => item['@id'] === service.provider['@id']), `${slug}: provider in server HTML`);
  const page = graph.find((item) => item['@type'] === 'WebPage');
  assert.equal(page.mainEntity['@id'], service['@id'], `${slug}: page describes the service`);
  for (const part of page.hasPart.filter((item) => item.text)) {
    assert.ok(ids.includes(part['@id'].split('#')[1]), `${slug}: structured section has a visible destination`);
  }
  assert.ok(page.hasPart.find((item) => item.name === 'Step-by-step onboarding process')?.text, `${slug}: structured process`);
  const expectedPrice = { gmb: 249, answering: 1200 }[slug];
  const price = service.offers.priceSpecification;
  if (expectedPrice) {
    assert.equal(price.minPrice, expectedPrice, `${slug}: starting monthly price`);
    assert.equal(price.priceCurrency, 'USD');
    assert.equal(price.unitText, 'month');
    assert.equal(price.price, undefined, `${slug}: starting price is not a fixed quote`);
  } else {
    assert.equal(price, undefined, `${slug}: no invented standalone price`);
  }
  assert.match(service.termsOfService, /15 days'? notice/, `${slug}: cancellation terms`);
  const faq = graph.find((item) => item["@type"] === "FAQPage");
  assert.ok(faq?.mainEntity.length >= 12, `${slug}: detailed FAQs`);
  const faqSection = main.match(/<section\b[^>]*id="questions"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(faqSection, `${slug}: FAQ section`);
  assert.equal((faqSection.match(/<details\b/g) || []).length, faq.mainEntity.length, `${slug}: FAQ schema matches rendered controls`);
  console.log(`${slug}: OK; ${words} main-content words; ${faq.mainEntity.length} FAQs; ${ids.length} sections`);
}

for (const slug of slugs) {
  const response = await request(`${baseUrl}/contact?service=${slug}`);
  assert.equal(response.status, 200, `${slug}: contact page`);
  const html = await response.text();
  assert.ok(html.includes("I&#x27;d like a proposal for") || html.includes("I'd like a proposal for"), `${slug}: prefilled proposal message`);
  console.log(`${slug}: contact route OK`);
}
