function loadfollower(follower, color) {
  return `
    <div>
      <div class="container ${color} border"> 
        <div class="row d-flex align-items-center mt-2">
          <div class="col-auto">
            <p>
            <a href="../php/profile.php?username=${follower["newFollowerUser"]}" class="d-inline-block text-decoration-none text-primary">${follower["newFollowerUser"]}</a> ti ha seguito
            </p>
          </div>
          <div class="col-auto ms-auto">
            <button data-toggle="button" class="btn btn-outline-danger" id="delete-follower${follower["notificationID"]}">Delete</button>
          </div>
        </div>
      </div> 
    </div>
  `;
}

function loadcomment(comment, color) {
  return `
      <div class="container ${color} border"> 
        <div class="row align-items-center">
          <div class="col-auto">
            <p class="mt-2">
              <a href="../php/profile.php?username=${comment["newCommentUser"]}" class="d-inline-block text-decoration-none text-primary">${comment["newCommentUser"]} </a> ha commentato in questo post:  
            </p> 
          </div>
          <div class="col-auto">
            <img class="my-2" src="../img/${comment["urlImage"]}" alt="immagine del post" height="70" >
          </div>
          <div class="col-auto ms-auto">
            <button data-toggle="button" class="btn btn-outline-danger" id="delete-comment${comment["notificationID"]}">Delete</button>
          </div>
        </div>
      </div>
  `;
}

function loadreaction(reaction, color) {
  return `
    <div>
      <div class="container ${color} border"> 
        <div class="row align-items-center">
          <div class="col-auto">
            <p class="mt-2"><a href="../php/profile.php?username=${reaction["newReactionUser"]}" class="d-inline-block text-decoration-none text-primary">${reaction["newReactionUser"]} </a> ha reagito al post con:  <em class="${reaction["tagImage"]} text-danger"></em></p> 
          </div>
          <div class="col-auto">
            <img class="my-2" src="../img/${reaction["urlImage"]}" alt="immagine del post" height="70" >
          </div>
          <div class="col-auto ms-auto">
            <button data-toggle="button" class="btn btn-outline-danger" id="delete-reaction${reaction["notificationID"]}">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function containerBase() {
  return `
    <div class="container mt-3" id="notificationContainer">
      
    </div>
  `;
}

function enableDeleteButton (btn, notification) {
  if(btn) {
    console.log(btn);
    btn.addEventListener("click", () => {
      let id = btn.id;
      let type = id.split('-')[1];
      type = type.replace(/\d+/g, '');
      const formData = new FormData();
      formData.append("tableName", "new" + type);
      formData.append("notificationID", notification["notificationID"]);
      console.log(formData.get("tableName"));console.log(formData.get("notificationID"));
      axios.post("api-deletenotification.php", formData).then(response => {
        if (response.data["success"]) {
          showNotification();
        } else {
          console.log(response.data["comment"]);
        }
      });
    });
  } else {
    console.log("errore nel caricamento del bottone delete ");
  }
}

function showNotification () {
  div.innerHTML = "";
  axios.get("api-getnotification.php").then(response => {
    if (response.data["success"]) {
      let array = response.data["followers"].concat(response.data["comments"], response.data["reactions"]);
      let sortedArray = array.sort((a, b) => new Date(b["dateNotification"]) - new Date(a["dateNotification"]));
      let color = background;
      sortedArray.forEach(notification => {
        color = chooseColor(color);
        if (notification["newFollowerUser"] !== undefined) {
          div.innerHTML += loadfollower(notification, color);
        } else if (notification["newCommentPostID"] !== undefined) {
          div.innerHTML += loadcomment(notification, color);
        } else {
          div.innerHTML += loadreaction(notification, color);
        }
      });
      sortedArray.forEach(notification => {
        if (notification["newFollowerUser"] !== undefined) {
          enableDeleteButton(document.getElementById("delete-follower" + notification["notificationID"]), notification);
        } else if (notification["newCommentPostID"] !== undefined) {
          enableDeleteButton(document.getElementById("delete-comment" + notification["notificationID"]), notification);
        } else {
          enableDeleteButton(document.getElementById("delete-reaction" + notification["notificationID"]), notification);
        }
      });
    } else {
      console.log(response.data["comment"]);
    }
  });
}

function chooseColor(color) {
  if(color == background) {
    return "bg-white"
  } else {
    return background;
  }
}

const background = "bg-secondary bg-opacity-10";
let div = document.getElementById("dinamic"); 
div.innerHTML += containerBase();
div = document.getElementById("notificationContainer");
showNotification();  