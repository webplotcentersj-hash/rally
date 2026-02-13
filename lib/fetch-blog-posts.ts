import type { NewsItem } from '@/lib/news-data';

const BLOG_API = 'https://blog.safaritraslassierras.com.ar/wp-json/wp/v2/posts?per_page=6&_embed';

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

type WpPost = {
  id: number;
  date: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string }>;
  };
};

export async function fetchBlogPosts(): Promise<NewsItem[]> {
  try {
    const res = await fetch(BLOG_API, {
      next: { revalidate: 120 },
      headers: { 'User-Agent': 'SafariTrasLasSierras/1.0' },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as WpPost[];
    return data.map((post) => {
      const media = post._embedded?.['wp:featuredmedia']?.[0];
      return {
        id: `blog-${post.id}`,
        title: post.title.rendered,
        date: post.date.slice(0, 10),
        excerpt: stripHtml(post.excerpt.rendered).slice(0, 200) + (stripHtml(post.excerpt.rendered).length > 200 ? '…' : ''),
        href: post.link,
        image: media?.source_url,
      };
    });
  } catch {
    return [];
  }
}
