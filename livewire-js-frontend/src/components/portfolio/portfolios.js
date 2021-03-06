class Portfolios {
  static stock_container = document.querySelector("#stock-form")

  constructor() {
    this.portfolios = []
    this.stocks = []
    this.adapter = new PortfoliosAdapter()
    this.initPortfolioBindEvent()
    this.initStocksBindEvent()
    this.fetchPortfolios()
    this.fetchStocks()
  }

  initPortfolioBindEvent() {
    this.psForm = document.getElementById('new-portfolio-form')
    this.pInput = document.getElementById('new-p-item')
    this.pNode = document.getElementById('portfolio-container')
    this.pShowNode = document.getElementById('s-show')
    this.bd = document.querySelector('body')
    this.psForm.addEventListener('submit', this.createPortfolio.bind(this))
    this.pNode.addEventListener('click', this.handlePClick.bind(this))
    this.bd.addEventListener('blur', this.updatePortfolio.bind(this), true)
  }

  initStocksBindEvent() {
    this.sForm = document.getElementById('new-stock-form')
    this.sItemSymbol = document.getElementById('new-s-item')
    this.sqItem = document.getElementById('quantity-s-item')
    this.psForm = document.getElementById('p-category')
    this.stockShowNode = document.getElementById('s-show')

    //this.bds = document.querySelector('div')

    this.sForm.addEventListener('submit', this.createStock.bind(this))

    this.stockShowNode.addEventListener('click', this.handleSClick.bind(this))
    //this.bds.addEventListener('blur', this.updateStock.bind(this), true)
  }


  /** PORTFOLIOS SECTION */
  fetchPortfolios() {
    new PortfoliosAdapter()
      .fetchLoadPortfolios()
      .then(psJSON =>
        psJSON.forEach(psJSON => this.portfolios.push(new Portfolio(psJSON)))
      )
      .then(this.pRender.bind(this))
      .catch(error => console.log(error))
  }

  updatePortfolio() {
    if (event.target.className.includes('ps-element')) {
      const {
        target
      } = event
      target.contentEditable = false
      target.classList.remove('editable')
      const p_name = event.target.innerHTML
      const pId = target.dataset.pid
      console.log(pId)
      new PortfoliosAdapter().updatePortfolio(p_name, pId).then(updatedP => {
        this.portfolios = this.portfolios.map(
          p => (p.id === updatedP.id ? new Portfolio(updatedP) : p)
        )
        this.pRender()
      })
    }
  }

  createPortfolio() {
    const portfolio_name = this.pInput.value
    this.adapter
      .createPortfolio(portfolio_name)
      .then(psJSON => this.portfolios.push(new Portfolio(psJSON)))
      .then(this.pRender.bind(this))
      .then(() => (this.pInput.value = ''))
    location.reload(true)
  }

  toggleEditPortfolio() {
    const {
      parentElement: target
    } = event.target
    if (target.className == 'ps-element') {
      console.log(target.classList)
      target.classList.add('editable')
      const pId = target.dataset.pid
      //console.log(pId)

      //console.log(this.portfolios)

      const portfolio = this.portfolios.find(p => p.id == pId)

      //console.log(portfolio)

      //this.portfolios.find(p => console.log(p.id == pId))

      target.contentEditable = true

      //console.log(portfolio.p_name)

      target.innerHTML = portfolio.p_name
      target.focus()
    }
  }



  removePortfolio(delRes) {
    this.portfolios = this.portfolios.filter(p => p.id !== delRes.pId)
    location.reload(true)
    this.pRender()
  }

 




  /** STOCKS SECTION */
  fetchStocks() {
    new PortfoliosAdapter()
      .fetchLoadStocks()
      .then(sJSON =>
        sJSON.forEach(sJSON => this.stocks.push(new Stock(sJSON)))
      )
      .catch(error => console.log(error))
  }


  createStock() {
    event.preventDefault()
    //debugger
    //const pId = this.psForm.value
    const stock = this.sItemSymbol.value.toUpperCase()
    const quantity = this.sqItem.value
    const pcategory = this.psForm.value
    new PortfoliosAdapter().createStock(stock, quantity, pcategory)
      .then(stock => {
        portfolio.addStock(new Stock(stock, quantity, pcategory))
      })
      .then(sp => {
        console.log(sp)
      })
    location.reload(true)
  }

  



  handlePClick() {
    if (
      event.target.dataset.action === 'delete-p' &&
      event.target.parentElement.classList.contains('ps-element')
    ) {
      const pId = event.target.parentElement.dataset.pid
      new PortfoliosAdapter().deletePortfolio(pId).then(res => this.removePortfolio(res))
    } else if (event.target.dataset.action === 'edit-p') {
      this.toggleEditPortfolio()
    } else if (event.target.className === 'show-lnk') {
      const pId = event.target.parentElement.dataset.pid

      //const portfolio = this.stocks.find(st => st.p_id === +pId)
      const portfolio = this.stocks.filter(st => st.p_id === +pId).map(st => st.renderStockDetails()).join('')


      this.pShowNode.innerHTML = `<ul class="portfolio-container-style">${portfolio}</ul>`
    }
  }

  removeStock(delS) {
    this.stocks = this.stocks.filter(s => s.id !== delS.sId)
  }

  
  handleSClick() {
    //debugger
    console.log(event.target.dataset.action) //delete-stock
    
    if (event.target.dataset.action === 'delete-stock') {
      const { parentElement: target } = event.target

      //const info = document.querySelector('#stock-info')
      const pId = target.dataset.pid
      const sId = target.dataset.sid
      const portfolio = document.getElementById(pId)
      

      new PortfoliosAdapter().deleteStock(pId, sId).then(s => this.removeStock(s))
      location.reload(true)
    }
  }
  
  
  pHTML() {
    return this.portfolios.map(pr => pr.render()).join('')
  }

  pRender() {
    this.pNode.innerHTML = `<ul class="portfolio-container-style">${this.pHTML()}</ul>`
  }


}