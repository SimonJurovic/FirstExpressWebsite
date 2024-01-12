const http = require("http");
const lehrangebot = require("../models/persistence.js");
const kurs = require("../models/kurs");
const Lehrperson = require("../models/lehrperson");
const semesterplan = require("../models/semesterplan");
const Studiengang = require("../models/studiengang");
const Termin = require("../models/termin");


lehrangebot.initialisiereLehrangebot();

let server = http.createServer(function(req,res){
    res.writeHead(200, {"content-type": "text/html charset=utf-8"});

    const html = `<!Doctype HMTL>
    <html> 
        <head>
            <title>Study Planner</title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1>Study Planner Test</h1>
            ${listeBefuellen()}
        </body>
    </html>`

    res.end(html);
});

server.listen(8844, function() {
    console.log("Server lauscht auf http://localhost:8844");
});

let listeBefuellen = function() {
    let list ="";
    for(elements of lehrangebot.lehrangebot){
        list += `<h2> ${elements.name} </h2>`;
        list += `${elements.getAnzahlKurse()}  Kurse enthalten: <ul>`

        for(element of elements.kurse) {
            list += `<li> ${element.toString()} </li>`
        } 
        //console.log(elements);
        list += `</ul>`
    } 
    return list;
}; 


