class Stock {
    constructor(sJSON) {
        this.s_name = sJSON.stock_name
        this.s_quantity = sJSON.quantity
        this.s_id = sJSON.id
        this.p_id = sJSON.portfolio_id
    }

    apiTokens() {
        this.tok = `Tpk_205eb019e75d4ee887c5fc488056d222`
        this.g_key = `721162f6cc3d2e2eae1e43c3fec442ef`

        this.a_tok = `L8XE3SKXW8738RV0`
    }




    getStockData = async => {
        
        let symbol = this.s_name
        let ep = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${this.tok}`

        fetch(ep)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(resJSON => {
                //console.log(resJSON)
                this.companyName = resJSON.companyName
                this.latestPrice = resJSON.latestPrice
            })
            .catch(error => {
                console.log(error)
            })
    }

    getTEST() {
        //console.log(this.pCategory)

        let symbol = this.s_name
        let t_ep =`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${this.a_tok}`

        jQuery.ajax({
            url: t_ep,
            dataType: 'json',
            contentType: "application/json",
            success: function(data){
              console.log(data.Name);
            }
        });
    }


    getNews = async => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        var c_date = yyyy + '-' + mm + '-' + dd

        
        let news_g = `https://finnhub.io/api/v1/company-news?symbol=${this.s_name}&from=2021-03-20&to=${c_date}&token=sandbox_c1crk2v48v6vagf182og`

        fetch(news_g)
            .then(res => {
                if(res.ok) {
                    return res.json()
                }
            })
            .then(resJSON => {
                this.test = resJSON.map(res => {
                    return `<li><a href='${res.url}'>${res.headline}</a></li>`
                }).join("")

                
            })
            .catch(error => {
                console.log(error)
            })
    }


   
    

    renderStockDetails() {
        let total = this.s_quantity * this.latestPrice
        window.localStorage.setItem('p_id', this.p_id)
        return `<li data-sid='${this.s_id}' data-props='${JSON.stringify(this)} class='ps-element'>
                    <div class="card large">
                
                    <div class="card-content">
                        <span id="company-name" class="card-title activator grey-text text-darken-4">${this.companyName}<i
                            class="material-icons right">more_vert</i></span>
                        <hr>
                        
                        <div id="stock-info" class="stock-content" data-pid='${this.p_id}' data-sid='${this.s_id}'>
                            <button class='btn_m_edit' data-action='edit-stock'>Edit</button>

                            <button class='btn_m_del' data-action='delete-stock'>Delete</button>
                    
                            <h3 id="symbol-s">${this.s_name}</h3>
                            
                            <h5 id="symbol-q">${this.s_quantity}</h5>
                            
                        </div>

                        <h4 id="price">${this.latestPrice}</h4>
                        <h5 id="total">$${total}</h5>
                    </div>
                
                    <div class="card-reveal">
                        <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
                        <p>
                        <ul>${this.test}</ul>
                        </p>
                    </div>
                
                    </div>
                </li>`
    }



}