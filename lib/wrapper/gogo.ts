import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import SearchResult from "../classes/search-result";
import Anime from "../classes/anime";

export default class Gogo {
    baseUrl: string;
    http: GogoHttp;
    parser: GogoParser;

    constructor(baseUrl: string, useCors = false) {
        this.baseUrl = baseUrl;
        this.http = new GogoHttp(baseUrl, useCors);
        this.parser = new GogoParser(baseUrl);
    }

    public async searchAnime(query: string): Promise<SearchResult[]> {
        const searchPage = await this.http.getSearchPage(query);
        return (
            searchPage.document &&
            this.parser.getSearchResults(searchPage.document).map((result) => new SearchResult(this, result))
        );
    }

    public async getAnimesList(letter: string, page: number) {
        const animes = await this.http.getAnimesPage(letter, page);
        return Promise.all(
            animes.document &&
                this.parser.getAnimesList(animes.document).map(async (anime) => {
                    const animeInfoPage = await this.http.getAnimeInfoPage(anime.split("/").slice(2).join(""));
                    const animeInfo = this.parser.getAnimeInfo(animeInfoPage.document);
                    return animeInfo;
                })
        );
    }

    public async getAllAnimesList(letter: string) {
        const animes = [];

        const pageOne = await this.http.getAnimesPage(letter, 1);
        animes.push(...this.parser.getAnimesList(pageOne.document));

        // -1 here because we already have page one
        const totalPages = this.parser.getAnimesPagesCount(pageOne.document) - 1;
        for (let page = 1; page <= totalPages; page++) {
            // +1 to offset page number from loop
            const animesPage = await this.http.getAnimesPage(letter, page + 1);
            const animesList = this.parser.getAnimesList(animesPage.document);
            animes.push(...animesList);
        }

        return animes;
    }
}
