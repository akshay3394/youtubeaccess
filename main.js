
const cors = require('cors');
const ytdl = require('ytdl-core');
express = require("express");
request = require("request");
fs = require("fs");

app = express();
port = process.env.PORT || 8080;

app.use(cors());

app.get("/stream", (req, res)=>{

    var URL = "https://www.youtube.com/watch?"+req.query.q;
    //var q = req.query.q;

    console.log("query string :"+URL);

    //res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    res.header("content-type", "video/mp4");

    //request.get(q).pipe(res)

    fs.unlinkSync('file.mp4',function(err){
        if(err)
            console.log(err);
        else
            console.log('file deleted successfully');
    });  
    

    ytdl(URL, {  
         format: 'mp4'
    })
    .pipe(fs.createWriteStream("file.mp4"))
    .on("finish", ()=>{
        fs.createReadStream("file.mp4").pipe(res)
        .on("close", ()=>{
            fs.unlink("file.mp4");
        });
    });


})


var server = app.listen(port, ()=>{
     console.log("server started at port "+port);
});

console.log("app started!!!");

//module.exports = app;