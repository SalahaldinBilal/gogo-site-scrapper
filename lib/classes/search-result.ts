import GogoHttp from "../http/gogo-http";
import GogoParser from "../parsers/gogo-parser";
import { SearchResult as ISearchResult } from "../types/search-result";
import Anime from "./anime";

const http = new GogoHttp();
const parser = new GogoParser();

export default class SearchResult implements ISearchResult {
    name: string;
    url: string;
    img: string;
    released: number;
    type: "dub" | "sub";

    constructor(data: ISearchResult) {
        this.name = data.name;
        this.url = data.url;
        this.img = data.img;
        this.released = data.released;
        this.type = data.type;
    }

    public async getData() {
        const infoPage = await http.getAnimeInfoPage(this.name);
        return infoPage.document && new Anime(parser.getAnimeInfo(infoPage.document));
    }

}