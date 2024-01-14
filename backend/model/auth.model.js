const mongoose = require("mongoose");

const authSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
})

const AuthModel = mongoose.model("authetication",authSchema);

module.exports = {
    AuthModel
}