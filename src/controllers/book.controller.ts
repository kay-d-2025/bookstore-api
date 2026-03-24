import { Request, Response, NextFunction } from 'express';
import { bookService } from '../services/book.service';

export const bookController = {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { genre } = req.query;
      const books = genre
        ? bookService.getAllBooks().filter(
            (b) => b.genre.toLowerCase() === (genre as string).toLowerCase()
          )
        : bookService.getAllBooks();
      res.json(books);
    } catch (err) { next(err); }
  },

  getById: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(bookService.getBookById(Number(req.params.id)));
    } catch (err) { next(err); }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json(bookService.createBook(req.body));
    } catch (err) { next(err); }
  },

  update: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(bookService.updateBook(Number(req.params.id), req.body));
    } catch (err) { next(err); }
  },

  remove: (req: Request, res: Response, next: NextFunction) => {
    try {
      bookService.deleteBook(Number(req.params.id));
      res.status(204).send();
    } catch (err) { next(err); }
  },

  getDiscountedPrice: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { genre, discount } = req.query;
      if (!genre || discount === undefined)
        throw { status: 400, message: 'genre and discount query params are required' };
      res.json(bookService.getDiscountedPrice(genre as string, Number(discount)));
    } catch (err) { next(err); }
  },
};