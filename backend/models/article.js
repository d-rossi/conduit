const mongoose = require('mongoose')

articleSchema = new mongoose.Schema({
    title: String,
    userId: String
})

articleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
    }
})

module.exports = mongoose.model('Article', articleSchema)