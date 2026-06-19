import Property from '../models/Property.js';

export const getAllProperties = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    let filter = {};

    if (city) filter.city = { $regex: city, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ author: req.user.id })
      .sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const { title, description, price, city, country, type } = req.body;

    if (!title || !description || !price || !city || !country || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let imagePath = '';
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const property = await Property.create({
      title,
      description,
      price,
      city,
      country,
      type,
      imagePath,
      author: req.user.id,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.imagePath = `/uploads/${req.file.filename}`;
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await property.deleteOne();
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};