/*function removeAllNotifications() {
    document.querySelectorAll("div.list-element")?.forEach(x => x.remove());
  }
  
  function showNotifications(response) {
    removeAllNotifications();
    response["notification-list"].forEach(element => {
      const html_string = getHtmlFromTipology(element["tipologia"] , element);
      const new_notification = document.createElement("div");
      new_notification.classList = "list-element";
      new_notification.innerHTML = `
      <div class="container mt-5 mb-5 bg-light"> 
        <div class="row d-flex align-items-center">`
        + html_string + 
        `</div>
        <button type="submit" data-toggle="button" class="delete-btn btn btn-outline-danger m-1"><em class="bi bi-x-circle"></em></button>
      </div> 
      `;
      updateBtn(element["user_1_id"], response["following-list"], element["notifica_id"], element["post_id"], new_notification);
      main.appendChild(new_notification);
    });
  } 
  
  /**
   * It returns a different output depending on the tipology
   * @param {*} tipology tipology of notification
   * @param {*} element 
   * @returns 
   *//*
  function getHtmlFromTipology(tipology, element) {
  if(element["post_id"] != null) {
    post_id = element["post_id"];
  }
  
    switch(tipology) {
      case 1:
        html_string = `<div class="d-flex justify-content-between bd-highlight p-2">
          <p class="m-0"><a href="profile.php?username=${element["user_1_id"]}">@${element["user_1_id"]}</a> ha iniziato a seguirti!</p>
          <button type="button" data-toggle="button" class="follow-btn btn btn-primary"></button>
        </div>`;
        break;
      case 2:
        html_string = `<div class="d-flex justify-content-between bd-highlight p-2">
        <p><a href="profile.php?username=${element["user_1_id"]}">@${element["user_1_id"]}</a> ha reagito al tuo post!</p>
        <button type="button" data-toggle="button" class="post-btn btn btn-outline-primary"><em class="bi bi-arrow-right"></em></button>
        </div>`;
        break;
      case 3:
        html_string = `<div class="d-flex justify-content-between bd-highlight p-2">
        <p><a href="profile.php?username=${element["user_1_id"]}">@${element["user_1_id"]}</a> ha commentato il tuo post!</p>
        <button type="button" data-toggle="button" class="post-btn btn btn-outline-primary"><em class="bi bi-arrow-right"></em></button>
        </div>`;
        break;
      default:
        break;
    }
  
    return html_string;
  }
  
  function deleteNotification(notification_id) {
    const formData = new FormData();
    formData.append("notification_id", notification_id);
    axios.post("api-remove-notification.php", formData).then(response => {
      if(!response.data["success"]) {
        console.log(response.data["errormsg"]);
      }
      axios.get("api-notification.php").then(response => {
        if (!response.data["new-notification"]) {
          removeAllNotifications();
        } else {
          showNotifications(response.data);
        }
      });
    });
  }*/
  
  /**
   * Add a new follower if bolean is true
   * else unfollow
   * @param {*} user_followed 
   * @param {*} user_follower 
   * @param {*} bolean 
   *//*
  function followOrUnfollow(user_follower, action){
    const formData = new FormData();
  
    formData.append("followed_id", user_follower);
    formData.append("action", action);
    axios.post("api-follow.php", formData).then(response => {
      if(!response.data["success"]) {
        console.log(response.data["errormsg"]);
      }
      axios.get("api-notification.php").then(response => {
        if (!response.data["new-notification"]) {
          removeAllNotifications();
        } else {
          showNotifications(response.data);
        }
      });
    });
  }
  
  function addOrReplace(btn, class_to_add, class_to_replace) {
    if(btn.classList.contains(class_to_replace)) {
      btn.classList.replace(class_to_replace, class_to_add);
    } else {
      btn.classList.add(class_to_add);
    }
  }*/
  
  /**
   * Update event listener for follow button, delete-btn
   * and post button
   * @param {*} user_follower 
   * @param {*} following_list 
   *//*
  function updateBtn(user_follower, following_list, notification_id, post_id, div) {
    followBtn = div.querySelector(".follow-btn");
    if(followBtn != null) {
      if(!following_list.includes(user_follower)) {
        followBtn.innerHTML = `<em class="bi bi-person-plus"> Segui</em>`;
        addOrReplace(followBtn, "btn-primary", "btn-danger");
        followBtn.addEventListener('click', function abstractFunct() {
          followOrUnfollow(user_follower, "follow");
        });
      } else {
        followBtn.innerHTML = `<em class="bi bi-person-plus"> Non seguire</em>`;
        addOrReplace(followBtn, "btn-danger", "btn-primary");
        followBtn.addEventListener('click', function abstractFunct() {
          followOrUnfollow(user_follower, "unfollow");
        });
      }
    }
  
    goIntoBtn = div.querySelector(".post-btn");
    if(goIntoBtn != null) {
      goIntoBtn.addEventListener('click', function abstractFunct() {
        window.location.href= "../php/post-comment.php?post_id=" + post_id;
      });
    }
  
    deleteBtn = div.querySelector(".delete-btn");
    deleteBtn.addEventListener('click', function abstractFunct() {
      deleteNotification(notification_id);
    });
  }*/


function loadfollower(follower, color) {
  return `
    <div>
      <div class="container ${color} border"> 
        <div class="row d-flex align-items-center mt-2">
          <p>
          <a href="../php/profile.php?username=${follower["newFollowerUser"]}" class="d-inline-block text-decoration-none text-primary">${follower["newFollowerUser"]}</a> ti ha seguito
          </p>
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
        </div>
      </div>
    </div>
  `;
}
const background = "bg-secondary bg-opacity-10";
let div = document.getElementById("dinamic"); 
div.innerHTML += containerBase();
div = document.getElementById("notificationContainer");
axios.get("api-getnotification.php").then(response => {
  console.log(div);
  if (response.data["success"]) {
    let array = response.data["followers"].concat(response.data["comments"], response.data["reactions"]);
    let sortedArray = array.sort((a, b) => new Date(b["dateNotification"]) - new Date(a["dateNotification"]));
    let color = background;
    sortedArray.forEach(notification => {
      color = chooseColor(color);
      if (notification["newFollowerUser"] !== undefined) {
        div.innerHTML += loadfollower(notification, color);
      }else if(notification["newCommentPostID"] !== undefined) {
        div.innerHTML += loadcomment(notification, color);
      } else {
        div.innerHTML += loadreaction(notification, color);
      }
    });
  } else {
    console.log(response.data["comment"]);
  }
});

function chooseColor(color) {
  if(color == background) {
    return "bg-white"
  } else {
    return background;
  }
}
  