const express = require("express");
const router = require("./routes/routes")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(router);

app.set("view engine", "ejs");
app.set("views", "views")


app.listen(8123, function() {
    console.log("Erflog auf http://localhost:8123");
});