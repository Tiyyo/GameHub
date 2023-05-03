const express = require("express");
const PORT = 8080;

const app = express();

app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/", require("./routes/game"));

app.listen(PORT, () => console.log("Server runing at PORT " + PORT));
