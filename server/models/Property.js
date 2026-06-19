import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  type: {
    type: String,
    enum: ['Apartment', 'House', 'Studio'],
    required: true
  },
  imagePath: { type: String, default: '' },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);