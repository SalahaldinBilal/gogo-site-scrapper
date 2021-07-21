import fetch from 'node-fetch';

import { JSDOM } from 'jsdom'

export default class GogoHttp {
  baseUrl: string;

  constructor(baseUrl = 'https://gogoanime.pe') {
    this.baseUrl = baseUrl;
  }

  fetchPage(url: string, callback: (doc: HTMLDocument, url: string) => void) {
    fetch(url)
      .then(res => res.text())
      .then(html => callback(new JSDOM(html).window.document, url))
  }

  getAnimeInfoPage(name: string, callback: (doc: HTMLDocument, url: string) => void) {
    this.fetchPage(
      `${this.baseUrl}/category/${name.toLowerCase().replace(/\s/g, '-')}`,
      callback
    )
  }

  getEpisodeList(start: number, end: number, id: number, callback: (doc: HTMLDocument, url: string) => void) {
    this.fetchPage(
      `https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=${start}&ep_end=${end}&id=${id}`,
      callback
    )
  }

  getSearchPage(filter: string, callback: (doc: HTMLDocument, url: string) => void) {
    this.fetchPage(
      `${this.baseUrl}/search.html?keyword=${filter}`,
      callback
    )
  }
}