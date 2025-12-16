"use server";

import { getDateRange, validateArticle, formatArticle } from "@/lib/utils";

const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";
const FINNHUB_API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

interface FetchOptions {
  revalidateSeconds?: number;
}

/**
 * Fetch JSON from URL with caching options
 */
async function fetchJSON<T>(url: string, options?: FetchOptions): Promise<T> {
  const fetchOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (options?.revalidateSeconds) {
    fetchOptions.cache = "force-cache";
    fetchOptions.next = { revalidate: options.revalidateSeconds };
  } else {
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch from ${url}: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Fetch news for given symbols or general market news
 */
export async function getNews(
  symbols?: string[]
): Promise<MarketNewsArticle[]> {
  try {
    const dateRange = getDateRange(5); // Last 5 days

    // If symbols provided, fetch company news in round-robin fashion
    if (symbols && symbols.length > 0) {
      const cleanedSymbols = symbols
        .map((s) => s.trim().toUpperCase())
        .filter((s) => s.length > 0);

      const newsArticles: MarketNewsArticle[] = [];
      const maxRounds = 6;

      for (let round = 0; round < maxRounds; round++) {
        for (let i = 0; i < cleanedSymbols.length; i++) {
          const symbol = cleanedSymbols[i];

          try {
            const url =
              `${FINNHUB_BASE_URL}/company-news?` +
              new URLSearchParams({
                symbol,
                from: dateRange.from,
                to: dateRange.to,
                token: FINNHUB_API_KEY || "",
              }).toString();

            const result = await fetchJSON<RawNewsArticle[]>(url);

            if (Array.isArray(result)) {
              for (const article of result) {
                if (validateArticle(article)) {
                  const formatted = formatArticle(article, true, symbol);
                  newsArticles.push(formatted);

                  if (newsArticles.length >= maxRounds) break;
                }
              }
            }

            if (newsArticles.length >= maxRounds) break;
          } catch (error) {
            console.error(`Error fetching news for ${symbol}:`, error);
            continue;
          }
        }

        if (newsArticles.length >= maxRounds) break;
      }

      // Sort by datetime (descending) and return top articles
      return newsArticles.sort((a, b) => b.datetime - a.datetime).slice(0, 6);
    }

    // Fallback to general market news
    try {
      const url =
        `${FINNHUB_BASE_URL}/news?` +
        new URLSearchParams({
          minId: "0",
          token: FINNHUB_API_KEY || "",
        }).toString();

      const result = await fetchJSON<RawNewsArticle[]>(url);

      if (!Array.isArray(result)) {
        return [];
      }

      // Deduplicate by id, url, and headline
      const seen = new Set<string>();
      const deduped: RawNewsArticle[] = [];

      for (const article of result) {
        const key =
          `${article.id}-${article.url}-${article.headline}`.toLowerCase();
        if (!seen.has(key) && validateArticle(article)) {
          seen.add(key);
          deduped.push(article);
        }
      }

      // Format and return top 6
      return deduped
        .slice(0, 6)
        .map((article, index) =>
          formatArticle(article, false, undefined, index)
        )
        .sort((a, b) => b.datetime - a.datetime);
    } catch (error) {
      console.error("Error fetching general market news:", error);
      throw new Error("Failed to fetch news");
    }
  } catch (error) {
    console.error("Error in getNews:", error);
    throw new Error("Failed to fetch news");
  }
}
