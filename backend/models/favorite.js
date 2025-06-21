const mongoose = require('mongoose')

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  createdAt: { type: Date, default: Date.now }
});

favoriteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        delete returnedObject._id
        delete returnedObject.userId
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Favorite', favoriteSchema)