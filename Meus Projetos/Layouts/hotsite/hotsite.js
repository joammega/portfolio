let pages = document.querySelectorAll(".conteiner .pages .manual .pgs");
let listas = document.querySelectorAll(".conteiner .pages .manual .pgs ul");

for (let i = 0; i < listas.length; i++) {
  console.log("oi");
  for (let j = 0; j < listas.length; j++) {
    console.log("oi");
    listas[i].children[j].addEventListener("click", function() {
      console.log(pages[i]);
      console.log(pages[j]);
      pages[i].classList.remove("largura");
      pages[j].classList.add("largura");
    });
  }
}
