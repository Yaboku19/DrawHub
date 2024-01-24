function updateNotificationNumber() {
    let offCanvasSpan = document.getElementById("offCanvasNotificationSpan");
    let span = document.getElementById("baseNotificationSpan");
    axios.get("api-getnotification.php").then(response => {
        if (response.data["success"]) {
            let array = response.data["followers"].concat(response.data["comments"], response.data["reactions"]);
            if (array) {
                if (array.length > 0) {
                    if (array.length != span.innerText) {
                        offCanvasSpan.innerHTML = array.length;
                        span.innerHTML = array.length;        
                    }
                } else {
                    offCanvasSpan.innerHTML = "";
                    span.innerHTML = "";
                } 
            }
        }
    });
}
updateNotificationNumber();


