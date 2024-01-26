function generateForm(post_data, error) {
    let pError = "";
    if(error != "") {
        pError = 
        `<div>
            <p class="text-danger m-0 mt-2" id="error-text">${error}</p>
        </div>`;
    }

    let section = `
    <div class="container mt-2 mb-5">
        <div class="justify-content-center border bg-light">
            <div class="p-3">
                <form action="modify-post.php" method="POST">
                    <p class="fs-3 text-center"><strong><label for="post">Modifica il tuo post:</label></strong></p>
                    <div class="container" id="post${post_data["postID"]}">
                        <img src="../img/${post_data["urlImage"]}" class="img-fluid py-2 my-1 w-100" alt="foto post" style="max-height: 700px; object-fit:cover;"/>
                    </div>
                    <div class="container mx-0">
                        <textarea class="w-100" id="post" name="descrizione" rows="3" >${post_data["description"]}</textarea>
                    </div>
                    <hr />
                    <div class="d-flex justify-content-between">
                        <button type="submit" data-toggle="button" class="btn btn-outline-danger mx-1" id="deleteBtn"
                            name="delete">Elimina</button>
                        <button type="submit" data-toggle="button" class="btn btn-outline-primary mx-1"  id="submitBtn"
                            name="submit">Conferma</button>
                    </div>
                    <input type="hidden" name="postId" id="postId" value="${post_data["postID"]}">
                </form>
                    ${pError}
            </div>
        </div>
    </div>`;
  
  return section;
  }

function showForm(post_data, error) {
let form = generateForm(post_data, error);
div.innerHTML += form; 
}
let div = document.getElementById("dinamic");
axios.post("modify-post.php").then(response => {
if (response.data["success"]) {
    showForm(response.data["postInfo"], "");
} else {
    showForm(response.data["postInfo"], response.data["errormsg"]);
}
});