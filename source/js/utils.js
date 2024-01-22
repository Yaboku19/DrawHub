/**
 * Shows a list of users in the main section of html
 * @param {*} users The list of users to show
 */
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
        <div class="container mt-4 mb-5 bg-white rounded-3 p-3">
            <div class="row">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                    <img src="${uploadDir}${element["urlProfilePicture"]}" class="rounded-circle" style="width: 50px; height: 50px; object-fit: cover;" alt="">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <a href="profile.php?username=${element["username"]}">${element["name"]} ${element["surname"]} @${element["username"]}</a> 
                    </div>
                </div>
            </div>
        </div>`;
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
    main.appendChild(errorNode);
}

function deactivateAll(listElements) {
    listElements.forEach(x => {
        x.parentElement.classList.replace("bg-primary", "bg-light");
        x.classList.replace("link-light", "link-primary");
        x.classList.remove("disabled");
        x.nextElementSibling.querySelector('span').classList.replace("bg-light", "bg-primary");
        x.nextElementSibling.querySelector('span').classList.replace("text-primary", "text-light");
    });
}

function activateElement(toActivate) {
    toActivate.parentElement.classList.remove("bg-light");
    toActivate.parentElement.classList.add("bg-primary");
    toActivate.classList.replace("link-primary", "link-light");
    toActivate.classList.add("disabled");
    toActivate.nextElementSibling.querySelector('span').classList.replace("bg-primary", "bg-light");
    toActivate.nextElementSibling.querySelector('span').classList.replace("text-light", "text-primary");
    //toActivate.nextElementSibling.nextElementSibling.classList.replace("bg-primary", "bg-light");
    //toActivate.nextElementSibling.nextElementSibling.classList.replace("text-light", "text-primary");
}

function updateLinks(listElements, currentLink) {
    deactivateAll(listElements);
    activateElement(currentLink);
}