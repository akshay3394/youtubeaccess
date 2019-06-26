express = require("express");
requests = require("request");

app = express();
port = process.env.PORT || 8080;

app.get("/stream", (request, response)=>{
    var q = request.query.q;

    console.log("query string :"+q);

    requests.get(q).pipe(response)
})


var server = app.listen(port, ()=>{
    console.log("server started at port "+port);
});