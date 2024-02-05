function showPage(currentSettings) {
  let form = `
    <div class="container justify-content-center align-middle p-0 m-0 my-1">
      <div class="container p-1 mb-2 bg-secondary bg-opacity-10 p-0 m-0 border">
        <div class="row p-0 m-0">
          <div class="col-6 d-flex mb-2">
            <label for="username" class="fw-bold">Username:</label>
          </div>
          <div class="col-6 d-flex mb-2">
            <label id="username" name="username">${currentSettings["username"]}</label>
          </div>
        </div>
        <div class="row p-0 m-0 my-1 py-1">
          <div class="col-sm-6 d-flex">
            <label for="bio" class="fw-bold">Biografia:</label>
          </div>
          <div class="col-sm-6 d-flex ">
            <textarea id="bio" name="bio" rows="5" cols="30">${currentSettings["bio"]}</textarea>
          </div>
        </div>
        <div class="row p-0 m-0 my-1 py-1">
          <div class="col-sm-6 my-1">
            <label for="urlProfilePicture" class="fw-bold">Immagine profilo:</label>
          </div>
          <div class="col-sm-6 text-center my-1">
            <img src="../img/${currentSettings["urlProfilePicture"]}" class="rounded-circle py-0 mb-1 image-cover" alt="foto profilo" width="120" height="120"/>
            <input type="file" name="urlProfilePicture" id="urlProfilePicture" class="form-control form-control-sm " />
          </div>
        </div>
        <div class="row p-0 m-0 my-1 py-1">
          <div class="col-sm-6">
            <label for="email" class="fw-bold">Email:</label>
          </div>
          <div class="col-sm-6">
            <input type="email" id="email" name="email" rows="1" cols="30" value="${currentSettings["email"]}"/>
          </div>
        </div>
        <div class="row p-0 m-0 my-1 py-1">
          <div class="col-sm-6">
            <label for="passw" class="fw-bold">Password:</label>
          </div>
          <div class="col-sm-6">
            <input type="password" id="passw" name="passw" value=""/>
          </div>
        </div>
        <div class="flex d-flex justify-content-between m-2">
          <p class="text-danger" id="errormsg"></p>
          <button type="submit" data-toggle="button" class="btn btn-outline-primary" id="save">Salva</button>
        </div>
        <hr/>
        <div class="flex d-flex justify-content-between me-2 mb-2">
          <p class="text-danger" id="errormsg"></p>
          <a class="btn btn-outline-danger" href="../php/login.php">Logout</a>
        </div>
      </div> 
    </div>
  `;
  main.innerHTML = form;
}

function showErrorMsg(errormsg) {
  p = document.querySelector("#errormsg");
  p.innerText = errormsg;
}

function saveChanges(bio, email, password, img, username){
  const formData = new FormData();
  formData.append("bio", bio);
  formData.append("img", img); 
  formData.append("email", email);
  formData.append("password", password);
  axios.post('api-update-settings.php', formData).then(response => {
    if(response.data["success"]) {
      window.location.href = "../php/profile.php?username=" + username;
    } else {
      showErrorMsg(response.data["errormsg"]);
    }
  });
}

function updateButton(username) {
  document.querySelector("#save").addEventListener('click', function (event) {
    event.preventDefault();
    const bio = document.querySelector("#bio").value;
    const img = document.querySelector("#urlProfilePicture") != null ? document.querySelector("#urlProfilePicture").files[0] : null;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#passw").value;
    saveChanges(bio, email, password, img, username);
  });
}

const main = document.getElementById("dinamic");
axios.get("api-get-current-settings.php").then(currentSettings => {
    if(currentSettings.data["logged"]) {
      showPage(currentSettings.data);
      updateButton(currentSettings.data["username"]);
    } else {
      window.location.href = "../php/index.php";
    }
});