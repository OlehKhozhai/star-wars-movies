export type Movie = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  created: string;
  url: string;
};

export type FavoriteMovies = Record<string, boolean>;
