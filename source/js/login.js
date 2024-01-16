function generateForm(loginerror = null) {
    let form = `
    <section>
      <div class="d-flex justify-content-center align-middle margin m-2 py-3 align-items-center">
        <div class="flex-column border border-3 p-5">
          <div class="pb-2 pt-0 text-center">
              <img src="../img/drawhub.png" alt="" width="300" height="75">
          </div>
          <div class="p-1">
            <div class="pb-2 my-2 text-center">
              <button type="button" class="btn btn-primary mx-2" data-toggle="button" aria-pressed="true" disabled>Log in</button><a class="btn btn-primary mx-2" data-toggle="button" aria-pressed="false" href='../php/index.php'>Sign in</a>
            </div>
            <form action="../php/Login.php" method="POST">
            <ul class="list-group-flush">
              <li class="list-group-item m-1 p-0"><label for="email" class="fw-semibold fst-italic">E-mail</label><input type="email" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="email" name="email"/></li>
              <li class="list-group-item m-1 p-0"><label for="password" class="fw-semibold fst-italic">Password</label><input type="password" class="d-flex justify-content-end rounded bg-secondary bg-opacity-10" id="password" name="password"/></li>
            </ul>
            <hr/>
            <div class="d-flex justify-content-end">
              <button type="submit" data-toggle="button" class="btn btn-outline-primary">Accedi</button>
            </div>
            <p class="text-danger m-0" id="error-text"></p>
            </form>
         </div> 
        </div>
      </div>
    </section>
    `;
    return form;
  }
  
  const main = document.querySelector("main");
  axios.get('api-login.php').then(response => {
      if (!response.data["login-result"]) {
        VisualizeLoginForm();          
      }
  });
  
  
  function VisualizeLoginForm() {
    // Utente NON loggato
    let form = generateForm();
    main.innerHTML = form;
    // Gestisco tentativo di login
    document.querySelector("main form").addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        login(email, password);
    });
  }
  
  function login(email, password) {
    const formData = new FormData();
  
    formData.append('email', email);
    formData.append('password', password);
  
    axios.post('api-login.php', formData).then(response => {
        if (response.data["login-result"]) {
          window.location.href = "../php/showhomepage.php";
        } else {
          console.log(response.data);
          document.getElementById("error-text").innerText = response.data["login-error"];
        }
    });
  }
  