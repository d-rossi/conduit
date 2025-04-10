const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to DB!"))
            .catch(err => console.log("Failed to connect to DB: ", err.message))
}

module.exports = {connectToDB}