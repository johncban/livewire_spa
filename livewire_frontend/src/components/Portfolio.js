class Portfolio {
    static container = document.querySelector("#portfolio-form")
    static  portfolioStocks = document.getElementById("portfolio")
    static all = []

    constructor(pJSON) {
        this.p_id = pJSON.id
        this.p_name = pJSON.portfolio_name
        this.u_id = pJSON.user_id
        Portfolio.all.push(this)
        this.renderPortfolio()
        
        this.renderPForm()
        this.connectEventListener()
        this.api = new apiService()
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

        //const portfolioForm = document.querySelector("#portfolio-form")
    }





    renderPForm() {
        const cpForm = document.createElement("form")
        cpForm.setAttribute("id", "new-portfolio")
        cpForm.innerHTML = this.renderPortfolioForm() 
        this.cpForm = cpForm
        this.constructor.container.append(cpForm)
    }

    renderPortfolio() {
       let eachPortfolioDiv = document.createElement('div')
       this.eachPortfolioDiv = eachPortfolioDiv
       eachPortfolioDiv.classList.add('each-portfolio')

       let portfolioName = document.createElement("h4");
       portfolioName.innerHTML = this.p_name

       eachPortfolioDiv.appendChild(portfolioName)
       Portfolio.portfolioStocks.appendChild(eachPortfolioDiv)
    }



    renderPortfolioForm = () => {
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
    }


}