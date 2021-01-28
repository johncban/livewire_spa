class apiService {
    constructor() {
        this.baseURL = "http://localhost:3000"
        console.log(this.baseURL)
        this.u_id
    }

    

    //USERS -- createUsers
    createUsers = (usersData) => {
        const config =  {
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
        console.log({auth: loginData})
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({auth: loginData}),
        };

        return fetch(`${this.baseURL}/auth/signin`, config)
        .then((res) => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json()
                    .then(json => {
                        localStorage.setItem('jwt', json.jwt)
                        console.log('Token:', localStorage.getItem('jwt'))
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
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        };

        fetch(`${this.baseURL}/api/v1/users/`, config)
            .then((res) => res.json())
            .then(currentuser => {
                window.localStorage.setItem('id', JSON.stringify(currentuser.id))
                let cug_id = JSON.parse(window.localStorage.getItem('id'))
                this.u_id = cug_id

                alert(`Welcome back ${JSON.stringify(currentuser.name)}`)
                console.log(currentuser)
                document.getElementById("current_user").innerHTML = `Welcome ${currentuser.name}`

                this.fetchPortfolio()

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    createPortfolio = (portfolioData) => {
        
        const config =  {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(portfolioData),
        };

        return fetch(`${this.baseURL}/api/v1/users/2/portfolios`, config)
            .then((res) => res.json())
            .then(cp => {console.log(cp)} )
    }
    

   
   fetchPortfolio() {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
    }

    console.log(`test ${this.u_id}`)
 
    console.log(`${this.baseURL}/api/v1/users/${this.u_id}/portfolios`)

    return fetch(`${this.baseURL}/api/v1/users/${parseInt(this.u_id)}/portfolios`, config)
        .then(res => res.json())
        .then(pJSON => 
            pJSON.map(portfolio => new PortfolioContainer(portfolio))
            //pJSON.map(portfolio => new Portfolio(portfolio))
        )
        //.then(this.render.bind(this))
        .catch(error => console.log(error))
   }
   






    fetchCategories = () => fetch(`${this.baseURL}/categories`).then(res => res.json());

    //CREATE

    createBook = (data) => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        };
        return fetch(`${this.baseURL}/books`, config).then((res) => res.json());
    };

    //DELETE

    deleteBook = (id) => {
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        fetch(`${this.baseURL}/books/${id}`, config)
            .then((res) => res.json())
    }

   

}