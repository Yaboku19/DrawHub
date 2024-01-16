function generateForm() {
    let form = `

    <section>
      <div class="d-flex justify-content-center align-middle margin m-2 ">
        <div class="flex-column border border-3 p-5 bg-secondary bg-opacity-10">
            <div class="pb-2 pt-0 text-center">
              <img src="../img/drawhub.png" alt="" width="300" height="75">
            </div>
            <div class="p-1 my-1 text-center">
            <a class="btn mx-2 btn-primary" data-toggle="button" aria-pressed="false" href='../php/login.php'>Log in</a><button type="button" class="btn btn-primary mx-2" data-toggle="button" aria-pressed="true" disabled>Sign in</button>
            </div>
            <div class="m-1">
                <form action="../php/sign-in.php" method="POST" id="signInForm">
                <ul class="list-group-flush">
                  <li class="list-group-item m-1 p-0"><label for="nome" class="fw-semibold fst-italic">Nome</label><input type="text" class="d-flex justify-content-end rounded bg-light" id="nome" name="nome"/></li>
                  <li class="list-group-item m-1 p-0"><label for="cognome" class="fw-semibold fst-italic">Cognome</label><input type="text" class="d-flex justify-content-end rounded bg-light" id ="cognome" name="cognome"/></li>
                  <li class="list-group-item m-1 p-0"><label for="date" class="fw-semibold fst-italic">Data di nascita</label><input type="date" class="d-flex justify-content-end rounded bg-light" id="date" name="date" required/></li>
                  <li class="list-group-item m-1 p-0"><label for="email" class="fw-semibold fst-italic">E-mail</label><input type="email" class="d-flex justify-content-end rounded bg-light" id="email" name="email"/></li>
                  <li class="list-group-item m-1 p-0"><label for="username" class="fw-semibold fst-italic">Username</label><input type="text" class="d-flex justify-content-end rounded bg-light" id="username" name="username"/></li>
                  <li class="list-group-item m-1 p-0"><label for="password" class="fw-semibold fst-italic">Password</label><input type="password" class="d-flex justify-content-end rounded bg-light" id="password" name="password"/></li>
                </ul>
                <hr>
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" id="submitBtn" data-toggle="button" class="btn btn-outline-primary">Registrati</button>
            </div>
            <p class="text-danger m-0" id="error-text"></p>
            </form>
        </div>
      </div>
    </section>
    `;
    return form;
  }
  
  function generateSuccesfullSignin(loginerror = null) {
    let form = `
    <section>
    <div class="container text-center p-5">
      <h1 class="text-primary">Registrazione completata!</h1>
    </div>
    <div class="d-flex justify-content-center align-middle">
      <button type="button" class="btn btn-outline-primary" onclick="location.href='../php/Login.php';">Accedi</button>
    </div>
    </section>`;
    return form;
  }
  
  function visualizeSuccess() {
    section = generateSuccesfullSignin();
    main.innerHTML = section;
  }
  
  /**
   *  Parte eseguita 
   */
  const main = document.querySelector("main");
  VisualizeSigninForm();  
  /*axios.post('sign-in.php').then(response => {
      if (response.data["sign-in-result"]) {
          // User Sign-in succesfully
          visualizeSuccess();
      } else {
          // Utente NON loggato
          console.log(response.data);
          VisualizeSigninForm();  
      }
  });*/
  
  
  function VisualizeSigninForm() {
    // Utente NON loggato
    let form = generateForm();
    main.innerHTML = form;
    // login quando preme sul bottone registrati
    document.getElementById("submitBtn").addEventListener("click", function (event) {
      event.preventDefault();
      const username = document.querySelector("#username").value;
      const email = document.querySelector("#email").value;
      const name = document.querySelector("#nome").value;
      const surname = document.querySelector("#cognome").value;
      const password = document.querySelector("#password").value;
      const date = document.querySelector("#date").value;
      signin(username, email, name, surname, password, date);
    });
  }
  
  function signin(username, email, name, surname, password, birthDate) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('date', birthDate);
    formData.append('password', password);
    
    axios.post('sign-in.php', formData).then(response => {
        if (response.data["sign-in-result"]) {
          visualizeSuccess();
        } else {
          console.log(response.data);
          document.getElementById("error-text").innerText = response.data["text-error"];
        }
    }).catch(err => {
      console.error(err);
  });
  }
  