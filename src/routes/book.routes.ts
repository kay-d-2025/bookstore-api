import { Router } from 'express';
import { bookController } from '../controllers/book.controller';

const router = Router();

router.get('/discounted-price', bookController.getDiscountedPrice);
router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/', bookController.create);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.remove);

export default router;