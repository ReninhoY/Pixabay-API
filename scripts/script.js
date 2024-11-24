let imgExibida = document.querySelector("#imgBuscada")
let btnBuscar = document.querySelector("#btnBusca")
let btnDownload = document.querySelector("#btnDownload")
var imgsEncontradas = []
var imgAtual = -1

btnBuscar.addEventListener('click', ()=>{
    let termoDeBusca = document.querySelector("#inputPalavraChave").value
    imgAtual = 0
    
    let link = `https://pixabay.com/api/?key=44112753-52a3a95bca8301a0a35df4c52&${new URLSearchParams({q: termoDeBusca})}&image_type=photo`
    console.log(link)
    fetch(link)
    .then((res)=>{
        res.json()
        .then((jsonres)=>{
            imgsEncontradas = jsonres.hits
            console.log(jsonres.hits)
            imgExibida.style.backgroundImage = `url(${jsonres.hits[0].largeImageURL})`
        })
    })
    .catch((err)=>{
        alert("Valor inserido inválido!")
    })
})

let btnsNavegacaoArray = document.getElementsByClassName("navegacao-botao")
let btnNavegacaoEsquerdo = btnsNavegacaoArray[0]
let btnNavegacaoDireito = btnsNavegacaoArray[1]

let linkIMG = ""
// Using fetch
function downloadImage(imageSrc) {
    let imgEncontrda = fetch(imageSrc).then((res)=>{
        return res.blob()
    })
    .then((imgBlob)=>{
        let imgURL = URL.createObjectURL(imgBlob)
        const link = document.createElement('a')
        link.href = imgURL
        link.download = 'image file name here'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
    .catch((err)=>{

    })
}

btnNavegacaoDireito.addEventListener('click', ()=>{
    if (imgAtual < 20) {
        imgExibida.style.backgroundImage = 'url("../resources/carregamento.gif")'
        imgAtual++

        const imagem = new Image()
        imagem.src = imgsEncontradas[imgAtual].largeImageURL

        imagem.onload = () => {
            imgExibida.style.backgroundImage = `url(${imagem.src})`
            linkIMG = imagem.src
        }
    }
})

btnNavegacaoEsquerdo.addEventListener('click', ()=>{
    if (imgAtual > 0) {
        imgAtual--
        imgExibida.style.backgroundImage = `url(${imgsEncontradas[imgAtual].largeImageURL})`

        const imagem = new Image()
        imagem.src = imgsEncontradas[imgAtual].largeImageURL

        imagem.onload = () => {
            imgExibida.style.backgroundImage = `url(${imagem.src})`
        }
    }
})

btnDownload.addEventListener('click',()=>{
    if (imgAtual >= 0) {
        downloadImage(linkIMG)    
    }
    
})




