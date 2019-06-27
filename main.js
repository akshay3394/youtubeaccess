
const cors = require('cors');
const ytdl = require('ytdl-core');
express = require("express");
request = require("request");

app = express();
port = process.env.PORT || 8080;

app.use(cors());

app.get("/stream", (req, res)=>{
    var URL = req.query.q;

    console.log("query string :"+URL);

    res.header('Content-Disposition', 'attachment; filename="video.mp4"')

    //request.get(q).pipe(res)

    ytdl(URL, {  
        format: 'mp4'
    }).pipe(res);
})


var server = app.listen(port, ()=>{
    console.log("server started at port "+port);
});