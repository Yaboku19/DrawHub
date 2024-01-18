function generatePost(post_data) {
  let section = ``;
  for (let i = 0; i < post_data.length && i < 10; i++) { 
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
            <button type="button" class="btn btn-outline-danger position-relative mx-3 fs-3" id="btn_cuore_${post_data[i]["postID"]}"><em class="bi-heart-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${post_data[i]["cuore"]}
              </span>
            </button>
            <button type="button" class="btn btn-outline-danger position-relative mx-3 fs-3" id="btn_occhi_a_cuore_${post_data[i]["postID"]}"><em class="bi-emoji-heart-eyes-fill"></em>
              <span class="numeroSmile position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${post_data[i]["occhi_a_cuore"]}
              </span>
            </button>
            <button type="button" class="btn btn-outline-danger position-relative mx-3 fs-3" id="btn_occhi_neutri_${post_data[i]["postID"]}"><em class="bi-emoji-neutral-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                ${post_data[i]["occhi_neutri"]}
              </span>
            </button>
            <button type="button" class="btn btn-outline-danger position-relative mx-3 fs-3" id="btn_pollice_giu_${post_data[i]["postID"]}"><em class="bi-hand-thumbs-down-fill"></em>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  ${post_data[i]["pollice_giu"]}
              </span>
            </button>
        </div>
    </div>
    <div class="card-footer">
        <p>commenti (${post_data[i]["num_comments"]})</p>
    </div>                    
  </div><!-- un Post finisce qui -->`;
  }

return section;
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
  //console.log(response.data);
  if (response.data["success"]) {
    num = response.data["posts"].length;
    showPost(response.data["posts"]);
    enableAllButtons(response.data["posts"].length);
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

function enableAllButtons(i) {
  for (let index = 1; index <= i; index++) {
    enableButton(index ,"btn_cuore_", "cuore");
    enableButton(index ,"btn_occhi_a_cuore_", "occhi_a_cuore");
    enableButton(index ,"btn_occhi_neutri_", "occhi_neutri");
    enableButton(index ,"btn_pollice_giu_", "pollice_giu");
    
  }
}

function enableButton(postID, buttonType, reactionType) {
  let buttonID = buttonType+postID;
  const formData = new FormData();
  formData.append('postID', postID);
  formData.append('reactionType', reactionType);
  let button = document.getElementById(buttonID);
  if(button){
    
    button.addEventListener('click', function onclick() {
      axios.post("api-reaction.php", formData).then(response =>
        console.log(response));

    });
  }
}

/*
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