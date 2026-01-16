import { Author } from "../app/models";
export const INITIAL_AUTHORS: Author[] = [
  {
    id: '1',
    firstName: 'Іван',
    lastName: 'Франко',
    birthDate: '1856-08-27',
    books: [
      { id: '101', title: 'Захар Беркут', pages: 250, year: 1883, genre: 'Історична повість' },
      { id: '102', title: 'Украдене щастя', pages: 120, year: 1893, genre: 'Драма' }
    ]
  },
  {
    id: '2',
    firstName: 'Ліна',
    lastName: 'Костенко',
    birthDate: '1930-03-19',
    books: [
      { id: '201', title: 'Маруся Чурай', pages: 190, year: 1979, genre: 'Історичний роман у віршах' }
    ]
  },
  {
    id: '3',
    firstName: 'Леся',
    lastName: 'Українка',
    birthDate: '1871-02-25',
    books: [
      { id: '301', title: 'Лісова пісня', pages: 150, year: 1911, genre: 'Драма-феєрія' },
      { id: '302', title: 'Камінний господар', pages: 110, year: 1912, genre: 'Драма' }
    ]
  },
  {
    id: '4',
    firstName: 'Василь',
    lastName: 'Стус',
    birthDate: '1938-01-06',
    books: [
      { id: '401', title: 'Палімпсести', pages: 300, year: 1986, genre: 'Поезія' }
    ]
  }
];