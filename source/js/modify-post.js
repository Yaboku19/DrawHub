/*function addImageInput() {
    const imageInput = document.createElement("div");
    imageInput.id = "imgDiv";
    imageInput.innerHTML = `
        <label for="imgpost">Aggiungi immagine</label><input type="file" name="imgpost" id="imgpost" class="form-control"/>
    `;
    const lastFormCheck = document.querySelector("div.form-check.mb-2");
    lastFormCheck.parentElement.insertBefore(imageInput, lastFormCheck.nextElementSibling);
}

function removeImageInput() {
    document.getElementById("imgDiv")?.remove();
}*/

function toggleDelete() {
    if (!deleteToggled) {
        // remove all other forms
        document.getElementById("formContent")?.remove(); //il punto interrogativo serve per evitare eccezione: se non viente trovato l'elemento con id formContent non esegue il remove
        deleteToggled = true;
    } else {
        // add all forms
        const formContent = document.createElement("div");
        formContent.id = "formContent";
        formContent.innerHTML = `
            <textarea class="form-control" id="post" name="post" rows="4">${postContent}</textarea>
        `;
        const firstHr = document.getElementById("formContentDivider");
        console.log(firstHr);
        firstHr.parentElement.insertBefore(formContent, firstHr.nextElementSibling);
        deleteToggled = false;
    }
}

const deleteButton = document.getElementById("deletePost");
const postContent = document.querySelector("textarea").innerText;
let deleteToggled = false;
deleteButton.addEventListener("click", function(event) {
    toggleDelete();
});
