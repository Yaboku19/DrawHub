function generatePost(post_data) {
  let section = `
  <div class="card my-4 bg-secondary bg-opacity-10 row"><!-- un Post inizia da qua -->
  <div class="card-header">
      <a href="#" class="nav-link px-0 text-dark">
          <i class="fs-3 bi-person-circle"></i> <span class="fs-3 ms-2 d-sm-inline">Maria_rossi23</span>
      </a>
  </div>    
  <div class="card-body">
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      <img src="../img/drawhub.png" class="card-img-bottom img-fluid py-2 my-1" alt="...">
      <div class="my-3">
          <button type="button" class="btn btn-outline-danger position-relative mx-3 fs-3"><em class="bi-hand-thumbs-up"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  54
              </span>
          </button>
          <button type="button" class="btnSmile btnSmileL btn btn-outline-danger position-relative mx-3 fs-3"><em class="bi bi-emoji-smile-upside-down"></em>
          <span class="numeroSmile position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              78
          </span>
          </button>
          <button type="button" class="btnCuore btnCuoreL btn btn-outline-danger position-relative mx-3 fs-3"><em class="bi bi-heart-fill"></em>
          <span class="numeroCuore position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              166
          </span>
          </button>

          <button type="button" class="btnBacio btnBacioL btn btn-outline-danger position-relative mx-3 fs-3"><em class="bi bi-emoji-kiss"></em>
          <span class="numeroBacio position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              26
          </span>
          </button>
      </div>
  </div>
  <div class="card-footer">
      <p>commenti</p>
  </div>                    
</div><!-- un Post finisce qui -->`;
return section;
}
  /*for (let i = 0; i < post_data.length && i < 10; i++) {
    section += `
              <div class="container">
              <div class="d-flex justify-content-between p-2 px-3">
                <div class="d-flex flex-row align-items-center"> <img id="imgProfile${i}"
                    src="../img/${post_data[i]["user_image"]}" width="40" height="40" class="rounded-circle" alt="immagine profilo autore post">
                  <div class="d-flex flex-column ml-2"> <a class="nav-link" href="profile.php?username=${post_data[i]["author"]}">@${post_data[i]["author"]}</a>
                  `;

    if (post_data[i]["esame_id"] != null) {
      section += ` <small class="text-primary"><a href="class.php?class_id=${post_data[i]["esame_id"]}"> ${post_data[i]["nome_esame"]}</a></small>`;
    }
    section += `
                  </div>
                </div>
                <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">${post_data[i]["data"]}</small> <em
                    class="fa fa-ellipsis-h"></em> </div>
              </div>
              <div class="px-4 mt-3 mb-3">`;
    if (post_data[i]["immagine"] != null) {
      section += `<img src="../img/${post_data[i]["immagine"]}" alt="immagine del post" class="img-fluid">`;
    }
    section += `
                
                <p class="text-justify">${post_data[i]["string"]}</p>
              </div>
              <div class="mt-4">


                <button type="button" class="bottone bottoneL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-hand-thumbs-up"></em>
                  <span class="numeroLike position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_like"]}
                  </span>
                </button>

                <a class="btn btn-outline-danger position-relative me-2 ms-2 mb-2" href="../php/post-comment.php?post_id=${post_data[i]["post_id"]}"><em class="bi bi-chat-left-text-fill"></em>
                  <span class="numeroCommento position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_comments"]}
                  </span>
                </a>

                <button type="button" class="btnFire btnFireL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-fire"></em>
                  <span class="numeroFire position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_fire"]}
                  </span>
                </button>

                <button type="button" class="btnSmile btnSmileL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-emoji-smile-upside-down"></em>
                  <span class="numeroSmile position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_smile"]}
                  </span>
                </button>

                <button type="button" class="btnCuore btnCuoreL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-heart-fill"></em>
                  <span class="numeroCuore position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_cuore"]}
                  </span>
                </button>

                <button type="button" class="btnBacio btnBacioL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-emoji-kiss"></em>
                  <span class="numeroBacio position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data[i]["num_baci"]}
                  </span>
                </button>


              </div>
            <hr/>
            </div>
            `;
  }
  section += `
  </div>
  </div>
    </div>

`;

  const variabile = document.createElement("div");
  variabile.classList.add("container", "mt-2", "mb-5");

  variabile.innerHTML = section;
  return variabile;
}

function newPosts(post_data, i) {
  let newdiv = `
              <div class="d-flex justify-content-between p-2 px-3">
                <div class="d-flex flex-row align-items-center"> <img id="imgProfile${i}"
                    src="../img/${post_data["user_image"]}" width="50" class="rounded-circle" alt="immagine profilo autore post">
                  <div class="d-flex flex-column ml-2"> <a class="nav-link" href="profile.php?username=${post_data["author"]}">@${post_data["author"]}</a>`
  if (post_data["esame_id"] != null) {
    newdiv += ` <small class="text-primary"><a href="class.php?class_id=${post_data["esame_id"]}"> ${post_data["nome_esame"]}</a></small>`;
  }
  newdiv += `</div>
                </div>
                <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">${post_data["data"]}</small> <em
                    class="fa fa-ellipsis-h"></em> </div>
              </div>
              <div class="px-4 mt-3 mb-3">`;
  if (post_data["immagine"] != null) {
    newdiv += `<img src="../img/${post_data["immagine"]}" alt="immagine del post" class="img-fluid">`;
  }
  newdiv += `
                <p class="text-justify">${post_data["string"]}.</p>
              </div>
              <div class="mt-4">


                <button type="button" class="bottone bottoneL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-hand-thumbs-up"></em>
                  <span class="numeroLike position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_like"]}
                  </span>
                </button>

                <a class="btn btn-outline-danger position-relative me-2 ms-2 mb-2" href="../php/post-comment.php?post_id=${post_data["post_id"]}"><em class="bi bi-chat-left-text-fill"></em>
                  <span class="numeroCommento position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_comments"]}
                  </span>
                </a>

                <button type="button" class="btnFire btnFireL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-fire"></em>
                  <span class="numeroFire position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_fire"]}
                  </span>
                </button>

                <button type="button" class="btnSmile btnSmileL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-emoji-smile-upside-down"></em>
                  <span class="numeroSmile position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_smile"]}
                  </span>
                </button>

                <button type="button" class="btnCuore btnCuoreL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-heart-fill"></em>
                  <span class="numeroCuore position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_cuore"]}
                  </span>
                </button>

                <button type="button" class="btnBacio btnBacioL btn btn-outline-danger position-relative me-2 ms-2 mb-2"><em class="bi bi-emoji-kiss"></em>
                  <span class="numeroBacio position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${post_data["num_baci"]}
                  </span>
                </button>


              </div>
            
            <hr/>`
  let div = document.createElement("div");
  div.classList.add("container");
  div.innerHTML = newdiv;
  return div;
}*/

function showPost(post_data) {
  console.log("pippo");
  //main.appendChild(generatePost(post_data));
  let form = generatePost(post_data);
  let div = document.getElementById("dinamic");
  div.innerHTML = form;/*
  main.innerHTML = form;
  main.append(form);*/  
}

function sendPost() {
  const btnpost = document.querySelector(".bttnpost");
  btnpost.addEventListener('click', function onClick() {
    const qpost = document.querySelector(".quickpost").value;
    if (qpost != "") {
      //console.log(qpost);
      const formData = new FormData();
      formData.append('post', qpost);
      axios.post('../php/quickpost.php', formData).then(response => {
        if (!response.data["error"]) {
          location.reload();
          //console.log(response.data["info"]);
        } else {
          //console.log(response.data["info"]);
          document.querySelector(".quickpost").value = "";
          document.querySelector(".quickpost").placeholder = "C'è stato un errore, riprova";
        }
      });
    } else {
      //console.log("Post is empty");
    }
  });
}

function getLoggedUserInfo() {
  axios.get('../php/api-getuserinfo.php').then(response => {
    //console.log(response.data);
    if (response.data["status"]) {
      document.querySelector("#nome_utente").innerHTML = "@" + response.data["userid"];
      if (response.data["user_info"]["descrizione"] != ' ') {
        document.querySelector("#descrizione").innerHTML = response.data["user_info"]["descrizione"]
      } else {
        document.querySelector("#descrizione").innerHTML = "Nessuna descrizione inserita";
      }

      document.querySelector("#residenza").innerHTML += response.data["user_info"]["uni_residence"];

      if (response.data["uni_info"] != null) {
        document.querySelector("#universita").innerHTML = response.data["uni_info"]["nome"]
        document.querySelector("#universita").href = "uni.php?uni_id=" + response.data["uni_info"]["uni_id"];
      } else {
        document.querySelector("#universita").innerHTML = "Nessuna università selezionata";
        document.querySelector("#universita").href = "uni-list.php";
      }

      if (response.data["course_info"] != null) {
        document.querySelector("#corso").innerHTML = response.data["course_info"]["nome"];
        document.querySelector("#corso").href = "course.php?course_id=" + response.data["course_info"]["corso_id"];
      } else {
        document.querySelector("#corso").innerHTML = "Nessun corso selezionato";
        document.querySelector("#corso").href = "uni-list.php";
      }

      if (response.data["user_info"]["user_image"] != null) {
        document.querySelector("#profile_picture").src = "../img/" + response.data["user_info"]["user_image"];
      }
    } else {
      main.innerHTML = "";
      main.appendChild(showError());
    }
  });
}

function dynamicButtonPost() {
  document.querySelector(".quickpost").addEventListener('keyup', function () {
    if (document.querySelector(".quickpost").value.length > 0) {
      document.querySelector(".bttnpost").disabled = false;
    }
    else {
      document.querySelector(".bttnpost").disabled = true;
    }
  });
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
let end = false;
const main = document.querySelector("main");
/*axios.get("api-showpost.php").then(response => {
  if (response.data["success"]) {
    num = response.data["posts"].length;*/
    showPost(1/*response.data["posts"]*/);
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
    }
    rd = response.data["posts"];
    //console.log(response.data);
    sendPost();
    getLoggedUserInfo()
    dynamicButtonPost();
  } else {
    main.appendChild(showError());
  }

});*/
/*
let loading = false;

function enableButtons(response) {
  const btnLike = "bottoneL";
  const numeroLike = "numeroLike";
  updateButton(response.data["posts"], btnLike, numeroLike, 1, -1, "btnlkd");
  const btnFire = "btnFireL";
  const numeroFire = "numeroFire";
  updateButton(response.data["posts"], btnFire, numeroFire, 2, -2, "btnFireLkd");
  const btnSmile = "btnSmileL";
  const numeroSmile = "numeroSmile";
  updateButton(response.data["posts"], btnSmile, numeroSmile, 3, -3, "btnSmileLkd");
  const btnCuore = "btnCuoreL";
  const numeroCuore = "numeroCuore";
  updateButton(response.data["posts"], btnCuore, numeroCuore, 4, -4, "btnCuoreLkd");
  const btnBacio = "btnBacioL";
  const numeroBacio = "numeroBacio";
  updateButton(response.data["posts"], btnBacio, numeroBacio, 5, -5, "btnBacioLkd");
}

async function loadMore() {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight && !loading) {
    loading = true;
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