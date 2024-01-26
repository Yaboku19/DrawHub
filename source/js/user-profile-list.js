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
function showList(username, requestedList) {
    const formData = new FormData();
    formData.append("profileUsername", username);
    if (requestedList != "posts") {
        formData.append("requestedList", requestedList);
        axios.post("api-user-list.php", formData).then(response => {
            if (!response.data["success"]) {
                showErrorMsg(response.data["errormsg"]);
            } else {
                showUserList(response.data["userList"])
            }
        });
    } else {
        showErrorMsg(response.data["errormsg"]);
    }
}

function showUserList(users) {
  document.querySelectorAll("div.postCard").forEach(x => x.remove());
  document.querySelectorAll("div.listElement")?.forEach(x => x.remove());
  const middleColumn = document.querySelector("div.middle-column");
  const cardBody = document.createElement("div");
  cardBody.classList = "card-body bg-white listElement";
  middleColumn.appendChild(cardBody);
  users.forEach(element => {
      const newUser = document.createElement("div");
      newUser.innerHTML = `
      <div class="container mt-2 mb-2 bg-white rounded-3 p-3">
          <div class="row">
              <div class="d-flex align-items-center">
                  <div class="flex-shrink-0">
                  <img src="../img/${element["urlProfilePicture"]}" class="rounded-circle" style="width: 50px; height: 50px; object-fit: cover;" alt="foto profilo ${element["username"]}"/>
                  </div>
                  <div class="flex-grow-1 ms-3">
                      <a href="profile.php?username=${element["username"]}">${element["name"]} ${element["surname"]} @${element["username"]}</a> 
                  </div>
              </div>
          </div>
      </div>
      <hr class="m-0 p-0">`;
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
  const cardBody = document.createElement("div");
  cardBody.appendChild(errorNode);
}

function deactivateAll(listElements) {
  listElements.forEach(x => {
      x.parentElement.classList.remove("bg-primary");
      x.parentElement.classList.add("bg-secondary");
      x.parentElement.classList.add("bg-opacity-10");
      x.classList.replace("link-light", "link-primary");
      x.classList.remove("disabled");
      x.nextElementSibling.querySelector('span').classList.replace("bg-light", "bg-primary");
      x.nextElementSibling.querySelector('span').classList.replace("text-primary", "text-light");
  });
}

function activateElement(toActivate) {
  toActivate.parentElement.classList.remove("bg-secondary");
  toActivate.parentElement.classList.add("bg-primary");
  toActivate.parentElement.classList.remove("bg-opacity-10");
  toActivate.classList.replace("link-primary", "link-light");
  toActivate.classList.add("disabled");
  toActivate.nextElementSibling.querySelector('span').classList.replace("bg-primary", "bg-light");
  toActivate.nextElementSibling.querySelector('span').classList.replace("text-light", "text-primary");
}

function updateLinks(listElements, currentLink) {
  deactivateAll(listElements);
  activateElement(currentLink);
}

const followersLink = document.querySelector("a#followers");
const followingLink = document.querySelector("a#following");
const postsLink = document.querySelector("a#posts");
const profileUsername = getParameter("username");
const linkList = [postsLink, followersLink, followingLink];
updateLinks(linkList, postsLink);

function enableFollowersButton() {
  const followersLink = document.querySelector("a#followers");
  const followingLink = document.querySelector("a#following");
  const postsLink = document.querySelector("a#posts");
  const linkList = [postsLink, followersLink, followingLink];
  followersLink.addEventListener("click", function(event) {
    event.preventDefault();
    showList(profileUsername, "followers");
    updateLinks(linkList, followersLink);
  });
  followingLink.addEventListener("click", function(event) {
      event.preventDefault();
      showList(profileUsername, "following");
      updateLinks(linkList, followingLink);
  });
  postsLink.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelectorAll("div.listElement")?.forEach(x => x.remove());
    axios.post("api-showpost.php", postsViewData).then(response => {
      if (response.data["success"]) {
        showForm(response.data["posts"]);
        enableAllButtons();
        enableFollowersButton();
        if (!response.data["loggedUser"]) {
          enableFollow();
        }
      } else {
        enableFollowersButton();
        if (!response.data["loggedUser"]) {
          enableFollow();
        }
      }
    });
    updateLinks(linkList, postsLink);
  });
}