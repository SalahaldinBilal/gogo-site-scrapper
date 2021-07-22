import { AnimeInfo } from "../types/anime-info";
import { EpisodeInfo } from "../types/episode-info";
import { PlayerInfo } from "../types/player-info";
import { SearchResult } from "../types/search-result";

export default class GogoParser {
  private baseUrl: string;

  constructor(baseUrl = 'https://gogoanime.pe') {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  getAnimeInfo(animeInfoPageDocument: HTMLDocument): AnimeInfo {
    let infoElement = animeInfoPageDocument.querySelector('.anime_info_body_bg') as HTMLDivElement;
    let epRange = animeInfoPageDocument.getElementById("episode_page")?.querySelector("a")?.innerHTML as string;

    return {
      id: +(animeInfoPageDocument.getElementById('movie_id') as HTMLInputElement)?.value,
      url: animeInfoPageDocument.querySelector('[rel="canonical"]')?.getAttribute('href'),
      coverImg: (infoElement.children[0] as HTMLImageElement).src,
      name: (infoElement.children[1] as HTMLHeadElement).innerHTML,
      summary: (infoElement.children[4] as HTMLParagraphElement).childNodes[1].textContent,
      genres: Array.from(infoElement.children[5].querySelectorAll("a")).map(x => x.title),
      released: new Date((infoElement.children[6] as any).childNodes[1].textContent),
      start: +epRange?.split("-")[0],
      end: +epRange?.split("-")[1]
    } as AnimeInfo;
  }

  getEpisodeListing(animeInfoPageDocument: HTMLDocument): Array<EpisodeInfo> {
    return Array.from(animeInfoPageDocument.querySelectorAll("li")).map(ep => ({
      number: +(ep.children[0].children[0] as any).childNodes[1]?.textContent.split(" ")[1],
      url: this.baseUrl + ep.children[0].getAttribute("href")?.trim() as string
    })).reverse();
  }

  getEpisodePlayers(playerPageDocument: HTMLDocument): Array<PlayerInfo> {
    return Array.from(playerPageDocument.getElementsByClassName("anime_muti_link")[0].children[0].children).map(li => ({
      url: li.children[0].getAttribute("data-video") as string,
      name: li.children[0].childNodes[li.children[0].childNodes[1].nodeType == 3 ? 1 : 2].textContent as string
    }))
  }

  getSearchResults(searchPageDocument: HTMLDocument): Array<SearchResult> {
    if (!searchPageDocument.querySelector(".items li")) return [];

    return Array.from(searchPageDocument.getElementsByClassName("items")[0].children).map(li => ({
      url: this.baseUrl + li.children[1].children[0].getAttribute("href") as string,
      name: li.children[1].children[0].innerHTML.replace(" (Dub)", "") as string,
      img: li.children[0].children[0].children[0].getAttribute("src") as string,
      released: +li.children[2].innerHTML.replace(/\s/g, '').split(":")[1],
      type: li.children[1].children[0].innerHTML.includes(" (Dub)") ? "dub" : "sub"
    }))
  }
}