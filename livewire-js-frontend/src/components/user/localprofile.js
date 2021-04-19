class LocalProfile {
    localStore() {
        const username = JSON.parse(localStorage.getItem('username'))

        //if (username != null) {
        if (username != null) {

            document.getElementById("current_user").innerHTML = `Welcome ${username}`
        } else {
            document.getElementById("current_user").innerHTML = `Please Sign Up or Log In`
            console.log("User Profile Local Storage is Null")
        }
    }

}