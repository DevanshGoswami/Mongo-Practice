var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/cat_app");

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