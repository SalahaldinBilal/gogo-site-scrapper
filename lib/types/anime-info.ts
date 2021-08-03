import { EpisodeInfo } from "./episode-info";

export interface AnimeInfo {
  id: number,
  coverImg: string,
  url: string,
  name: string,
  linkName: string,
  summary: string,
  genres: Array<string>,
  released: number,
  start: number,
  end: number,
  type: "dub" | "sub",
  episodes?: Array<EpisodeInfo>
}