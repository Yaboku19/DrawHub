function updateNotificationNumber() {
    /*$.ajax({
        url:"api-getnotification.php",
        dataType: 'json', 
        method: 'GET',
        success: function(dati) {
            let offCanvasSpan = document.getElementById("offCanvasNotificationSpan");
            let span = document.getElementById("baseNotificationSpan");
            let array = dati.followers.concat(dati.comments, dati.reactions);
            console.log(array.length);
            if (array.length > 0) {
                offCanvasSpan.innerHTML = array.length;
                span.innerHTML = array.length;    
            } else {
                offCanvasSpan.innerHTML = "";
                span.innerHTML = "";
            }
        }
    })*/
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
//setInterval(updateNotificationNumber, 10000);


