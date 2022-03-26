var mongoose = require('mongoose');

//requiring string field to not to be null or undefined 
mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string');

var findTalentDataSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    desc: {
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
    
});

const findWorkFilterDataSchema = new mongoose.Schema({
    category: {
        type: Object,
        unique: true,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
        unique: true,
    },
});

const FindWorkFilterData = new mongoose.model("FindWorkFilterData", findWorkFilterDataSchema);
const FindWorkData = new mongoose.model('FindWorkData', findWorkDataSchema);

const addWorkData = (data) => {
    //user posting this information
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

module.exports = {FindWorkData, addWorkData, FindWorkFilterData};

//1 - insufficient data
//4 - successfully added the data