class UserSignInForm {
    static container = document.querySelector("#sign-in-form")
    constructor() {
        this.render()
        this.connectEventListener()
        this.api = new apiService()
    }

    connectEventListener() {
        this.siForm.addEventListener("submit", this.handleOnSubmit)
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const {email, password} = e.target
        const loginData = {
            email: email.value,
            password: password.value, 
        }

        this.api.loginUsers(loginData)
        e.target.reset() 
        window.onload = function() {
            if(!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }
        const signinUserContainer = document.querySelector("#sign-in-form")
    }

    
    render() {
        const siForm = document.createElement("form")
        siForm.setAttribute("name", "loginform")
        siForm.setAttribute("id", "user-login-form")
        siForm.innerHTML = this.renderSignUpHTML() 
        this.siForm = siForm
        this.constructor.container.append(siForm)
    }

    renderSignUpHTML = () => {
        return `
        <div class="row">
        <div class="input-field col s12">
          <input id="login-email" name="email" type="email" class="validate">
          <label for="email">Email</label>
        </div>
        </div>
        <div class="row">
        <div class="input-field col s12">
        <input id="login-password" name="password" type="password" class="validate">
        <label for="password">Password</label>
        </div>
        </div>
        <div class="row">
            <button class="btn waves-effect waves-light col s6 offset-s3" type="submit" name="action">
                Login
            </button>
        </div>
        `
    }


    


}