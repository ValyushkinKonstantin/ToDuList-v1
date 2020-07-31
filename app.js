const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["first", "second", "last"];
let itemsLenth = items.length;
let workItems = [];

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set('view engine', 'ejs');


app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
let day = today.toLocaleDateString("en-US", options);



  res.render("list", {listTitle: day, newListItem: items});

});

app.post("/", function(req, res) {

  item = req.body.newItem;

  if (req.body.list === "work list"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
res.render("list", {listTitle: "work list",  newListItem: workItems });

});

app.post("/work", function(req, res) {
   let item = req.body.newItem;
   workItems.push(item);
   res.redirect("/work");
  console.log(req.body.newItem);
});

app.get("/about", function(req,res){
res.render("about", { });

});

app.listen(3000, function() {
  console.log("Server started on port 3000")
});
