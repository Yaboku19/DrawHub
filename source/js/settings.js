function generateOptions(values, selected, category) {
  let options = `<option value='0'></option>`;
  let add_selected = ``;
  if(values == null && category == 'course') {
    return options;
  }
  if(category != 'uni') {
    options = ``;
  }
  values.forEach(element => {
    add_selected = ``;
    switch (category) {
      case 'uni':
        if(selected == element["uni_id"]) {
          add_selected = `selected='selected'`;
        }
        options += `<option value='${element["uni_id"]}' ` + add_selected + `>${element["nome"]}</option>`;
        break;
      case 'course':
        if(selected == element["corso_id"]) {
          add_selected = `selected='selected'`;
        }
        options += `<option value='${element["corso_id"]}' ` + add_selected + `>${element["nome"]}</option>`;
        break;
      case 'residence':
        if(selected == element) {
          add_selected = `selected='selected'`;
        }
        options += `<option value='${element}' ` + add_selected + `>${element}</option>`;
        break;
    }
  });
  return options;
}

function showPage(currentSettings){//, response_select) {
  let form = `
    <div class="container justify-content-center align-middle ">
      <div class="p-lg-5 mb-5 bg-light">
        <div class="row p-2">
          <div class="col-sm-6 mb-2">
            <label for="username">Username</label>
          </div>
          <div class="col-sm-6 mb-2">
            <label id="username" name="username">${currentSettings["username"]}</label>
          </div>  
          <div class="col-sm-6">
            <label for="bio">Descrizione</label>
          </div>
          <div class="col-sm-6">
            <textarea id="bio" name="bio" rows="5" cols="30">${currentSettings["bio"]}</textarea>
          </div>
        <div class="w-100 p-2"></div>
          <div class="col-sm-6">
            <label for="urlProfilePicture">Immagine profilo</label>
          </div>
          <div class="col-sm-6">
            <input type="file" name="urlProfilePicture" id="urlProfilePicture" class="form-control" />
          </div>
        <div class="w-100 p-2"></div>
          <div class="col-sm-6">
            <label for="email">Email</label>
          </div>
          <div class="col-sm-3">
            <input type="email" id="email" name="email" rows="1" cols="30" value="${currentSettings["email"]}"/>
          </div>
          <div class="w-100 p-2"></div>
          <div class="col-sm-6">
            <label for="passw">Password</label>
          </div>
          <div class="col-sm-6">
            <input type="password" id="passw" name="passw" class="justify-content-end" value="${currentSettings["email"]}" />
          </div>
        </div>
        <div class="flex d-flex justify-content-between">
          <p class="text-danger" id="errormsg"></p>
          <button type="submit" data-toggle="button" class="btn btn-outline-primary" id="save">Salva</button>
        </div>
        <hr/>
        <div class="flex d-flex justify-content-between">
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
    console.log(username);
    if(response.data["success"]) {
      window.location.href = "../php/profile.php?username=" + username;
      console.log("funziona");
    } else {
      showErrorMsg(response.data["errormsg"]);
    }
  });
}

function logout() {
  fetch("login.php");
}

function updateButton(username) {
  document.querySelector("#save").addEventListener('click', function (event) {
    event.preventDefault();
    const bio = document.querySelector("#bio").value;
    const img = document.querySelector("#urlProfilePicture") != null ? document.querySelector("#urlProfilePicture").files[0] : null;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#passw").value;
    //console.log(bio + img + email + password);
    saveChanges(bio, email, password, img, username);
  });
}

/*function updateSelect(response_settings) {
  var formData = new FormData();
  select = document.querySelector("#uni");
  select.addEventListener('change', function abstractFunction() {
    formData.append("uni-selected", select.value);
    axios.post("api-selector-controller.php", formData).then(response_selector => {
      showPage(response_settings.data, response_selector.data);
      updateButton(response_settings.data["username"]);
      updateSelect(response_settings);
    });
  });
}*/

const main = document.getElementById("dinamic");
axios.get("api-get-current-settings.php").then(currentSettings => {
    if(currentSettings.data["logged"]) {
      console.log("logged");
      showPage(currentSettings.data);//, response_selector.data);
      updateButton(currentSettings.data["username"]);
      //updateSelect(currentSettings);*/
    } else {
      window.location.href = "../php/index.php";
    }
});