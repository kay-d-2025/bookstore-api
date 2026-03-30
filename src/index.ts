import express from 'express';
import bookRoutes from './routes/book.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT || '3000', 10);
const server = app.listen(PORT, () => console.log(`Bookstore API running on port ${PORT}`));

export { server };
export default app;