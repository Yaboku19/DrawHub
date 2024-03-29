function showResults(userList) {
    document.querySelectorAll("div.searchResult")?.forEach(element => element.remove());
    if (userList.length <= 0) {
        const container = document.createElement("div");
        container.classList = "container searchResult p-3";
        container.innerHTML = `
            <div class="row">
                <div class="d-flex align-items-center">
                    <p>La tua ricerca non ha prodotto alcun risultato.</p>
                </div>
            </div>
        `;
        modalBody.appendChild(container);
    } else {
        userList.forEach(user => {
            const container = document.createElement("div");
            container.classList = "container searchResult p-3";
            container.innerHTML = `
                <div class="row">
                    <div class="d-flex align-items-center">
                        <div class="flex-shrink-0">
                            <img src="../img/${user["urlProfilePicture"]}" class="rounded-circle py-0 mb-1 image-cover" alt="foto profilo" width="40px" height="40px"/>
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <a href="profile.php?username=${user["username"]}">${user["name"]} ${user["surname"]} </a> 
                        </div>
                    </div>
                </div>
            `;
            modalBody.appendChild(container);
        });
    }
}

/**
 * Returns the results for the given search term
 * @param {string} searchTerm The search term typed by the user in the search bar
 */
function getSearchResults(searchTerm) {
    const formData = new FormData();
    formData.append("searchTerm", searchTerm);
    axios.post("api-search.php", formData).then(response => {
        showResults(response.data["users"]);
    });
}

const searchInput = document.getElementById("searchInput");
const modalBody = document.querySelector("div.modal-body");

searchInput.addEventListener("keyup", function(event) {
    event.preventDefault();
    const searchString = event.target.value;
    getSearchResults(searchString);
});