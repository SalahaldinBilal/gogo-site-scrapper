export interface SearchResult {
  name: string;
  url: string;
  linkName: string;
  img: string;
  released: number;
  type: "dub" | "sub";
}