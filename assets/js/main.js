function redirectGame(){
    if (document.querySelector("#pseudo").value != ""){
        localStorage.setItem("player",document.querySelector("#pseudo").value)
        window.location.href = "./pages/foxy.html"
    }
}

