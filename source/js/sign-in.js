function generateForm(cities) {
    let form = `
    
    <section>
      <div class="d-flex justify-content-center align-middle margin m-3 ">
        <div class="flex-column border border-3 p-5">
            <div class="pb-2 text-center">
              <img src="../img/drawhub.png" alt="" width="300" height="75">
            </div>
            <div class="mt-1">
                <form action="../php/Sign-in.php" method="POST" >
                <ul class="list-group list-group-flush">
                <li class="list-group-item"><label for="nome" class="fw-semibold fst-italic">Nome</label><input type="text" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="nome" name="nome"/></li>
                <li class="list-group-item"><label for="cognome" class="fw-semibold fst-italic">Cognome</label><input type="text" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id ="cognome" name="cognome"/></li>
                <li class="list-group-item"><label for="date">Data di nascita</label><input type="date" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="date" name="date" required/></li>
                <li class="list-group-item"><label for="email" class="fw-semibold fst-italic">E-mail</label><input type="email" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="email" name="email"/></li>
                <li class="list-group-item"><label for="username" class="fw-semibold fst-italic">Username</label><input type="text" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="username" name="username"/></li>
                <li class="list-group-item"><label for="password" class="fw-semibold fst-italic">Password</label><input type="password" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="password" name="password"/></li>
                </ul>
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" data-toggle="button" class="btn btn-outline-primary">Registrati</button>
            </div>
            <p class="text-danger"></p>
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
  
  const main = document.querySelector("main");
  axios.get('Sign-in.php').then(response => {
      if (response.data["sign-in-result"]) {
          // User Sign-in succesfully
          visualizeSuccess();
      } else {
          // Utente NON loggato
          VisualizeSigninForm(response.data["cities"]);  
      }
  });
  
  
  function VisualizeSigninForm(cities) {
    // Utente NON loggato
    let form = generateForm(cities);
    main.innerHTML = form;
    // Gestisco tentativo di login
    document.querySelector("main form").addEventListener("submit", function (event) {
        event.preventDefault();
        const nickname = document.querySelector("#nickname").value;
        const email = document.querySelector("#email").value;
        const name = document.querySelector("#name").value;
        const surname = document.querySelector("#surname").value;
        const password = document.querySelector("#password").value;
        const date = document.querySelector("#date").value;
        const residence = document.querySelector("#residence").value;
        const birthplace = document.querySelector("#birthplace").value;
        signin(nickname, email, name, surname, password, date, residence, birthplace);
    });
  }
  
  function signin(nickname, email, name, surname, password, date, residence, birthplace) {
    const formData = new FormData();
  
    formData.append('nickname', nickname);
    formData.append('email', email);
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('date', date);
    formData.append('password', password);
    formData.append('residence', residence);
    formData.append('birthplace', birthplace);
  
    axios.post('Sign-in.php', formData).then(response => {
        if (response.data["sign-in-result"]) {
          visualizeSuccess();
        } else {
          document.querySelector("form > p").innerText = response.data["text-error"];
        }
    });
  }
  