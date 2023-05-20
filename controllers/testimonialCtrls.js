const db = require('../models')

const getTestimonial = (req, res) => {
    db.Testimonial.find({})
    .then((foundTestimonial) => {
        if(!foundTestimonial){
            res.status(404).json({message: 'Cannot find testimonial'})
        } else {
            res.status(200).json({data: foundTestimonial})
        }
    })
}

const createTestimonial = (req, res) => {
    db.Testimonial.create(req.body)
    .then((createdTestimonial) => {
        if(!createdTestimonial){
            res.status(400).json({message: 'Cannot create testimonial'})
        } else {
            res.status(201).json({data: createdTestimonial, message: 'Testimonial created'})
        }
    })
}

const updateTestimonial = (req, res) => {
    db.Testimonial.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then((updatedTestimonial) => {
        if(!updatedTestimonial){
            res.status(400).json({Message: 'Could not update testimonial'})
        } else {
            res.status(200).json({Data: updatedTestimonial, Message: 'Testimonial updated'})
        }
    })
}

const deleteTestimonial = (req, res) => {
    db.Testimonial.findByIdAndDelete(req.params.id)
    .then((deletedTestimonial) => {
        if(!deletedTestimonial){
            res.status(400).json({Message: 'Could not delete testimonial'})
        } else {
            res.status(200).json({Data: deletedTestimonial, Message: 'Testimonial deleted'})
        }
    })
}

module.exports = {
    getTestimonial,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
}