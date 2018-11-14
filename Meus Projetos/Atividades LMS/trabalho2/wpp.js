let enviar = document.querySelector(".conteiner .mensagens .caixa form button")
let input = document.querySelector(".conteiner .mensagens .caixa form input")
let atual = "";

enviar.addEventListener("click", function(event){
    event.preventDefault();
    enviarmsg(input.value, atual)
    input.value = "";
    
})
function enviarmsg(value, id){  
    let xhttp = new XMLHttpRequest();
    let url = "http://localhost:3000/conversas"
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            carregarmsgs(atual);
            criarlista();
        }
    }

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type","application/json");
    let item = {
        idgrupo : id,
        nome : localStorage.getItem("nome"),
        mensagem : value
    }
    item = JSON.stringify(item);
    xhttp.send(item);

}
let grupo = document.querySelector(".conteiner .header .grupo h2")
function addamigo(text1, text2, id){
    let amigos = document.querySelector(".conteiner .amigos .lista");

    let img = document.createElement("div");
    img.classList.add("img");

    let nome = document.createElement("div");
    nome.classList.add("nome");
    let nome_text = document.createTextNode(text1);

    nome.appendChild(nome_text);

    let msg = document.createElement("div");
    msg.classList.add("msg");
    let msg_text = document.createTextNode(text2);

    msg.appendChild(msg_text);

    let amigo = document.createElement("div");
    amigo.classList.add("amigo");

    amigo.appendChild(img);
    amigo.appendChild(nome);
    amigo.appendChild(msg);

    amigos.appendChild(amigo);
    let caixa = document.querySelector(".conteiner .mensagens .caixa");
    amigo.addEventListener("click",function(){
        carregarmsgs(id);
        caixa.style.display = "block";
        grupo.innerHTML = text1;
        atual = id;
    })
}

function ultimamsg(user, id){
    let url = "http://localhost:3000/conversas"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            let mensagem = ""
            for(let i of parsed){
                if(i.idgrupo == id){
                    mensagem = i.mensagem;
                }
            }
            addamigo(user, mensagem, id);
        }
           
      
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}
let lista = document.querySelector(".conteiner .amigos .lista")
function criarlista(){
    let url = "http://localhost:3000/grupos"
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            let nome = "";
            let id = ""
            for(let i of parsed){
                console.log(i);
                lista.innerHTML = "";
                if(i.membros.length == 2){
                    for(let j=0; j<i.membros.length;j++){
                        if(i.membros[j].nome == localStorage.getItem("nome")){
                            if(j==1){
                                nome = i.membros[0].nome;
                            }
                            else{
                                nome = i.membros[1].nome;
                            }
                            id = i.id;
                            ultimamsg(nome, id);
                        }
                    }
                }
                else{
                    for(let j of i.membros){
                        if(j.nome == localStorage.getItem("nome")){
                            nome = i.grupo;
                            id = i.id;
                            ultimamsg(nome, id);
                        }
                    }
                }
                
            }
        }
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

function addmsg(id, mensagem){
    let conteudo = document.querySelector(".conteiner .mensagens .conteudo");

    let p = document.createElement("p");
    let p_text = document.createTextNode(mensagem);

    p.appendChild(p_text);

    let msg = document.createElement("div")

    if(localStorage.getItem("nome") == id){
        msg.classList.add("msg2");
    }
    else{
        msg.classList.add("msg1");
    }

    msg.appendChild(p);
    conteudo.appendChild(msg);

}
let conteudo = document.querySelector(".conteiner .mensagens .conteudo");
function carregarmsgs(id){
    let url = "http://localhost:3000/conversas?idgrupo="+id
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4){
            let parsed = JSON.parse(xhttp.responseText);
            
            conteudo.innerHTML = "";
            for(let i of parsed){
                addmsg(i.nome, i.mensagem);
                conteudo.scrollTop = conteudo.scrollHeight;
            }
        }
    }
    xhttp.open("GET",url, true);
    xhttp.send();

}

let button = document.querySelector(".conteiner .header .logar")
let logado = document.querySelector(".conteiner .header .logar span")
let botaogrupospan = document.querySelector(".conteiner .amigos .botao span");
function logue(){
    if(localStorage.getItem("logado") == "logado"){
        logado.innerHTML = "Sair";
        botaogrupospan.innerHTML = "Add Grupo"
        criarlista()
    }

}
function deslogue(){
    lista.innerHTML = "";
    conteudo.innerHTML = "";
    grupo.innerHTML = "";
    logado.innerHTML= "Logar";
    botaogrupospan = "";
    localStorage.setItem("nome", "");
    localStorage.setItem("logado", "deslogado")
}
button.addEventListener("click",function(){
    if(logado.innerHTML == "Logar"){
        let nome = prompt("digite seu nome de acesso");
        localStorage.setItem("nome", nome);
        localStorage.setItem("logado", "logado")
        logue();
    }
    else{
        deslogue();
    }
})
function addgrupo(){
    let xhttp = new XMLHttpRequest();
    let url = "http://localhost:3000/grupos"
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            criarlista()
        }
    }
    let grupo = prompt("Digite o nome do grupo:");
    let membro = prompt("diga o nome dos membros separando por espaço:");
    let lista = membro.split(" ")
    let membros = [];
    let cont = 1;
    for(let i of lista){
        let objeto= {nome:i, id:cont}
        membros.push(objeto);
        cont+=1;
    }
    let eu = {
        nome: localStorage.getItem("nome"),
        id:cont
    }
    membros.push(eu);
    let item= {
        grupo: grupo,
        membros: membros
    }
    xhttp.open("POST",url, true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(item));
}
let botaogrupo = document.querySelector(".conteiner .amigos .botao");
botaogrupo.addEventListener("click", function(){
    addgrupo();
})
logue()