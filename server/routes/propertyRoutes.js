import express from 'express';
import {
  getAllProperties,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../config/multer.js';

const router = express.Router();

router.get('/', getAllProperties);
router.get('/my-listings', protect, getMyProperties);
router.post('/', protect, upload.single('image'), createProperty);
router.put('/:id', protect, upload.single('image'), updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;