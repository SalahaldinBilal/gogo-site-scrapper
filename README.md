# GOGO Site Scrapper

GOGO Site Scrapper is a scrapping library for the site [GOGO Anime](https://gogoanime.pe/)

## Installation

Use the package manager [npm](https://nodejs.org/en/download/) (Installed with Node) to install GOGO Site Scrapper.

```bash
npm install gogo-site-scrapper
```

## Example

```javascript
const { Gogo } = require('gogo-site-scrapper');

const gogo = new Gogo("https://gogoanime.pe"); // Replace if domain changes


// Search anime with keyword "slime"
const results = await gogo.searchAnime('slime');

// Get anime data for first result
const anime = await results[0].getData();

// Get all episodes of anime
const episodes = await anime.getEpisodes();

// Get first episode of anime
const episode = await anime.getEpisode(1);

// Get players for episode
const players = await episode.getPlayers();
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
