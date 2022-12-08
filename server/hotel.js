const mongoose = require('mongoose')
const hotelSchema = new mongoose.Schema({
    nation : {type : String},
    hotelName : {type : String},
    address : {type : String},
    tel : {type : String},
    roomType : {type : String},
    originalFileName : {type : String},
    path: {type : String}
});

module.exports = mongoose.model('HotelSchema', hotelSchema)
