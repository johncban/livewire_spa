class PortfolioContainer {
    constructor(pJSON) {
        this.p_id = pJSON.id
        this.p_name = pJSON.portfolio_name
        this.u_id = pJSON.user_id
        PortfolioContainer.all.push(this)
        this.renderPortfolio()
        console.log(this.u_id)
    }

    static  portfolioStocks = document.getElementById("portfolio")

    static all = [] 

    


    renderPortfolio() {
        let eachPortfolioDiv = document.createElement('div')
        this.eachPortfolioDiv = eachPortfolioDiv
        eachPortfolioDiv.classList.add('each-portfolio')

        let portfolioName = document.createElement("h4");
        portfolioName.innerHTML = this.p_name

        eachPortfolioDiv.appendChild(portfolioName)
        PortfolioContainer.portfolioStocks.appendChild(eachPortfolioDiv)
    }


}