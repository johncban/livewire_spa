class Portfolio {
  constructor(psJSON) {
    this.stocks = [] 
    this.p_name = psJSON.portfolio_name
    this.id = psJSON.id
    this.renderNewStockP()
  }
  

  renderNewStockP() {
    this.psForm = document.getElementById('p-category')
    //window.localStorage.setItem('p_id', this.id)
    this.psForm.innerHTML += `
    <option value="" disabled selected></option>
    <option id="${this.id}" value="${this.id}">${this.p_name}</option>`
    
  }

  renderUpdateStockP() {
    this.psUpdate = document.getElementById('p-update-category')
    this.psUpdate.innerHTML = `test`
  }

  addStock(newStock) {
    this.stocks = this.stocks.concat(newStock)
    location.reload(true)
  }

  removeStock(sId) {
    this.stocks = this.stocks.filter(stock => stock.s_id !== sId)
  }


  render() {
    //window.localStorage.setItem('p_id', this.id)
    return `<li data-pid='${this.id}' data-props='${JSON.stringify(this)}' class='ps-element'>
      <button class='btn_m_edit' data-action='edit-p'>Edit</button>
      <button class='btn_m_del' data-action='delete-p'>Delete</button>
      <a class="show-lnk" href='#'>${this.p_name}</a>
    </li>`
  }
}
