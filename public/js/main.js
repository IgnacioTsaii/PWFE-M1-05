function saludar(){
	alert("Hola desde JavaScript!")
}
function crearNoticia (titulo, autor, bajada, imagen){
	let plantilla = `<article class="row Noticia"> 
                        <div class="col-12 col-lg-4">
                          <img src="${imagen}" class="img-fluid">
                        </div>

                        <div class="col-12 col-lg-8">
                          <h3>${titulo}</h3>
                          <p>por <strong>${autor}</strong></p>
                          <p>${bajada}</p>
                        </div>
                      </article>`
    let ficha = document.createElement("div")
        ficha.classList.add("col-12", "col-md-6", "col-lg-12")
        ficha.innerHTML = plantilla 
          
      document.querySelector("#ultimas-noticias").appendChild(ficha)  

}
 /* Manipulación de un documento HTML */

 let logo = document.querySelector(".navbar-brand")

 // 3) Manipulación de Comportamiento 
 logo.onclick = cambiarLogo

 function cambiarLogo(){
 // 1) Manipulación de Contenido 
 logo.innerHTML = "Noticias <strong>eXtremas</strong>"

 // 2) Manipulación de Estructura 
 logo.style.color = "#F00"
 logo.title = "Todas las noticias"
 logo.classList.add("text-uppercase")
}