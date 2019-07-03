
const cors = require('cors');
const ytdl = require('ytdl-core');
express = require("express");
request = require("request");

app = express();
port = process.env.PORT || 8080;

app.use(cors());

app.get("*", (req, res)=>{

    var URL = req.query.q;
    //var q = req.query.q;

    console.log("query string :"+URL);

    //res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    res.header("content-type", "video/mp4");

    request.get(URL).pipe(res)

    //res.send("Hello");
})


// var server = app.listen(port, ()=>{
//     console.log("server started at port "+port);
// });

console.log("app started!!!");

module.exports = app;