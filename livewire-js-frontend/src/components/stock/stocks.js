class Stocks {
    static stock_container = document.querySelector("#stock-form")
    constructor() {
        this.stocks = []
        this.adapter = new PortfoliosAdapter()
        this.initBindAndEvent()
        this.initBindEvent()
    }

    initBindAndEvent() {

    }

    initBindEvent() {
        var fr = this.sForm
        fr.addEventListener('focusout', function (event) {
            if (fr.contains(event.relatedTarget)) return
            console.log(fr)
        })
    }


   


   


    
    


}