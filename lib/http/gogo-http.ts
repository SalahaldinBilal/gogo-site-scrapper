import nodeFetch from 'node-fetch';
import { RequestReturn } from '../types/request-return';
import GogoAPIError from './api-error';
import { parseHTML } from 'linkedom';

let fet: any = typeof fetch === "undefined" ? nodeFetch : fetch;

export default class GogoHttp {
  private baseUrl: string;
  private userCors: boolean;

  constructor(baseUrl: string, userCors = false) {
    this.baseUrl = baseUrl;
    this.userCors = userCors;
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  fetchPage(url: string): Promise<RequestReturn> {
    return fet(url, { mode: this.userCors ? "cors" : "no-cors" })
      .then((res: Response) => {
        if (res.ok) return res.text();
        throw new GogoAPIError(res.status, res.statusText);
      })
      .then((html: string) => ({
        document: parseHTML(html).window.document,
        url: url
      } as RequestReturn));
  }

  getAnimeInfoPage(name: string): Promise<RequestReturn> {
    return this.fetchPage(`${this.baseUrl}/category/${name.toLowerCase().replace(/\s/g, '-')}`);
  }

  getEpisodeList(start: number, end: number, id: number): Promise<RequestReturn> {
    return this.fetchPage(`https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=${start}&ep_end=${end}&id=${id}`);
  }

  getSearchPage(filter: string): Promise<RequestReturn> {
    return this.fetchPage(`${this.baseUrl}/search.html?keyword=${filter}`);
  }

  getAnimesPage(letter: string, page: number): Promise<RequestReturn> {
    return this.fetchPage(`${this.baseUrl}/anime-list-${letter}?page=${page}`);
  }
}