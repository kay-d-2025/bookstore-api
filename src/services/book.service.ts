import { bookRepository } from '../repositories/book.repository';
import { Book } from '../models/book.model';

export const bookService = {
  getAllBooks: (): Book[] => bookRepository.findAll(),

  getBookById: (id: number): Book => {
    if (isNaN(id)) throw { status: 400, message: 'id must be a number' };
    const book = bookRepository.findById(id);
    if (!book) throw { status: 404, message: `Book with id ${id} not found` };
    return book;
  },

  createBook: (data: Omit<Book, 'id'>): Book => {
    if (!data.title || !data.author || !data.genre || data.price == null)
      throw { status: 400, message: 'title, author, genre and price are required' };
    if (data.price < 0)
      throw { status: 400, message: 'price must be a positive number' };
    return bookRepository.create(data);
  },

  updateBook: (id: number, data: Partial<Omit<Book, 'id'>>): Book => {
    if (isNaN(id)) throw { status: 400, message: 'id must be a number' };
    if (data.price !== undefined && data.price < 0)
      throw { status: 400, message: 'price must be a positive number' };
    const book = bookRepository.update(id, data);
    if (!book) throw { status: 404, message: `Book with id ${id} not found` };
    return book;
  },

  deleteBook: (id: number): void => {
    if (isNaN(id)) throw { status: 400, message: 'id must be a number' };
    const deleted = bookRepository.delete(id);
    if (!deleted) throw { status: 404, message: `Book with id ${id} not found` };
  },

  getDiscountedPrice: (genre: string, discount: number) => {
    if (isNaN(discount)) throw { status: 400, message: 'discount must be a number' };
    if (discount < 0 || discount > 100)
      throw { status: 400, message: 'discount must be between 0 and 100' };
    const books = bookRepository.findByGenre(genre);
    if (books.length === 0)
      throw { status: 404, message: `No books found for genre: ${genre}` };
    const total = books.reduce((sum, b) => sum + b.price, 0);
    const totalDiscounted = parseFloat((total - (discount / 100) * total).toFixed(2));
    return { genre, discount_percentage: discount, total_discounted_price: totalDiscounted };
  },
};