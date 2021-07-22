# GOGO Site Scrapper

GOGO Site Scrapper is a scrapping library for the site [GOGO Anime](https://gogoanime.pe/)

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install GOGO Site Scrapper.

```bash
npm install gogo-site-scrapper
```

## Example

```typescript
import { GogoHttp, GogoParser } from 'gogo-anime-scrapper'

let http = new GogoHttp();
let parser = new GogoParser();

//return the search page with keyword "slime"
//return a promise with an object that holds the document and the request URL
//parse the search results
http.getSearchPage("slime").then(ret => console.log(parser.getSearchResults(ret.document)))
```

## License
[MIT](https://choosealicense.com/licenses/mit/)