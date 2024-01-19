getParameter = (key) => {
    
    address = window.location.search
    
    parameterList = new URLSearchParams(address)
    
    return parameterList.get(key)
}

/**
 * Makes a request to api-user-list.php and uses the result to populate the page
 * @param {string} username The username of the user of the current profile page
 * @param {string} requestedList The type of list requested either followers or following
*/
function makeRequestAndEdit(username, requestedList) {
    const formData = new FormData();
    formData.append("profileUsername", username);
    if (requestedList != "posts") {
        console.log("req" + requestedList);
        formData.append("requestedList", requestedList);
        axios.post("api-user-list.php", formData).then(response => {
            if (!response.data["success"]) {
                showErrorMsg(response.data["errormsg"]);
            } else {
                //console.log("responsedata " + response.data["userList"]);
                showUserList(response.data["userList"])
            }
        });
    } else {
        axios.post("api-show-user-posts.php", formData).then(response => {
            if (!response.data["success"]) {
                showErrorMsg(response.data["errormsg"]);
            } else {
                console.log(response.data["userPosts"]);
                showPostList(response.data["userPosts"], response.data["viewingLoggedUserPosts"]);
                enableAllButtons(response.data["userPosts"].length, response.data["userPosts"]);
                enablePostComment();
            }
        });
    }
}

function enableAllButtons(length, post_data) {
    for (let i = 0; i < length; i++) {
        console.log(post_data[i]);
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
        console.log("caio");
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
        document.getElementById("commentInput").value = "";
        loadComments(postID);
      });
    } else {
      console.log("errore nel caricamento del commentspan");
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
  
const main = document.querySelector("main");
//const pippo = document.querySelector("main");
const followersLink = document.querySelector("a#followers");
const followingLink = document.querySelector("a#following");
const postsLink = document.querySelector("a#posts");
const profileUsername = getParameter("username");
const linkList = [postsLink, followersLink, followingLink];
const userImagePath = document.querySelector("img#profileImage").getAttribute("src");
followersLink.addEventListener("click", function(event) {
    event.preventDefault();
    makeRequestAndEdit(profileUsername, "followers");
    updateLinks(linkList, followersLink);
});
followingLink.addEventListener("click", function(event) {
    event.preventDefault();
    makeRequestAndEdit(profileUsername, "following");
    updateLinks(linkList, followingLink);
});
postsLink.addEventListener("click", function(event) {
    event.preventDefault();
    makeRequestAndEdit(profileUsername, "posts");
    updateLinks(linkList, postsLink);
});
makeRequestAndEdit(profileUsername, "posts");
updateLinks(linkList, postsLink);