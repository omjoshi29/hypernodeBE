let Bot = require("../models/bot")
function Chatdata (data){
let save = new Bot(data)
save.save()
}
module.exports = Chatdata;