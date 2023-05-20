const mongoose = require('mongoose')

const TestimonialSchema = new mongoose.Schema({
    title: String,
    image: String,
    opinion: String,
    createdBy: String,
    location: String
})

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;