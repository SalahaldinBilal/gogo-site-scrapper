export interface AnimeInfo {
  id: number,
  coverImg: string,
  url: string,
  name: string,
  summary: string,
  genres: Array<string>,
  released: Date,
  start: number,
  end: number
}