var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  seller:{
    type: String
  },
  updatedAt: Date
  },{collection: 'Products'}
);

mongoose.model('Product', productSchema);
