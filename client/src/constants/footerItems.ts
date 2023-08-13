import {
  ImdbSVG,
  DcSVG,
  MarvelSVG,
  KinopoiskSVG,
  GithubSVG,
} from '@images/index';

const footerItems = [
  { id: 1, link: 'https://www.marvel.com/', Image: MarvelSVG, alt: 'marvel' },
  { id: 2, link: 'https://www.dc.com/', Image: DcSVG, alt: 'dc' },
  { id: 3, link: 'https://www.imdb.com/', Image: ImdbSVG, alt: 'imdb' },
  {
    id: 4,
    link: 'https://www.kinopoisk.ru/',
    Image: KinopoiskSVG,
    alt: 'kinopoisk',
  },
  {
    id: 5,
    link: 'https://github.com/ardxel/pet-project-superhero-films',
    Image: GithubSVG,
    alt: 'github repository',
  },
];
export default footerItems;
