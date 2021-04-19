class UserSignUpForm {
    static container = document.querySelector("#sign-up-form")
    constructor() {
        this.render()
        this.connectEventListener()
        
    }

    connectEventListener() {
        this.suForm.addEventListener("submit", this.handleOnSubmit)
    }

    handleOnSubmit = (e) => {
        e.preventDefault()
        const {username, email, password} = e.target
        const usersData = {
            username: username.value,
            email: email.value,
            password: password.value, 
        }

        new apiService().createUsers(usersData)
        e.target.reset()

        const signupUserContainer = document.querySelector("#sign-up-form")
    }

    
    render() {
        const suForm = document.createElement("form")
        suForm.setAttribute("id", "new-user-form")
        suForm.innerHTML = this.renderSignUpHTML() 
        this.suForm = suForm
        this.constructor.container.append(suForm)
    }

    renderSignUpHTML = () => {
        return `
        <div class="row">
        <div class="input-field col s12">
          <input id="new-user-name" name="username" type="text" class="validate">
          <label for="username">Name</label>
        </div>
        </div>
        <div class="row">
            <div class="input-field col s12">
            <input id="new-user-email" name="email" type="email" class="validate">
            <label for="email">Email</label>
            </div>
        </div>
        <div class="row">
        <div class="input-field col s12">
        <input id="new-user-password" name="password" type="password" class="validate">
        <label for="password">Password</label>
        </div>
        </div>
        <div class="row">
            <button class="btn waves-effect waves-light col s6 offset-s3" type="submit" name="submit">
                Sign Up
            </button>
        </div>
        `
    }

}