const mongoose = require("mongoose");

const connection = mongoose.connect(`mongodb+srv://gauravxv:Gaurav123456789@cluster0.fjs316e.mongodb.net/greenmentor`);

module.exports = {
    connection
}