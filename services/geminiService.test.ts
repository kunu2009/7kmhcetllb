import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchReelNews } from './geminiService';

type MockJson = Record<string, unknown>;

const jsonResponse = (body: MockJson, ok = true) => ({
  ok,
  json: async () => body,
});

describe('fetchReelNews', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns Inshorts data when available without date filter', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      jsonResponse({
        data: [
          {
            title: 'Legal reform update',
            content: 'A policy reform was announced today.',
            readMoreUrl: 'https://example.com/news-1',
            author: 'Desk',
          },
        ],
      }) as unknown as Response
    );

    const result = await fetchReelNews({ category: 'legal', limit: 5, offset: 0 });

    expect(result).toHaveLength(1);
    expect(result[0].title).toContain('Legal reform update');
    expect(result[0].url).toBe('https://example.com/news-1');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('falls back across RSS query chain when category+date yields no items', async () => {
    const calls: string[] = [];
    let rssCallCount = 0;

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);
      calls.push(url);

      if (url.includes('rss2json')) {
        rssCallCount += 1;

        if (rssCallCount === 1) {
          return jsonResponse({ items: [] }) as unknown as Response;
        }

        return jsonResponse({
          items: [
            {
              title: 'Supreme Court digest',
              description: 'Important legal update from court proceedings.',
              link: 'https://example.com/sc-update',
              pubDate: 'Mon, 30 Mar 2026 10:00:00 GMT',
            },
          ],
          feed: { title: 'Google News' },
        }) as unknown as Response;
      }

      return jsonResponse({ data: [] }) as unknown as Response;
    });

    const result = await fetchReelNews({
      category: 'legal',
      date: '2026-03-30',
      limit: 5,
      offset: 0,
    });

    expect(result).toHaveLength(1);
    expect(result[0].title).toContain('Supreme Court digest');
    expect(result[0].url).toBe('https://example.com/sc-update');
    expect(calls.some((url) => url.includes('rss2json'))).toBe(true);
    expect(rssCallCount).toBeGreaterThan(1);
  });

  it('filters invalid links from RSS fallback results', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);

      if (url.includes('rss2json')) {
        return jsonResponse({
          items: [
            {
              title: 'Invalid link news',
              description: 'Should be removed because link is invalid',
              link: 'not-a-valid-url',
            },
            {
              title: 'Valid link news',
              description: 'Should remain in output',
              link: 'https://example.com/valid-news',
            },
          ],
          feed: { title: 'Google News' },
        }) as unknown as Response;
      }

      return jsonResponse({ data: [] }) as unknown as Response;
    });

    const result = await fetchReelNews({ category: 'all', date: '2026-03-30', limit: 10, offset: 0 });

    expect(result).toHaveLength(1);
    expect(result[0].title).toContain('Valid link news');
    expect(result[0].url).toBe('https://example.com/valid-news');
  });

  it('uses direct RSS XML fallback when rss2json bridge fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
      const url = String(input);

      if (url.includes('inshortsapi.vercel.app') || url.includes('inshorts.deta.dev')) {
        return jsonResponse({ data: [] }) as unknown as Response;
      }

      if (url.includes('rss2json')) {
        throw new Error('rss2json unavailable');
      }

      if (url.includes('api.allorigins.win')) {
        return {
          ok: true,
          text: async () => `
            <rss><channel>
              <item>
                <title>Direct RSS legal update</title>
                <link>https://example.com/direct-rss</link>
                <description>Important court development from direct RSS fallback.</description>
                <pubDate>Tue, 31 Mar 2026 09:00:00 GMT</pubDate>
                <source>Google News</source>
              </item>
            </channel></rss>
          `,
        } as unknown as Response;
      }

      return jsonResponse({ items: [] }) as unknown as Response;
    });

    const result = await fetchReelNews({ date: '2026-03-31', limit: 5, offset: 0 });

    expect(result).toHaveLength(1);
    expect(result[0].title).toContain('Direct RSS legal update');
    expect(result[0].url).toBe('https://example.com/direct-rss');
  });
});
