getParameter = (key) => {
    
    address = window.location.search
    
    parameterList = new URLSearchParams(address)
    
    return parameterList.get(key)
}

const followBtn = document.querySelector("button#followBtn");
const followerCount = document.querySelector("span#followerCount");
const username = getParameter("username");
const followClass = "btn-primary";
const unfollowClass = "btn-danger";
const formData = new FormData();
formData.append("check", "check");
formData.append("followed_user", username);
axios.post("api-follow.php", formData).then(response => {
    if(response.data["isFollowing"]) {
        followBtn.classList.replace(followClass, unfollowClass);
        followBtn.innerHTML= `
        <em class="bi bi-person-slash"> Non seguire</em>
        `;
    } else {
        followBtn.classList.replace(unfollowClass, followClass);
        followBtn.innerHTML= `
        <em class="bi bi-person-slash"> Segui</em>
        `;
        }
});

function enableFollow() {
    const followBtn = document.querySelector("button#followBtn");
    const followerCount = document.querySelector("span#followerCount");
    const username = getParameter("username");
    followBtn.addEventListener("click", function(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("followed_user", username);
        if (followBtn.classList.contains(followClass)) {
            formData.append("action", "follow");
            axios.post("api-follow.php", formData).then(response => {
                if (!response.data["success"]) {
                    showErrorMsg(response.data["errormsg"]);
                } else {
                    followBtn.classList.replace(followClass, unfollowClass);
                    followBtn.innerHTML= `
                        <em class="bi bi-person-slash"> Non seguire</em>
                    `;
                    followerCount.innerText = Number(followerCount.innerText) + 1;
                }
            });
        } else {
            formData.append("action", "unfollow");
            axios.post("api-follow.php", formData).then(response => {
                if (!response.data["success"]) {
                    showErrorMsg(response.data["errormsg"]);
                } else {
                    followBtn.classList.replace(unfollowClass, followClass);
                    followBtn.innerHTML = `
                        <em class="bi bi-person-plus"> Segui</em>
                    `;
                    followerCount.innerText = Number(followerCount.innerText) - 1;
                }
            });
        }
    });
}