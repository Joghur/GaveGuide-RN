/* eslint-disable global-require */
/* eslint-disable max-len */
import Wish from '../models/wish';
import User from '../models/user';

export const WISHES = [
  new Wish(
    '1',
    '1',
    '1',
    'T-shirt fra Føtex',
    'Kan fåes i rød og gul',
    '100-200kr',
    'https://www.coolshop.dk/produkt/last-of-us-part-ii-2-nordic/AF6SC8/',
    'https://scale.coolshop-cdn.com/product-media.coolshop-cdn.com/AF6SC8/8a9f05152bef4aea822c13601af5d043.png/f/last-of-us-part-ii-2-nordic.png?width=580',
  ),
  new Wish(
    '2',
    '1',
    'ylTWw91y5GSPMQApgyGjcR3GWtt1',
    'Trøje fra Netto',
    'Kan fåes i rød og gul',
    '50.25',
    'https://www.coolshop.dk/produkt/last-of-us-part-ii-2-nordic/AF6SC8/',
    'http://cdn.shopify.com/s/files/1/2425/4421/products/qdfyd8zskvugr9hsflin_1200x1200.jpg?v=1592993100',
  ),
  new Wish(
    '3',
    '1',
    'ylTWw91y5GSPMQApgyGjcR3GWtt1',
    'Cykel',
    'Kan fåes i rød og gul. Set billig i Bilka',
    '999kr',
    'https://www.bilka.dk/produkter/puch-sky-24-roed-2019-boernecykel/100391449',
    'https://sg-next.imgix.net/medias/sys_master/root/hb5/h16/10924034457630.jpg?w=1200&auto=format&fm=jpg',
  ),
  new Wish(
    '4',
    '1',
    '1',
    'Motor-cykel',
    'Kan fåes i rød og gul. Set billig i Bilka',
    '111.999kr',
    'https://www.bilka.dk/produkter/puch-sky-24-roed-2019-boernecykel/100391449',
    'https://i.ytimg.com/vi/2nE87ER2g4U/maxresdefault.jpg',
  ),
];

export const USERS = [
  new User(
    '1',
    'Elly',
    ['1'],
    require('../assets/elly1.jpg'),
    '#f5428d',
  ),
  new User(
    'ylTWw91y5GSPMQApgyGjcR3GWtt1',
    'Martin',
    ['1'],
    require('../assets/martin2.jpg'),
    '#f54242',
  ),
  new User(
    '3',
    'Johannes',
    ['1'],
    require('../assets/johannes3.jpg'),
    '#f5a442',
  ),
  new User(
    '4',
    'Peter',
    ['1'],
    require('../assets/peter1.jpg'),
    '#f5d142',
  ),
  new User(
    '5',
    'Bettina',
    ['1'],
    require('../assets/bettina1.jpg'),
    '#368dff',
  ),
  new User(
    '6',
    'Isabel',
    ['1'],
    require('../assets/isabel1.jpg'),
    '#41d95d',
  ),
  new User(
    '7',
    'Esther',
    ['1'],
    require('../assets/esther4.jpg'),
    '#9eecff',
  ),
  new User(
    '8',
    'Jakob',
    ['1'],
    require('../assets/jakob1.jpg'),
    '#b9ffb0',
  ),
];
