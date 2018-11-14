let button = document.querySelector(".open");
let menu = document.querySelector(".menu");
let conteudo = document.querySelector(".conteudo");
let tittles =  document.querySelectorAll(".tittle")
let textos = document.querySelectorAll(".texto")

button.addEventListener("click", function(){
    menu.classList.toggle("change");
    conteudo.classList.toggle("change");
})
function abrir(indice){
    for(let i of textos){
        i.classList.remove("abrir");
        i.classList.add("texto");
    }
    textos[indice].classList.remove("texto");
    textos[indice].classList.add("abrir");
}
for(let i=0; i<tittles.length; i++ ){
    tittles[i].addEventListener("click", function() {
        abrir(i);
    })
}