export interface IArticle {
  category: string[];
  content: string;
  country: string[];
  creator: string[] | null;
  description: string;
  image_url: string | null;
  keywords: string[] | null;
  language: string;
  link: string;
  pubDate: string;
  source_id: string;
  title: string;
  video_url: string | null;
}

export default interface INews {
  nextPage: string;
  results: IArticle[];
  status: string;
  totalResults: number;
}
