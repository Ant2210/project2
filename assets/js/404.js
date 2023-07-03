/* Function that automatically returns the user to the homepage in 10 seconds
when they land on the 404 error page */
(function(){
    let timeLeft = 10;
    setInterval(() => {
        timeLeft--;
        document.getElementById("countdown-timer").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            return window.location.assign("index.html");
        }
    }, 1000);
})();