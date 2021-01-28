class PortfolioForm {
    static container = document.querySelector("#portfolio-form")
    constructor() {
        this.renderForm()
        this.connectEventListener()
        this.api = new apiService()
        //this.u_id = JSON.parse(window.localStorage.getItem('id'))
        //this.user_id = user_id
    }

    connectEventListener() {
        this.cpForm.addEventListener("submit", this.handleOnSubmit)
    }

    handleOnSubmit = (e) => {
        //console.log(this.u_id)
        e.preventDefault()
        const {portfolio_name, user_id} = e.target
        const portfolioData = {
            portfolio_name: portfolio_name.value, 
            user_id: JSON.parse(window.localStorage.getItem('id'))
        }

        console.log(portfolioData)

        this.api.createPortfolio(portfolioData)
        e.target.reset()

        const portfolioForm = document.querySelector("#portfolio-form")
    }

    
    



    
    renderForm() {
        const cpForm = document.createElement("form")
        cpForm.setAttribute("id", "new-portfolio")
        cpForm.innerHTML = this.renderSignUpHTML() 
        this.cpForm = cpForm
        this.constructor.container.append(cpForm)
    }

    renderSignUpHTML = () => {
        return `
        <div class="row">
        <div class="input-field col s12">
          <input id="new-portfolio-name" name="portfolio_name" type="text" class="validate">
          <label for="portfolio_name">Portfolio Name</label>
        </div>
        </div>
        <div class="row">
            <button class="btn waves-effect waves-light col s6 offset-s3" type="submit" name="submit">
                Add Portfolio
            </button>
        </div>
        `
        /*
         <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s11">
              <input placeholder="Portfolio Name" name="portfolio_name" id="first_name" type="text" class="validate">
            </div>
            <div class="col s1">
              <a class="btn-floating btn-large waves-effect waves-light green tooltipped" data-position="left" data-tooltip="Add Portfolio" type="submit" name="submit"><i class="material-icons">add</i></a>
            </div>
          </div>
        </form>
      </div>
        */
    }

}