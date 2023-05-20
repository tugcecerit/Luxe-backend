const mongoose = require('mongoose');
const {MONGODB_URI} = process.env

mongoose.connect(MONGODB_URI);

mongoose.connection
  .on('open', () => console.log('Your are connected to mongoose'))
  .on('close', () => console.log('Your are disconnected from mongoose'))
  .on('error', (error) => console.log(error));

  module.exports = {
    Testimonial: require('./Testimonial')
}