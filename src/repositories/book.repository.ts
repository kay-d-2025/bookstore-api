import { Book } from '../models/book.model';

let books: Book[] = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', price: 50 },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction', price: 75 },
];
let nextId = 3;

export const bookRepository = {
  findAll: (): Book[] => books,

  findById: (id: number): Book | undefined =>
    books.find((b) => b.id === id),

  findByGenre: (genre: string): Book[] =>
    books.filter((b) => b.genre.toLowerCase() === genre.toLowerCase()),

  create: (data: Omit<Book, 'id'>): Book => {
    const book = { id: nextId++, ...data };
    books.push(book);
    return book;
  },

  update: (id: number, data: Partial<Omit<Book, 'id'>>): Book | undefined => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return undefined;
    books[index] = { ...books[index], ...data };
    return books[index];
  },

  delete: (id: number): boolean => {
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  },
};

export const resetBooks = () => {
  books = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', price: 50 },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction', price: 75 },
  ];
  nextId = 3;
};