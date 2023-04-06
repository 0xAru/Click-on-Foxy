function redirectGame() {
    if (document.querySelector("#pseudo").value != "") {
        let name = document.querySelector("#pseudo").value;
        localStorage.setItem("player", name)
        window.location.href = "./pages/foxy.html"
    }
}

