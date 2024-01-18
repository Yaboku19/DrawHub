// Riferimenti agli elementi HTML
//var btnCommenti = document.getElementById("btnCommenti");
//var modalContainer = document.getElementById("modalContainer");
//var modalContent = document.getElementById("modalContent");
//var commentiList = document.getElementById("commentiList");

// Event listener per il clic sul bottone "Commenti"
//btnCommenti.addEventListener("click", apriFinestra);
condition = true;
let i = 0;
console.log("qui");
while (condition) {
    let btn = document.getElementById("btnCommenti" + i);
    i++;
    
    if (btn) {
        btn.addEventListener("click", () => {
            let container = document.getElementById("modalContainer" + i);
            container.style.display = "block";
        });
    } else {
        condition = false;
    }
}
// Funzione per aprire la finestra modale
function apriFinestra() {
    // Inserisci qui la logica per ottenere i commenti (es. dalla variabile commentiArray)
    var commenti = ["Commento 1", "Commento 2", "Commento 3"];

    // Popola la lista dei commenti
    commentiList.innerHTML = "";
    commenti.forEach(function(commento) {
        var li = document.createElement("li");
        li.textContent = commento;
        commentiList.appendChild(li);
    });

    // Mostra la finestra modale
    modalContainer.style.display = "block";
}

// Funzione per chiudere la finestra modale
function chiudiFinestra() {
    // Nascondi la finestra modale
    modalContainer.style.display = "none";
}
