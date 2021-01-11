var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://devansh:password@123@cluster0.pfmml.mongodb.net/cats?retryWrites=true&w=majority");

var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});

const Print = (value) => {
  console.log(value);
}

var Cat = mongoose.model("cat",catSchema);

Cat.find({},(err,cats)=>{
    if(err){
        Print("OOps");
    }
    else{
        Print(cats);
    }
})