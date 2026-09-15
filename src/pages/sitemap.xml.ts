import type { APIRoute } from 'astro';
import { tools } from '../data/tools';

const site = 'https://tools.emfls.com';
const staticPages = ['/', '/tools/', '/about/', '/privacy/', '/contact/'];

export const GET: APIRoute = () => {
  const paths = [...staticPages, ...tools.map((tool) => tool.href)];
  const urls = paths.map((path) => `  <url><loc>${site}${path}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
