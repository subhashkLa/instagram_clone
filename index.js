const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const cors = require("cors");

//db
mongoose.connect("mongodb+srv://band:subhash@cluster0-vd2kn.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("DB Connected"));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${ err.message }`);
});

app.use(morgan("dev"))
app.use(cors());
app.use(bodyparser.json());
app.use(cookieparser());

//router
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

app.use("/", authRouter);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//port
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node Js started ${ port }`));