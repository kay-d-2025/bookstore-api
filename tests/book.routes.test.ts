import request from 'supertest';
import app from '../src/index';
import { server } from '../src/index';

afterAll(() => server.close());

describe('Book Routes', () => {
  it('GET /books returns 200 and an array', async () => {
    const res = await request(app).get('/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /books creates a book', async () => {
    const res = await request(app).post('/books')
      .send({ title: 'Dune', author: 'Frank Herbert', genre: 'Sci-Fi', price: 40 });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /books/:id returns 404 for missing book', async () => {
    const res = await request(app).get('/books/9999');
    expect(res.status).toBe(404);
  });

  it('GET /books/discounted-price returns correct result', async () => {
    const res = await request(app)
      .get('/books/discounted-price?genre=Fiction&discount=10');
    expect(res.status).toBe(200);
    expect(res.body.total_discounted_price).toBe(112.5);
  });

  it('DELETE /books/:id returns 204', async () => {
    const created = await request(app).post('/books')
      .send({ title: 'Temp', author: 'Author', genre: 'Test', price: 10 });
    const res = await request(app).delete(`/books/${created.body.id}`);
    expect(res.status).toBe(204);
  });
});