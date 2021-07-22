import Gogo from "./wrapper/gogo";
import GogoHttp from "./http/gogo-http";
import GogoParser from "./parsers/gogo-parser";
import { AnimeInfo } from "./types/anime-info";
import { EpisodeInfo } from "./types/episode-info";
import { PlayerInfo } from "./types/player-info";
import SearchResult from "./classes/search-result";
import Anime from "./classes/anime";
import Episode from "./classes/episode";

export {
  GogoHttp,
  GogoParser,
  PlayerInfo,
  EpisodeInfo,
  AnimeInfo,
  SearchResult,
  Anime,
  Episode
}

export default Gogo;