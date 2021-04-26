class Stock {
    constructor(sJSON) {
        this.s_name = sJSON.stock_name
        this.s_quantity = sJSON.quantity
        this.s_id = sJSON.id
        this.p_id = sJSON.portfolio_id
        this.getStockData()
        this.getNews()
    }




    getStockData = async => {
        
        let symbol = this.s_name
        let ep = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=Tpk_205eb019e75d4ee887c5fc488056d222`

        fetch(ep)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(resJSON => {
                this.companyName = resJSON.companyName
                this.latestPrice = resJSON.latestPrice
                if (resJSON.volume == null) {
                    this.stockVolume = "Volume Not Available"
                } else {
                    this.stockVolume = "Stock Volume | " + resJSON.volume
                }

            })
            .catch(error => {
                console.log(error)
            })
    }


 









    getNews = async => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        const c_date = yyyy + '-' + mm + '-' + dd

        let news_g = `https://finnhub.io/api/v1/company-news?symbol=${this.s_name}&from=2021-03-20&to=${c_date}&token=sandbox_c2331daad3idsrtik89g`

        fetch(news_g)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
            .then(resJSON => {
                this.test = resJSON.map(res => {
                    const unixTime = res.datetime;
                    const date = new Date(unixTime * 1000);

                    return `<li class="collection-item">
                    <a class="news-anchor-title" href='${res.url}'>${res.headline}</a><br>
                    <sub>${date.toLocaleDateString("en-US")}</sub>
                    <hr>
                    ${res.summary}
                    </li>`
                }).join("")

            })
            .catch(error => {
                console.log(error)
            })
    }





    renderStockDetails() {
        let total = this.s_quantity * this.latestPrice
        window.localStorage.setItem('p_id', this.p_id)
        return `<li class='ps-element'>
        <div class="card large">
    
          <div class="card-content" data-pid='${this.p_id}' data-sid='${this.s_id}'>
              <span id="company-name" class="card-title activator grey-text text-darken-4">
                <h3>${this.companyName}</h3>
                <i class="material-icons right">more_vert</i>
              </span>
              <hr>
              
              <div id="stock-info" class="stock-content">
                  <!-- <button class='btn_m_edit' data-action='edit-stock'>Edit</button> -->
                  <h3 id="symbol-s" class="blue-text text-darken-2">${this.s_name}</h3>
                  <h4 id="symbol-q">Unit Owned ${this.s_quantity}</h4>
              </div>
    
              <h4 id="price">Latest Price | $${this.latestPrice}</h4>
              <h4 id="total">Total Price | $${Math.round(total)}</h4>
              <h4>${this.stockVolume}</h4>
              <hr>
              <button class='btn_m_del' data-action='delete-stock'>Delete</button>
          </div>
    
          <div class="card-reveal">
              <span class="card-title grey-text text-darken-4">
              <h4>${this.companyName} Stock News</h4>
              <i class="material-icons right">close</i></span>
              <p>
              <ul class="collection">${this.test}</ul>
              </p>
          </div>
    
        </div>
    </li>`
    }



}