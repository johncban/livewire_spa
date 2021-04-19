class usersAdapter {
    constructor() {
        //this.baseUrl = 'http://localhost:3000/api/v1/notes'
        this.baseURL = "http://127.0.0.1:3000"
        this.u_id
        new LocalProfile().localStore()
    }

    //USERS -- createUsers
    createUsers = (usersData) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(usersData),
        };
        console.log(this.baseURL + "/auth/signup")
        return fetch(`${this.baseURL}/auth/signup`, config)
            //.then((res) => res.json());
            .then((res) => {
                if (res.status >= 200 && res.status <= 299) {
                    //return response.json();
                    return res.json()
                } else {
                    console.log(res.status, res.statusText);
                    alert(`All Fields Should Not Be Empty -- ${res.statusText}`)
                }
            })
    }

    //USERS -- loginUsers
    loginUsers = (loginData) => {
        console.log({
            auth: loginData
        })
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                auth: loginData
            }),
        };

        return fetch(`${this.baseURL}/auth/signin`, config)
            .then((res) => {
                if (res.status >= 200 && res.status <= 299) {
                    return res.json()
                        .then(json => {
                            sessionStorage.setItem('jwt', json.jwt)
                            console.log('Token:', sessionStorage.getItem('jwt'))
                            this.renderUserProfile()
                            console.log(json)
                        })
                } else {
                    console.log(res.status, res.statusText);
                    alert(`User -- ${res.statusText}`)
                }
            })
    }

    renderUserProfile() {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
            },
        };

        fetch(`${this.baseURL}/api/v1/users/`, config)
            .then((res) => res.json())
            .then(currentuser => {
                window.localStorage.setItem('id', JSON.stringify(currentuser.id))
                window.localStorage.setItem('username', JSON.stringify(currentuser.name))

                this.u_id = JSON.parse(window.localStorage.getItem('id'))

                alert(`Welcome back ${JSON.stringify(currentuser.name)}`)
                console.log(currentuser)
                document.getElementById("current_user").innerHTML = `Welcome ${currentuser.name}`


                new Portfolios().fetchPortfolios()

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

 
}