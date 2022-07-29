const {Schema,model} = require("mongoose")
let subcatSchema = new Schema({
    name : String,
})
let subcat = model("subcat",subcatSchema)

module.exports  = subcat;