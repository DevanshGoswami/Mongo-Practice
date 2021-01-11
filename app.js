var express = require('express');
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var overRide = require("method-override");

var Friend = require('./friends');
const { Passport } = require('passport');

app.use(overRide("_method"));

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost/friends");



app.set("view engine", "ejs");



var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';





app.get("/",(req,res)=>{

    Friend.find({},(err,friends)=>{
    if(err){
        console.log(err);
    }
    else{
        res.render("index",{people:friends}); 
    }
    });

});

app.post("/",(req,res)=>{
    var name = req.body.name;
    var age = req.body.age;
    var desc = req.body.desc;
    var newly = {name:name,age:age,description:desc};

    Friend.create(newly,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/");
        }
    })
});

app.get("/:id",(req,res)=>{
Friend.findById(req.params.id,(err,friend)=>{
if(err){
    console.log(err);
}
else{
    res.render("show",{friend: friend});
}
});
});

app.get("/:id/edit",(req,res)=>{
    Friend.findById(req.params.id,(err,friend)=>{
    if(err){
        console.log(err);
    }
    else{
        res.render("edit",{friend: friend});
    }
    });
    });
    app.put("/:id",(req,res)=>{
        var name = req.body.name;
        var age = req.body.age;
        var desc = req.body.desc;
        var updated = {name:name,age:age,description:desc};
    
        Friend.findByIdAndUpdate(req.params.id,updated,(err,friend)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/"+req.params.id);
        }
        });
        });

        app.delete("/:id",(req,res)=>{
        
            Friend.findByIdAndRemove(req.params.id,(err,friend)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect("/");
            }
            });
            });


app.listen(server_port, server_host,()=>{
    console.log("Server Running on:" + server_host + "://" + server_port)
});