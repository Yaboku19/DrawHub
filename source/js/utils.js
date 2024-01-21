/**
 * Shows a list of posts in the main section of html
 * @param {*} posts The list of posts to show
 */
function showPostList(posts, addModifyButton) {
    console.log("sono dentro");
    document.querySelectorAll("div.listElement")?.forEach(x => x.remove());
    const middleColumn = document.querySelector("div.middle-column");
    const cardBody = document.createElement("div");
    cardBody.classList = "card-body bg-white listElement rounded-3";
    middleColumn.appendChild(cardBody);
    posts.forEach(element => {
        element["user_has_cuore"] = chooseButtonColor(element, "user_has_cuore");
        element["user_has_occhi_a_cuore"] = chooseButtonColor(element, "user_has_occhi_a_cuore");
        element["user_has_occhi_neutri"] = chooseButtonColor(element, "user_has_occhi_neutri");
        element["user_has_pollice_giu"] = chooseButtonColor(element, "user_has_pollice_giu");
        let modifyButton = "";
        if (addModifyButton) {
            /*modifyButton = `
                <button id="modify${element["postID"]}" class="btn btn-outline-primary position-relative m-2 mx-3">
                    Modifica post
                </button>
            `;*/
            modifyButton = `
                <a href="../php/showModifyPost.php?postId=${element["postID"]}&descrizione=${element["description"]}"><button id="modify${element["postID"]}" class="btn btn-outline-primary position-relative m-2 mx-3">
                    Modifica post
                </button></a>
            `;
        }
        let img = "";
        if (element["urlImage"] != null) {
            img = `<img src="../img/${element["urlImage"]}" alt="immagine del post" class="img-fluid">`;
        }
        const newPost = document.createElement("div");
        newPost.innerHTML = `
        <div class="container">
            <div class="col d-flex justify-content-between p-2 px-3">
                <div class="d-flex flex-row align-items-center">
                    <img src="../img/${element["userProfilePicture"]}" width="50" class="rounded-circle" alt="">
                    <div class="d-flex flex-column ml-2">
                        <a class=" mx-2 nav-link" href="profile.php?username=${element["user"]}">@${element["user"]}</a>
                    </div>
                </div>
                <div class="d-flex flex-row mt-1 ellipsis">
                    <small class="mr-2">${element["datePost"]}</small>
                    <em class="fa fa-ellipsis-h"></em>
                </div>
                </div>
                <div class="px-4 mt-3 mb-3">
                ${img}
            <p class=" my-2 text-justify">${element["description"]}.</p>
            </div>
            <div class="mt-4">

            <button type="button" class="btn ${element["user_has_cuore"]} position-relative mx-3 fs-5" id="btn_cuore_${element["postID"]}"><em class="bi-heart-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cuore${element["postID"]}">
                ${element["cuore"]}
              </span>
            </button>
            <button type="button" class="btn ${element["user_has_occhi_a_cuore"]} position-relative mx-3 fs-5" id="btn_occhi_a_cuore_${element["postID"]}"><em class="bi-emoji-heart-eyes-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_a_cuore${element["postID"]}">
                ${element["occhi_a_cuore"]}
              </span>
            </button>
            <button type="button" class="btn ${element["user_has_occhi_neutri"]} position-relative mx-3 fs-5" id="btn_occhi_neutri_${element["postID"]}"><em class="bi-emoji-neutral-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_neutri${element["postID"]}">
                ${element["occhi_neutri"]}
              </span>
            </button>
            <button type="button" class="btn ${element["user_has_pollice_giu"]} position-relative mx-3 fs-5" id="btn_pollice_giu_${element["postID"]}"><em class="bi-hand-thumbs-down-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="pollice_giu${element["postID"]}">
                  ${element["pollice_giu"]}
              </span>
            </button>`

            + modifyButton +
            `
            <hr>
            </div>
            </div>
            <div class="card-footer">
            <a data-bs-toggle="modal" data-bs-target="#commentModal" class="nav-link px-0 text-dark mx-4">
                <i class="bi-chat-left-text "></i> <span class="fs-6 ms-2 d-sm-inline" id="comment${element["postID"]}">Commenti (${element["num_comments"]})</span>
            </a>
            </div>
        `;
        cardBody.appendChild(newPost);
        /*if (addModifyButton) {
            document.getElementById("modify" + element["postID"]).addEventListener("click", function() {
                //console.log("chiamo modifypost.php");
                const formData = new FormData();
                formData.append("postId", element["postID"]);
                formData.append("descrizione", element["description"]);

                axios.post("showModifyPost.php", formData).then(response => {
                    if(response.data["success"]){
                        console.log("funziona");
                        console.log(response.data["check"]);
                    } else {
                        console.log("mostro errore");
                        //document.getElementById("error-text").innerText = "Descrizione non valida";
                    }
                });
                //window.location.href = `../php/modify-post.php?postId=${element["postID"]}`;
            });
        }*/
        /*updateButton(posts, btnLike, numeroLike, 1, -1, "btnlkd");
        updateButton(posts, btnFire, numeroFire, 2, -2, "btnFireLkd");
        updateButton(posts, btnSmile, numeroSmile, 3, -3, "btnSmileLkd");
        updateButton(posts, btnCuore, numeroCuore, 4, -4, "btnCuoreLkd");
        updateButton(posts, btnBacio, numeroBacio, 5, -5, "btnBacioLkd");*/
    });
}

function chooseButtonColor(data, index) {
    if(data[index]) {
      data[index]="btn-danger";
    } else {
      data[index]="btn-outline-danger";
    }
    return data[index];
  }

/**
 * Shows a list of users in the main section of html
 * @param {*} users The list of users to show
 */
function showUserList(users) {
    document.querySelectorAll("div.listElement")?.forEach(x => x.remove());
    const middleColumn = document.querySelector("div.middle-column");
    const cardBody = document.createElement("div");
    cardBody.classList = "card-body bg-white listElement";
    middleColumn.appendChild(cardBody);
    users.forEach(element => {
        const newUser = document.createElement("div");
        newUser.innerHTML = `
        <div class="container mt-4 mb-5 bg-white rounded-3 p-3">
            <div class="row">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                    <img src="${uploadDir}${element["urlProfilePicture"]}" class="rounded-circle" width="50" hight="50" alt="">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <a href="profile.php?username=${element["username"]}">${element["name"]} ${element["surname"]} @${element["username"]}</a> 
                    </div>
                </div>
            </div>
        </div>`;
        cardBody.appendChild(newUser);
    });
}

function showErrorMsg(errorMsg) {
    document.querySelectorAll("div.listElement")?.forEach(x => x.remove());
    const errorNode = document.createElement("div");
    errorNode.classList = "listElement";
    errorNode.innerHTML = `
        <div class="bg-danger text-white border border-danger-subtle rounded-3 container-md my-5">
            <p class="text-center">${errorMsg}</p>
        </div>
    `;
    main.appendChild(errorNode);
}

function deactivateAll(listElements) {
    listElements.forEach(x => {
        x.parentElement.classList.replace("bg-primary", "bg-light");
        x.classList.replace("link-light", "link-primary");
        x.classList.remove("disabled");
        x.nextElementSibling.classList.replace("bg-light", "bg-primary");
        x.nextElementSibling.classList.replace("text-primary", "text-light");
    });
}

function activateElement(toActivate) {
    toActivate.parentElement.classList.remove("bg-light");
    toActivate.parentElement.classList.add("bg-primary");
    toActivate.classList.replace("link-primary", "link-light");
    toActivate.classList.add("disabled");
    toActivate.nextElementSibling.classList.replace("bg-primary", "bg-light");
    toActivate.nextElementSibling.classList.replace("text-light", "text-primary");
}

function updateLinks(listElements, currentLink) {
    deactivateAll(listElements);
    activateElement(currentLink);
}