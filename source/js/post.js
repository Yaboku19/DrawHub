function generateForm(post_data) {
  let section = ``;
  for (let i = 0; i < post_data.length && i < 10; i++) { 
    let modifyButton = "";
    if (post_data[i]["modifyButton"]) {
        modifyButton = `
            <a href="../php/showModifyPost.php?postId=${post_data[i]["postID"]}&descrizione=${post_data[i]["description"]}" class="d-block"><button id="modify${post_data[i]["postID"]}" class="btn btn-outline-primary position-relative mx-0 px-1 py-1 mt-2 mb-1">
                Modifica</button></a>
        `;
    }
    post_data[i]["user_has_cuore"] = chooseButtonColor(post_data[i], "user_has_cuore");
    post_data[i]["user_has_occhi_a_cuore"] = chooseButtonColor(post_data[i], "user_has_occhi_a_cuore");
    post_data[i]["user_has_occhi_neutri"] = chooseButtonColor(post_data[i], "user_has_occhi_neutri");
    post_data[i]["user_has_pollice_giu"] = chooseButtonColor(post_data[i], "user_has_pollice_giu");
    section+= `
    <div class="card my-4 bg-secondary bg-opacity-10 row postCard">
      <div class="card-header">
        <div class="container">
          <div class="row">
            <div class="col-8 p-0 m-0">
              <a href="../php/profile.php?username=${post_data[i]["user"]}" class="nav-link px-0 mx-0 my-1  text-dark">
                  <img src="../img/${post_data[i]["urlProfilePicture"]}" class="rounded-circle py-0 mb-1 image-cover" alt="foto profilo" width="40px" height="40px"/>
                  <span class="fs-3 ms-2 pt-1 mt-2 d-sm-inline">${post_data[i]["user"]}</span>
              </a>
            </div>
            <div class="col-4 text-end pl-0">
              ${modifyButton}
            </div>
          </div>
        </div>
      </div>
      <div class="card-body pb-0">
        <p class="card-text">${post_data[i]["description"]}</p>
        <p class="card-text"><small class="text-body-secondary">${post_data[i]["datePost"]}</small></p>
        <div class="container m-0 p-0">
          <div class="position-relative" id="post${post_data[i]["postID"]}">
            <img src="../img/${post_data[i]["urlImage"]}" class="card-img-bottom img-fluid py-2 my-1 w-100 post-size" alt="foto post"/>
          </div>
        </div>
        <div class=" container">
          <div class="row">
            <div class="col-10 px-0 mx-0 d-flex flex-wrap">
              <button type="button" class="btn ${post_data[i]["user_has_cuore"]} position-relative my-2 ms-0 me-2 pl-0 fs-6" id="btn_cuore_${post_data[i]["postID"]}"><em class="bi-heart-fill"></em>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cuore${post_data[i]["postID"]}">
                  ${post_data[i]["cuore"]}
                </span>
              </button>
              <button type="button" class="btn ${post_data[i]["user_has_occhi_a_cuore"]} position-relative my-2 mx-2 fs-6" id="btn_occhi_a_cuore_${post_data[i]["postID"]}"><em class="bi-emoji-heart-eyes-fill"></em>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_a_cuore${post_data[i]["postID"]}">
                  ${post_data[i]["occhi_a_cuore"]}
                </span>
              </button>
              <button type="button" class="btn ${post_data[i]["user_has_occhi_neutri"]} position-relative my-2 mx-2 fs-6" id="btn_occhi_neutri_${post_data[i]["postID"]}"><em class="bi-emoji-neutral-fill"></em>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_neutri${post_data[i]["postID"]}">
                  ${post_data[i]["occhi_neutri"]}
                </span>
              </button>
              <button type="button" class="btn ${post_data[i]["user_has_pollice_giu"]} position-relative my-2 ms-2 fs-6" id="btn_pollice_giu_${post_data[i]["postID"]}"><em class="bi-hand-thumbs-down-fill"></em>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="pollice_giu${post_data[i]["postID"]}">
                    ${post_data[i]["pollice_giu"]}
                </span>
              </button>
            </div>
            <div class="text-end col-2 px-0 mx-0">
              <button type="button" class="btn ml-5 my-2 mx-0 fs-5" id="download${post_data[i]["postID"]}"><em class="bi-download"></em>
                <a href="../img/${post_data[i]["urlImage"]}" id="image${post_data[i]["postID"]}" download="${post_data[i]["urlImage"]}"></a>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <a data-bs-toggle="modal" data-bs-target="#commentModal" class="nav-link px-0 text-dark" href="#">
          <i class="bi-chat-left-text"></i> <span class="fs-4 ms-2 d-sm-inline" id="comment${post_data[i]["postID"]}">Commenti (${post_data[i]["num_comments"]})</span>
        </a>
      </div>
      <script src="comment.js"></script>               
    </div>`;
  }

return section;
}

function showMessage(msg) {
  return `
      <div>
        <div class="container bg-secondary bg-opacity-10 border"> 
          <div class="row d-flex align-items-center my-1">
            <div class="col-12">
              <p class="my-1">
              ${msg}
              </p>
            </div>
          </div>
        </div> 
      </div>`;
}

function chooseButtonColor(data, index) {
  if(data[index]) {
    data[index]="btn-danger";
  } else {
    data[index]="btn-outline-danger";
  }
  return data[index];
}


function showForm(post_data) {
  let form = generateForm(post_data);
  div.innerHTML += form; 
}


document.addEventListener(
  'scroll',
  (event) => {
    loadMore();
  },
  { passive: true }
);

let num = [];
let rd;
let loading = false;
let div = document.getElementById("dinamic");
let end = false;
let postsView = "";
let username_profile = "";
postsView = selectPage();
username_profile = selectUsername();
//console.log(postsView);
const postsViewData = new FormData();
postsViewData.append('postsView', postsView);

postsViewData.append('username', username_profile);
axios.post("api-showpost.php", postsViewData).then(response => {
  if (response.data["success"]) {
    showForm(response.data["posts"]);
    addPostIDAlreadyShow(response.data["posts"]);
    enableAllButtons();
    enablePostComment();
    if(postsView == "Profile") {
      enableFollowersButton();
    }
    if (!response.data["loggedUser"]) {
      enableFollow();
    }
  } else {
    if(postsView=="HomePage") {
      let formMsg = showMessage(response.data["message"]);
      div.innerHTML += formMsg;
    }
    if(postsView =="Profile") {
      enableFollowersButton();
    }
    if (!response.data["loggedUser"]) {
      enableFollow();
    }
  }

});

function enableAllButtons() {
  for (let i = 0; i < num.length; i++) {
    enableButton(num[i] ,"btn_cuore_", "cuore", "bi-heart-fill");
    enableButton(num[i] ,"btn_occhi_a_cuore_", "occhi_a_cuore", "bi-emoji-heart-eyes-fill");
    enableButton(num[i] ,"btn_occhi_neutri_", "occhi_neutri", "bi-emoji-neutral-fill");
    enableButton(num[i] ,"btn_pollice_giu_", "pollice_giu", "bi-hand-thumbs-down-fill");
    enableComment(num[i]);
    enableDownload(num[i]);
  }
}

function enableButton(postID, buttonType, reactionType, iconTag) {
  let buttonID = buttonType+postID;
  let spanID = reactionType + postID;
  let postImage = "post"+postID;
  const formData = new FormData();
  formData.append('postID', postID);
  formData.append('reactionType', reactionType);
  let button = document.getElementById(buttonID);
  let span = document.getElementById(spanID);
  let postDiv = document.getElementById(postImage);
  if(button) {
    button.addEventListener('click', function onclick() {
      axios.post("api-reaction.php", formData).then(response =>
        span.innerHTML=response.data[reactionType]);
        if(button.classList.contains("btn-outline-danger")) {
          button.classList.replace("btn-outline-danger", "btn-danger");
          const react= document.createElement('em');
          react.classList.add(iconTag, "position-absolute" ,"top-50", "start-50", "text-white", "animation", "display-4");
          postDiv.appendChild(react);
          react.offsetWidth;
          react.classList.add('clicked');
          setTimeout(() => {postDiv.removeChild(react)}, 800);
        } else {
          button.classList.replace("btn-danger", "btn-outline-danger");
        }
    });
  }
}

function enableDownload(postID) {
  let buttonID = "download"+postID;
  let imageLink = "image"+postID;
  let button = document.getElementById(buttonID);
  if(button) {
    button.addEventListener('click', function onclick() {
      let a = document.getElementById(imageLink);
      if(a) {
        a.click();
      }
    });
  }
}

function enablePostComment() {
  let btn = document.getElementById("postaCommento");
  if (btn) {
    btn.addEventListener("click", () =>{
      const formData = new FormData();
      formData.append("postID", document.getElementById("idPost").innerHTML);
      formData.append("text", document.getElementById("commentInput").value);
      axios.post("api-addcomment.php", formData).then(response => {
        if (response.data["success"]) {
          loadComments(document.getElementById("idPost").innerHTML);
        } else {
          showMessage(response.data["comment"]);
        }
        document.getElementById("commentInput").value = "";
      });
    });
  } else {
    showMessage("errore nel caricamento del pulsante posta");
  }
}

function enableComment(postID) {
  let commentSpan = document.getElementById("comment" + postID);
  if (commentSpan) {
    commentSpan.addEventListener("click", () => {
      document.getElementById("commentInput").value = "";
      loadComments(postID);
    });
  } else {
    showMessage("errore nel caricamento del commentspan");
  }
}

function addPostIDAlreadyShow(post_data) {
  for (let index = 0; index < post_data.length; index++) {
    if (!num.includes(post_data[index]["postID"])) {
      num.push(post_data[index]["postID"]);
    }
  }
}

function loadComments(postID) {
  const formData = new FormData();
  formData.append("postID", postID);
  axios.post("api-showcomment.php", formData).then(response => {
    if (response.data["success"]) {
      let modalBody = document.querySelector("div.comment-body");
      let modalheader = document.getElementById("idPost");
      modalheader.innerHTML = postID;
      if (modalBody) {
        document.querySelectorAll("div.commentsList")?.forEach(element => element.remove());
        let commentSpan = document.getElementById("comment"+postID);
        if (commentSpan) {
          commentSpan.innerHTML = "Commenti ("+ response.data["comments"].length +")";
        }
        for (let i = 0; i < response.data["comments"].length; i++) {
          const container = document.createElement("div");
          container.classList = "container commentsList";
          if (response.data["comments"][i]["user"] == response.data["user"]) {
            container.innerHTML = `
              <div class="commento">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 ms-4">
                    <p>
                      <a href="../php/profile.php?username=${response.data["comments"][i]["user"]}" class=" text-wrap text-primary fs-5 d-inline-block text-decoration-none">${response.data["comments"][i]["user"]}</a>
                      <span class=" text-secondary fs-6 ms-4">${response.data["comments"][i]["dateComment"]}</span>
                    </p>
                    <p class="d-block w-100 text-break text-wrap fs-5">${response.data["comments"][i]["text"]}</p>
                  </div>
                  <div class="ms-auto">
                    <button data-toggle="button" class="btn btn-outline-danger fs-6 m-1 p-1" id="DeleteComment${response.data["comments"][i]["commentID"]}"><i class="bi bi-trash"></i></button>
                  </div>
                </div>
              </div>
              <hr/>
              `;
            modalBody.appendChild(container);
            enableDeleteBtn(response.data["comments"][i]);
          } else {
            container.innerHTML = `
              <div class="commento">
                <div class="d-flex align-items-center">
                  <div class="flex-grow-1 ms-4">
                    <p>
                      <a href="../php/profile.php?username=${response.data["comments"][i]["user"]}" class=" text-wrap text-primary fs-5 d-inline-block text-decoration-none">${response.data["comments"][i]["user"]}</a>
                      <span class=" text-secondary fs-6 ms-4">${response.data["comments"][i]["dateComment"]}</span>
                    </p>
                    <p class="d-block w-100 text-wrap fs-5">${response.data["comments"][i]["text"]}</p>
                  </div>
                </div>
              </div>
              <hr/>
              `;
              modalBody.appendChild(container);
          }
        }
      } else {
        showMessage("modalBody commenti non valido");
      }
    } else {
      showMessage(response.data["comment"]);
    }
  });
}

function enableDeleteBtn($comment) {
  let btn = document.getElementById("DeleteComment" + $comment["commentID"]);
  if (btn) {
    btn.addEventListener("click", () =>{
      const formData = new FormData();
      formData.append("postID", $comment["postID"]);
      formData.append("user", $comment["user"]);
      formData.append("commentID", $comment["commentID"]);
      axios.post("api-deletecomment.php", formData).then(response => {
        if (response.data["success"]) {
          loadComments(document.getElementById("idPost").innerHTML);
        } else {
          console.log(response.data["comment"]);
        }
      });
    });
  } else {
    console.log("delete button di id " + $comment["commentID"] + " non è stato caricato");
  }
}

async function loadMore() {
  if ((window.scrollY + window.innerHeight) >=(document.body.scrollHeight-10) && !loading) {
    loading=true;
    await axios.post("api-loadMorePosts.php", {
      numPost: num,
      postsView: postsView
    }).then(response => {
      if (response.data["success"]) {
        showForm(response.data["posts"]);
        addPostIDAlreadyShow(response.data["posts"]);
        enableAllButtons(response.data["posts"].length, response.data["posts"]);
      }
    });
    loading=false;
  }
}