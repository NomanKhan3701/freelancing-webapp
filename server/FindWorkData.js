var mongoose = require('mongoose');

//requiring string field to not to be null or undefined 
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

var findWorkDataSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
        unique: true,
    },
    qualifications: {
        type: [String],
        required: true,
    },
    minBid: {
        type: Number,
        required: true,
        default: 0,
    },
    maxBid: {
        type: Number,
        required: true,
        default: 0,
    },
    numberOfBids:{
        type: Number,
        required: true,
        default: 0,
    }
    
});
  
// function isMyFieldRequired () {
//     return this.myField.length > 0 ? false : true
// }

const FindWorkData = new mongoose.model('FindWorkData', findWorkDataSchema);

const addWorkData = (data) => {
    //user posting this information
    console.log("add work data" + data);
    const {title, desc, qualifications} = data;
    if(title.length < 10 || desc.length < 30 || qualifications.length < 1){
        return 1;
    }
    const newWorkData = new FindWorkData({
        title: title,
        desc: desc,
        qualifications: qualifications,
    });
    try{
        newWorkData.save();
    }catch(err){
        console.log(err);
    }
    return 4;
}

module.exports = {FindWorkData, addWorkData};

//1 - insufficient data
//4 - successfully added the data