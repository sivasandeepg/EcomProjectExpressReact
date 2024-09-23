const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:false // not required mention
},
phone:{
    type:Number,
   
},
city:{
    type:String,
}


})
 
module.exports = mongoose.model('Employee',employeeSchema )