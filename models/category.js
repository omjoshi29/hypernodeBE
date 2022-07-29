const {Schema,model} = require("mongoose")
let catSchema = new Schema({
    name : String,
    subcatid : [Schema.Types.ObjectId]
})
let category = model("category",catSchema)

module.exports  = category;