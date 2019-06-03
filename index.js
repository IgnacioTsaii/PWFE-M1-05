const http = require("http");
const fs = require("fs");
const form = require("querystring")
const loki = require("lokijs")

let noticias = null;

let db = new loki("public/db/noticias.json", {
	autoload : true,
	autosave : true,
	autosaveInterval : 3000,
	autoloadCallback : function(){

		noticias = db.getCollection("noticias")
		
		if( noticias == null){

			noticias = db.addCollection("noticias")
		}
	}

})

http.createServer(function(request, response){
		
		let dir = "public/";

		let file = (request.url == "/") ? "index.html" : request.url;
			file = (file.match(/[^.]+(\.[^?#]+)?/) || [])[0];

		if( request.method == "POST" && file == "/enviar" ){
			//ACA HAY QUE LEER LOS DATOS QUE MANDO EL FORMULARIO

			request.on("data", function(datos){
				//captura los datos 

				let noticia = datos.toString()
				//los convierte en texto y los guarda en la variable  

				noticia = form.parse( noticia )
				//los convierte en obejtos y los guarda en el db

				noticias.insert(noticia)

				response.end ("Noticia guarda exitosamente :D")
			})

			//response.end("Se supone que ya leí los datos ¿?")
		}
		
		let ext = file.substring( file.lastIndexOf(".") ).toLowerCase();

		let types = {
			".html"	: "text/html",
			".js"	: "text/javascript",
			".css"	: "text/css",
			".txt" 	: "text/plain",
			".json"	: "application/json",
			".png"	: "image/png",
			".jpg"	: "image/jpg",
			".gif"	: "image/gif",
			".ico"	: "image/x-icon",
			".wav"	: "audio/wav",
			".mp4"	: "video/mp4",
			".woff"	: "application/font-woff",
			".ttf"	: "application/font-ttf",
			".eot"	: "application/vnd.ms-fontobject",
			".otf"	: "application/font-otf",
			".svg"	: "application/image/svg+xml"
		};

		let contentType = types[ext] || "application/octet-stream";

		fs.readFile( dir + file, function(error, content){
			
			if ( error ) {
				response.writeHead(404, { "Content-Type" : "text/plain" } );
				response.end("ARCHIVO NO ENCONTRADO");
			} else {
				response.writeHead(200, { "Content-Type" : contentType } );
				response.end(content);
			}

		});

}).listen(80);