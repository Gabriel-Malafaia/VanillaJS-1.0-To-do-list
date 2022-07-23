// Botão limpar lista 
// Botão, tarefa finalizada
// Adicionar local storage 


// Pegar o valor do usuário no input e quando apertar pra criar, armazenar esse valor em um objeto com o tipo da prioridade 

let listaTarefas = document.querySelector(".list-tarefas")
let inputCriar = document.querySelector("#inputUsuario")
let buttonCriar = document.querySelector("#buttonUsuario")
let contadorTarefas = document.querySelector("h4")

// Seletor de Prioridade
let altaPrioridade = document.querySelector(".prioridade-alta")
let mediaPrioridade = document.querySelector(".prioridade-media")
let baixaPrioridade = document.querySelector(".prioridade-baixa")

// Sempre que o usuário entrar, baixa prioridade já estará selecionada
baixaPrioridade.checked = true

const localStorageTasks = JSON.parse(localStorage.getItem('arrayTarefas'))
let arrayTarefas = localStorage.getItem('arrayTarefas') !== null ? localStorageTasks : []
// Array Armazenador de tarefas 

const updateLocalStorage = () => {
    localStorage.setItem('arrayTarefas', JSON.stringify(arrayTarefas))
}

criarItem(arrayTarefas)
function criarItem(array) {
    updateLocalStorage()
    listaTarefas.innerHTML = ""
    for (i = 0; i < array.length; i++) {
        arrayTarefas.sort((a, b) => b.peso - a.peso)
        array[i].index = i
        listaTarefas.innerHTML += ` 
        <li class=${array[i].status}>

        <img class="edit" id="${array[i].index}" src="https://cdn-icons-png.flaticon.com/512/13/13467.png?w=360" alt="">
        <p>${array[i].texto}</p>
        <img id="${array[i].index}" class="remove" src="../img/icons8-lixo-48-removebg-preview-removebg-preview.png" alt="">
        </li> `
    }
    contadorTarefas.innerHTML = `Quantidade de Tarefas: ${arrayTarefas.length}`
}


buttonCriar.addEventListener("click", armazenarValor)

function armazenarValor(event) {
    event.preventDefault()

    let textoUsuario = inputCriar.value
    let classeUsuario = ''
    let pesoUsuario = 0

    if (textoUsuario.trim() !== "") {

        if (altaPrioridade.checked == true) {
            classeUsuario = 'color-alta'
            pesoUsuario = 30
        } else if (mediaPrioridade.checked == true) {
            classeUsuario = 'color-media'
            pesoUsuario = 20
        } else if (baixaPrioridade.checked == true) {
            classeUsuario = 'color-baixa'
            pesoUsuario = 10
        } else {
            alert('Coloque a prioridade da sua tarefa.')
        }

        let object = ({
            texto: textoUsuario,
            index: 0,
            status: classeUsuario,
            peso: pesoUsuario
        })

        arrayTarefas.push(object)



        criarItem(arrayTarefas)
        inputCriar.value = ""
    } else {
        alert("Digite uma tarefa válida !!!")
    }
}




// Pegando o id do elemento que eu quero mudar o texto
let id = 0

listaTarefas.addEventListener("click", removerTarefa)
function removerTarefa(event) {
    updateLocalStorage()
    let targetID = event.target.id
    id = targetID
    if (event.target.className == "remove") {
        arrayTarefas.splice(targetID, 1)
        criarItem(arrayTarefas)
    }
}


//Container modal
let mudarTexto = document.querySelector(".container-edit-text")


// Evento de Click para abrir o editor de texto
listaTarefas.addEventListener("click", abrirEditor)
function abrirEditor(event) {
    if (event.target.className == "edit") {
        mudarTexto.classList.remove("closed")
    }
}


// Evento de Click para enviar a mudança de texto
mudarTexto.addEventListener("click", editarTarefa)
function editarTarefa(event) {

    let novoTexto = document.querySelector(".input-text")

    if (event.target.className == "changeText") {
        arrayTarefas[id].texto = novoTexto.value
        mudarTexto.classList.add("closed")
    } else if (event.target.className == "closeText") {
        mudarTexto.classList.add("closed")
    }

    criarItem(arrayTarefas)
    novoTexto.value = ""
}






















