function generateForm(post_data) {
    console.log(post_data);
    console.log("sono qua");
    let section = `
    <div class="container mt-2 mb-5">
        <div class="justify-content-center border bg-light">
            <div class="p-5">
                <form action="modify-post.php" method="POST">
                    <p class="fs-3 text-center"><strong><label for="post">Modifica il tuo post:</label></strong></p>
                    <hr id="formContentDivider" />
                    <div id="formContent">
                        <input type="text" class="form-control" id="post" name="descrizione" value="${post_data["description"]}" >
                    </div>
                    <hr />
                    <div class="d-flex justify-content-between">
                        <button type="submit" data-toggle="button" class="btn btn-outline-danger" id="deleteBtn"
                            name="delete">Elimina post</button>
                        <button type="submit" data-toggle="button" class="btn btn-outline-primary"  id="submitBtn"
                            name="submit">Conferma</button>
                    </div>
                    <input type="hidden" name="postId" id="postId" value="${post_data["postID"]}">
                </form>
            </div>
        </div>
    </div>`;
  
  return section;
  }

  function showForm(post_data) {
    let form = generateForm(post_data);
    div.innerHTML += form; 
  }

  function showErrorMsg(post_data, error){
    console.log("showErrorMSG");
    let section = `
    <div class="container mt-2 mb-5">
        <div class="justify-content-center border bg-light">
            <div class="p-5">
                <form action="modify-post.php" method="POST">
                    <p class="fs-3 text-center"><strong><label for="post">Modifica il tuo post:</label></strong></p>
                    <hr id="formContentDivider" />
                    <div id="formContent">
                        <input type="text" class="form-control" id="post" name="descrizione" value="${post_data["descrizione"]}" >
                    </div>
                    <hr />
                    <div class="d-flex justify-content-between">
                        <button type="submit" data-toggle="button" class="btn btn-outline-danger" id="deleteBtn"
                            name="delete">Elimina post</button>
                        <button type="submit" data-toggle="button" class="btn btn-outline-primary"  id="submitBtn"
                            name="submit">Conferma</button>
                    </div>
                    <input type="hidden" name="postId" id="postId" value="${post_data["postID"]}">
                </form>
                <div>
                    <p class="text-danger m-0" id="error-text">${error}</p>
                </div>
            </div>
        </div>
    </div>`;
    div.innerHTML = section;
  }
  
  let div = document.getElementById("dinamic");
  /*let description = document.getElementById("post");
  let postId = document.getElementById("postId");*/

  //const formData = new FormData();
  /*formData.append('postId', 3);//postId.value);
  formData.append('descrizione', "descrizione");//description.value);*/
  axios.post("modify-post.php")/*, formData)*/.then(response => {
    console.log(response.data);
    if (response.data["success"]) {
        showForm(response.data["postInfo"]);
    } else {
        console.log("MOSTRO ERRORE");
        showErrorMsg(response.data, response.data["errormsg"]);
    }
  });

/*let submitBtn = document.getElementById("submitBtn");

if(submitBtn){
    submitBtn.addEventListener('click', function onclick() {
        //formData.append("submit", true);
        axios.post("modify-post.php")/*, formData).then(response => {
            if(response["success"]) {
                //devo aggiornare la pagina
                console.log("success");
                //window.location.href = '../php/profile.php?username=' + response["user"];
            } else {
                console.log("fail");
                showErrorMsg(response.data["errormsg"]);
            }
        });
    })
}
let deleteBtn = document.getElementById("deleteBtn");
if(deleteBtn){
    deleteBtn.addEventListener('click', function onclick() {
        //formData.append("delete", true);
        axios.post("modify-post.php", formData).then(response =>{
            if(response["success"]) {
                //mando alla pagina del profilo
            } else {
                showErrorMsg(response.data["errormsg"]);
            }
        });
    })
}*/