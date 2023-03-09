import {
  ImdbSVG,
  DcSVG,
  MarvelSVG,
  KinopoiskSVG,
  GithubSVG,
} from '@images/index';

const footerItems = [
  { id: 1, link: 'https://www.marvel.com/', Image: MarvelSVG, alt: '' },
  { id: 2, link: 'https://www.dc.com/', Image: DcSVG, alt: '' },
  { id: 3, link: 'https://www.imdb.com/', Image: ImdbSVG, alt: '' },
  { id: 4, link: 'https://www.kinopoisk.ru/', Image: KinopoiskSVG, alt: '' },
  {
    id: 5,
    link: 'https://github.com/ardxel/pet-project-superhero-films',
    Image: GithubSVG,
    alt: '',
  },
];
export default footerItems;
