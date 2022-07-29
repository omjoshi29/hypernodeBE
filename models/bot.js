const {Schema,model} = require("mongoose")
let botSchema = new Schema({
    client : String,
    server : String,
    choice : [{
        _id:String ,
        name : String,
        subcats : [{
            name : String,
            _id : String
        }]
    }],
    link : String
})
let Bot = model("Bot",botSchema)

module.exports  = Bot;

// userid : Schema.Types.ObjectId,
// subcatid:[String],