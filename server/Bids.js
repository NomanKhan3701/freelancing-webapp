var mongoose = require('mongoose');
  
var bidsSchema = new mongoose.Schema({
    workId:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    
});
  
module.exports = new mongoose.model('Bid', bidsSchema);