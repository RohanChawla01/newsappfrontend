export interface QueryNewsPayload {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  qInTitle?: string; // Keywords or phrases to search for in the article title only.
  q?: string; // Keywords or phrases to search for in the article title and body.
  page: number;
}

export interface NewsArticle {
  source: Object;
  //The identifier id and a display name name for the source this article came from.

  author: string;
  //The author of the article

  title: string;
  // The headline or title of the article.

  description: string;
  // A description or snippet from the article.

  url: string;
  // The direct URL to the article.

  urlToImage: string;
  // The URL to a relevant image for the article.

  publishedAt: string;
  // The date and time that the article was published, in UTC (+000)

  content: string;
  // The unformatted content of the article, where available. This is truncated to 200 chars.
}

export interface NewsResponse {
  status: "ok" | "error";
  totalResults: number;
  articles: NewsArticle[];
}
