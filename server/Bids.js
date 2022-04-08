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
    file: {
        type: String,
    },
});

const Bid = new mongoose.model('Bid', bidsSchema);

const addBid = (data) => {

    const {workId, username, desc, amount} = data;
    if(!workId || !username || !desc || !amount || desc.length < 100){
        return 1;
    }
    if(doesUserExistWithBid(username)){
        return 3;
    }
    const newBid = new Bid({
        workId: workId, 
        username: username,
        desc: desc,
        amount: amount,
    });
    try{
        newBid.save();
        return 4;
    }catch(err){
        console.log(err);
    }
}

const doesUserExistWithBid = (username) => {
    
    Bid.find({username: username}, (error, data) => {
        return !data.length === 0;
    })
}

const getBids = async (workid) => {

    const data = await Bid.find({workid: workid});
    return data;
}

module.exports = {getBids, addBid};

//1 insufficient data
//3 only 1 bid per user is allowed 
//4 new bid added succesfully
