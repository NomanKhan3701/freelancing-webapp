var mongoose = require('mongoose');
  
var categoryDataSchema = new mongoose.Schema({
    category: {
        type: String,
        unique: true
    },
    desc: String,
    img:{
        data: Buffer,
        contentType: String
    }
});
  
//Image is a model which has a schema imageSchema
  
module.exports = new mongoose.model('CategoryData', categoryDataSchema);