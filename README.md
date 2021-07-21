# GOGO Site Scrapper

GOGO Site Scrapper is a scrapping library for the site [GOGO Anime](https://gogoanime.pe/)

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install GOGO Site Scrapper.

```bash
npm install gogo-site-scrapper
```

## Example

```javascript
import { GogoHttp, GogoParser } from 'gogo-anime-scrapper'

let http = new GogoHttp();
let parser = new GogoParser();

//return the search page with keyword "slime"
http.getSearchPage("slime", doc => {
  //parse the page to get the results and print them
  console.log(parser.getSearchResults(doc))
})
```

## License
[MIT](https://choosealicense.com/licenses/mit/)