function generateForm(post_data) {
  let section = ``;
  for (let i = 0; i < post_data.length && i < 10; i++) { 
    post_data[i]["user_has_cuore"] = chooseButtonColor(post_data[i], "user_has_cuore");
    post_data[i]["user_has_occhi_a_cuore"] = chooseButtonColor(post_data[i], "user_has_occhi_a_cuore");
    post_data[i]["user_has_occhi_neutri"] = chooseButtonColor(post_data[i], "user_has_occhi_neutri");
    post_data[i]["user_has_pollice_giu"] = chooseButtonColor(post_data[i], "user_has_pollice_giu");
    section+= `
    <div class="card my-4 bg-secondary bg-opacity-10 row"> <!-- un Post inizia da qua -->
    <div class="card-header">
        <a href="../php/profile.php?username=${post_data[i]["user"]}" class="nav-link px-0 text-dark">
            <img src="../img/${post_data[i]["urlProfilePicture"]}" class="rounded-circle py-0 mb-1" alt="foto profilo" width="40" height="40">
            <!--<i class="fs-3 bi-person-circle"></i>--> 
            <span class="fs-3 ms-2 mt-1 d-sm-inline">${post_data[i]["user"]}</span>
        </a>
    </div>
    <div class="card-body">
        <p class="card-text">${post_data[i]["description"]}</p>
        <p class="card-text"><small class="text-body-secondary">${post_data[i]["datePost"]}</small></p>
        <div class="container m-0 p-0">
        <div class="position-relative" id="post${post_data[i]["postID"]}">
        <img src="../img/${post_data[i]["urlImage"]}" class="card-img-bottom img-fluid py-2 my-1 w-100" alt="foto post" >
        </div>
        </div>
        <div class=" container">
          <div class="row">
            <div class="col-9 px-0 mx-0 d-flex">
                <button type="button" class="btn ${post_data[i]["user_has_cuore"]} position-relative my-3 ms-0 me-2 pl-0 fs-3" id="btn_cuore_${post_data[i]["postID"]}"><em class="bi-heart-fill"></em>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cuore${post_data[i]["postID"]}">
                    ${post_data[i]["cuore"]}
                  </span>
                </button>
                <button type="button" class="btn ${post_data[i]["user_has_occhi_a_cuore"]} position-relative my-3 mx-3 fs-3" id="btn_occhi_a_cuore_${post_data[i]["postID"]}"><em class="bi-emoji-heart-eyes-fill"></em>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_a_cuore${post_data[i]["postID"]}">
                    ${post_data[i]["occhi_a_cuore"]}
                  </span>
                </button>
                <button type="button" class="btn ${post_data[i]["user_has_occhi_neutri"]} position-relative my-3 mx-2 fs-3" id="btn_occhi_neutri_${post_data[i]["postID"]}"><em class="bi-emoji-neutral-fill"></em>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_neutri${post_data[i]["postID"]}">
                    ${post_data[i]["occhi_neutri"]}
                  </span>
                </button>
                <button type="button" class="btn ${post_data[i]["user_has_pollice_giu"]} position-relative my-3 mx-3 fs-3" id="btn_pollice_giu_${post_data[i]["postID"]}"><em class="bi-hand-thumbs-down-fill"></em>
                  <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="pollice_giu${post_data[i]["postID"]}">
                      ${post_data[i]["pollice_giu"]}
                  </span>
                </button>
              </div>
              <div class="text-end col-3 px-0 mx-0">
                <button type="button" class="btn ml-5 my-3 mx-0 fs-3" id="download${post_data[i]["postID"]}"><em class="bi-download"></em>
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
  </div><!-- un Post finisce qui -->`;
  }

return section;
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
console.log(postsView);
const postsViewData = new FormData();
postsViewData.append('postsView', postsView);
axios.post("api-showpost.php", postsViewData).then(response => {
  console.log(response.data);
  if (response.data["success"]) {
    showForm(response.data["posts"]);
    addPostIDAlreadyShow(response.data["posts"]);
    enableAllButtons();
    enablePostComment();
    loadMore();
    /*if (num == 0) {
      let element = document.getElementById('adddiv');
      let newdiv = showEndPost();
      element.append(newdiv);
      end = true;
    } else if (num < 10) {
      let element = document.getElementById('adddiv');
      let newdiv = showEndPost();
      element.append(newdiv);
      end = true;
      enableButtons(response);
    } else {
      enableButtons(response);
    }*/
    //console.log(response.data);
    //rd = response.data["posts"];
    /*sendPost();
    getLoggedUserInfo()
    dynamicButtonPost();*/
  } else {
    //div.appendChild(showError());
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
  if(button){
    button.addEventListener('click', function onclick() {
      axios.post("api-reaction.php", formData).then(response =>
        span.innerHTML=response.data[reactionType]);
        //quando viene cliccato il bottone, aggiorna dinamicamente il colore
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
      console.log(formData.get("text"));
      axios.post("api-addcomment.php", formData).then(response => {
        if (response.data["success"]) {
          loadComments(document.getElementById("idPost").innerHTML);
        } else {
          console.log(response.data["comment"]);
        }
        document.getElementById("commentInput").value = "";
      });
    });
  } else {
    console.log("errore nel caricamento del pulsante posta");
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
    console.log("errore nel caricamento del commentspan");
  }
}

function addPostIDAlreadyShow(post_data) {
  for (let index = 0; index < post_data.length; index++) {
    num.push(post_data[index]["postID"]);
  }
  //console.log(num);
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
          commentSpan.innerHTML = "commenti ("+ response.data["comments"].length +")";
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
                      <p class="d-block w-100 text-wrap fs-5">${response.data["comments"][i]["text"]}</p>
                  </div>
                  <div class="ms-auto">
                      <button data-toggle="button" class="btn btn-outline-danger" id="DeleteComment${response.data["comments"][i]["commentID"]}">Delete</button>
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
        console.log("modalBody commenti non valido");
      }
    } else {
      console.log(response.data["comment"]);
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
    console.log("delet button di id " + $comment["commentID"] + " non è stato caricato");
  }
}

function addPostIDAlreadyShow(post_data) {
  for (let index = 0; index < post_data.length; index++) {
    num.push(post_data[index]["postID"]);
  }
  //console.log(num);
}

async function loadMore() {
  if ((window.scrollY + window.innerHeight) >=(document.body.scrollHeight-10) && !loading) {
    loading=true; //per farlo svolgere una volta sola
    console.log("scorre");
    /*const formData = new FormData();
    formData.append('num', num);
    formData.append('postsView', postsView);*/
    await axios.post("api-loadMorePosts.php", {
      numPost: num,
      postsView: postsView
    }).then(response => {
      console.log(response.data);
      console.log(num);
      if (response.data["success"]) {
        showForm(response.data["posts"]);
        addPostIDAlreadyShow(response.data["posts"]);
        enableAllButtons(response.data["posts"].length, response.data["posts"]);
        console.log(num);
      }
    });
    loading=false;
  }
}/*

function showEndPost() {
  let newdiv = `<div class="d-flex justify-content-between p-2 px-3">
    <p>Non ci sono più post da mostrare</p>
  </div>`
  let div = document.createElement("div");
  div.innerHTML = newdiv;
  return div;
}

function showError() {
  let newdiv = `<div class="d-flex justify-content-between p-2 px-3 bg-light">
    <p class="fs-3">Errore! Si prega di riprovare o ripetere l'accesso. </p>
  </div>`
  let div = document.createElement("div");
  div.innerHTML = newdiv;
  return div;
}*/