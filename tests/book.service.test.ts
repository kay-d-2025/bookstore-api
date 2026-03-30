import { bookService } from '../src/services/book.service';
import { resetBooks } from '../src/repositories/book.repository';

describe('bookService.getDiscountedPrice', () => {
  beforeEach(() => resetBooks());
  it('calculates correct discounted price for Fiction genre', () => {
    const result = bookService.getDiscountedPrice('Fiction', 10);
    expect(result.genre).toBe('Fiction');
    expect(result.discount_percentage).toBe(10);
    expect(result.total_discounted_price).toBe(112.5);
  });

  it('returns 0 discount when discount is 0', () => {
    const result = bookService.getDiscountedPrice('Fiction', 0);
    expect(result.total_discounted_price).toBe(125);
  });

  it('returns 0 when discount is 100', () => {
    const result = bookService.getDiscountedPrice('Fiction', 100);
    expect(result.total_discounted_price).toBe(0);
  });

  it('throws 404 when genre has no books', () => {
    expect(() => bookService.getDiscountedPrice('Horror', 10))
      .toThrow();
  });

  it('throws 400 when discount is negative', () => {
    expect(() => bookService.getDiscountedPrice('Fiction', -5))
      .toThrow();
  });

  it('throws 400 when discount exceeds 100', () => {
    expect(() => bookService.getDiscountedPrice('Fiction', 110))
      .toThrow();
  });
});

describe('bookService CRUD', () => {
  beforeEach(() => resetBooks());
  it('creates a new book', () => {
    const book = bookService.createBook({ title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', price: 40 });
    expect(book.id).toBeDefined();
    expect(book.title).toBe('Dune');
  });

  it('throws 404 when getting non-existent book', () => {
    expect(() => bookService.getBookById(9999)).toThrow();
  });

  it('throws 400 when creating book with negative price', () => {
    expect(() => bookService.createBook({ title: 'Bad', author: 'Author', genre: 'Fiction', price: -10 })).toThrow();
  });

  it('throws 404 when deleting non-existent book', () => {
    expect(() => bookService.deleteBook(9999)).toThrow();
  });
});