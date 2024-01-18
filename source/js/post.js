function generatePost(post_data) {
  let section = ``;
  for (let i = 0; i < post_data.length && i < 10; i++) { 
    post_data[i]["user_has_cuore"] = chooseButtonColor(post_data[i], "user_has_cuore");
    post_data[i]["user_has_occhi_a_cuore"] = chooseButtonColor(post_data[i], "user_has_occhi_a_cuore");
    post_data[i]["user_has_occhi_neutri"] = chooseButtonColor(post_data[i], "user_has_occhi_neutri");
    post_data[i]["user_has_pollice_giu"] = chooseButtonColor(post_data[i], "user_has_pollice_giu");
    section+= `
    <div class="card my-4 bg-secondary bg-opacity-10 row"> <!-- un Post inizia da qua -->
    <div class="card-header">
        <a href="#" class="nav-link px-0 text-dark">
            <img src="${uploadDir}${post_data[i]["urlProfilePicture"]}" class="rounded-circle py-0 mb-1" alt="..." width="40" height="40">
            <!--<i class="fs-3 bi-person-circle"></i>--> 
            <span class="fs-3 ms-2 mt-1 d-sm-inline">${post_data[i]["user"]}</span>
        </a>
    </div>
    <div class="card-body">
        <p class="card-text">${post_data[i]["description"]}</p>
        <p class="card-text"><small class="text-body-secondary">${post_data[i]["datePost"]}</small></p>
        <img src="${uploadDir}${post_data[i]["urlImage"]}" class="card-img-bottom img-fluid py-2 my-1" alt="...">
        <div class="my-3">
            <button type="button" class="btn ${post_data[i]["user_has_cuore"]} position-relative mx-3 fs-3" id="btn_cuore_${post_data[i]["postID"]}"><em class="bi-heart-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="cuore${post_data[i]["postID"]}">
                ${post_data[i]["cuore"]}
              </span>
            </button>
            <button type="button" class="btn ${post_data[i]["user_has_occhi_a_cuore"]} position-relative mx-3 fs-3" id="btn_occhi_a_cuore_${post_data[i]["postID"]}"><em class="bi-emoji-heart-eyes-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_a_cuore${post_data[i]["postID"]}">
                ${post_data[i]["occhi_a_cuore"]}
              </span>
            </button>
            <button type="button" class="btn ${post_data[i]["user_has_occhi_neutri"]} position-relative mx-3 fs-3" id="btn_occhi_neutri_${post_data[i]["postID"]}"><em class="bi-emoji-neutral-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="occhi_neutri${post_data[i]["postID"]}">
                ${post_data[i]["occhi_neutri"]}
              </span>
            </button>
            <button type="button" class="btn ${post_data[i]["user_has_pollice_giu"]} position-relative mx-3 fs-3" id="btn_pollice_giu_${post_data[i]["postID"]}"><em class="bi-hand-thumbs-down-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" id="pollice_giu${post_data[i]["postID"]}">
                  ${post_data[i]["pollice_giu"]}
              </span>
            </button>
        </div>
    </div>
    <div class="card-footer">
      <a data-bs-toggle="modal" data-bs-target="#commentModal" class="nav-link px-0 text-dark">
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


function showPost(post_data) {
  let form = generatePost(post_data);
  div.innerHTML = form; 
}


document.addEventListener(
  'scroll',
  (event) => {
    loadMore();
  },
  { passive: true }
);

let num;
let rd;
let div = document.getElementById("dinamic");
let end = false;
axios.get("api-showpost.php").then(response => {
  console.log(response.data);
  if (response.data["success"]) {
    num = response.data["posts"].length;
    showPost(response.data["posts"]);
    enableAllButtons(response.data["posts"].length, response.data["posts"]);
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
    rd = response.data["posts"];
    /*sendPost();
    getLoggedUserInfo()
    dynamicButtonPost();*/
  } else {
    div.appendChild(showError());
  }

});

function enableAllButtons(length, post_data) {
  for (let i = 0; i < length; i++) {
    enableButton(post_data[i]["postID"] ,"btn_cuore_", "cuore");
    enableButton(post_data[i]["postID"] ,"btn_occhi_a_cuore_", "occhi_a_cuore");
    enableButton(post_data[i]["postID"] ,"btn_occhi_neutri_", "occhi_neutri");
    enableButton(post_data[i]["postID"] ,"btn_pollice_giu_", "pollice_giu");
    enableComment(post_data[i]["postID"]);
  }
}

function enableButton(postID, buttonType, reactionType) {
  let buttonID = buttonType+postID;
  let spanID = reactionType + postID;
  const formData = new FormData();
  formData.append('postID', postID);
  formData.append('reactionType', reactionType);
  let button = document.getElementById(buttonID);
  let span = document.getElementById(spanID);
  
  if(button){
    button.addEventListener('click', function onclick() {
      axios.post("api-reaction.php", formData).then(response =>
        span.innerHTML=response.data[reactionType]);
        //quando viene cliccato il bottone, aggiorna dinamicamente il colore
        if(button.classList.contains("btn-outline-danger")) {
          button.classList.replace("btn-outline-danger", "btn-danger");
        } else {
          button.classList.replace("btn-danger", "btn-outline-danger");
        }
    });
  }
}

function enableComment(postID) {
  let commentSpan = document.getElementById("comment" + postID);
  if (commentSpan) {
    commentSpan.addEventListener("click", () => {
      loadComments(postID);
    });
  } else {
    console.log("errore nel caricamento del commentspan")
  }
}

function loadComments(postID) {
  const formData = new FormData();
  formData.append("postID", postID);
  axios.post("api-showcomment.php", formData).then(response => {
    if (response.data["success"]) {
      let modalBody = document.querySelector("div.comment-body");;
      if (modalBody) {
        document.querySelectorAll("div.commentsList")?.forEach(element => element.remove());
        for (let i = 0; i < response.data["comments"].length; i++) {
          const container = document.createElement("div");
          container.classList = "container commentsList p-3";
          container.innerHTML = `
            <div class="row">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1 ms-3">
                        <p> ${response.data["comments"][i]["text"]}</p>
                    </div>
                </div>
            </div>
            `;
            modalBody.appendChild(container);
        }
      } else {
        console.log("modalBody commenti non valido");
      }
    } else {
      console.log(response.data["comment"]);
    }
  });
}


async function loadMore() {
  if ((window.scrollY + window.innerHeight) >= document.body.scrollHeight) {
    console.log("scorre");
  }}
    /*loading = true;
    const formData = new FormData();
    formData.append('num', num);
    const resp = await axios.post("api-loadPost.php", formData);
    //console.log(resp.data);

    if (!resp.data["errors"]) {
      q = resp.data["posts"];
      if (q.length == 0) {
        document.removeEventListener('scroll', loadMore);
        if (end == false) {
          let element = document.getElementById('adddiv');
          let newdiv = showEndPost();
          element.append(newdiv);
        }
        return;
      }

      rd = rd.concat(q);

      for (let i = 0; i < q.length; i++) {
        let newdiv = newPosts(q[i], i + num);
        let element = document.getElementById('adddiv');
        element.append(newdiv);
      }

      num = num + q.length;
      const btnLike = "bottoneL";
      const numeroLike = "numeroLike"
      updateButton(rd, btnLike, numeroLike, 1, -1, "btnlkd");

      const btnFire = "btnFireL";
      const numeroFire = "numeroFire"
      updateButton(rd, btnFire, numeroFire, 2, -2, "btnFireLkd");

      const btnSmile = "btnSmileL"
      const numeroSmile = "numeroSmile"
      updateButton(rd, btnSmile, numeroSmile, 3, -3, "btnSmileLkd");

      const btnCuore = "btnCuoreL"
      const numeroCuore = "numeroCuore"
      updateButton(rd, btnCuore, numeroCuore, 4, -4, "btnCuoreLkd");

      const btnBacio = "btnBacioL"
      const numeroBacio = "numeroBacio"
      updateButton(rd, btnBacio, numeroBacio, 5, -5, "btnBacioLkd");
      loading = false;
    } else {
      main.innerHTML = "";
      main.appendChild(showError());
    }
  }

}

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