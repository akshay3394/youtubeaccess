
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
    

    ytdl(URL, {  
         format: 'mp4'
    })
    .pipe(fs.createWriteStream("file.mp4"))
    .on("finish", ()=>{
        
        console.log("finished downloading file");

        var readStream = fs.createReadStream("file.mp4");
        
        readStream.pipe(res);

        readStream.on("end", ()=>{
            
            console.log("deleting file");
            fs.unlink('file.mp4',function(err){
                if(err)
                    console.log(err);
                else
                    console.log('file deleted successfully');
            }); 
        });
    });


})


app.get("/", (req, res)=>{

    var URL = req.query.q;
    //var q = req.query.q;

    console.log("query string :"+URL);

    //res.header('Content-Disposition', 'attachment; filename="video.mp4"')
    res.header("content-type", "video/mp4");

    request.get(URL).pipe(res)

    //res.send("Hello");
})


app.get("/jio", (req, res)=>{

    var URL = "https://jiotvweb.cdn.jio.com/jiotv.live.cdn.jio.com/hotstar_isl/sshindi/master_800.m3u8?jct=KalfY6YDLWxYgPjeql1E-A&pxe=1564294443&st=2rABpyTLSDzkoYSlKcWJhg"

    req.header("content-type", "video/mp4")

    request.get(URL).pipe(res)
})


var server = app.listen(port, ()=>{
     console.log("server started at port "+port);
});

console.log("app started!!!");

//module.exports = app;