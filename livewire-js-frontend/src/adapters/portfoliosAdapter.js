class PortfoliosAdapter {
  static portfolio_id = []

  constructor() {
    this.u_id = JSON.parse(window.localStorage.getItem('id'))
    this.p_id = window.localStorage.getItem('p_id')
    this.s_id = window.localStorage.getItem('s_id')
    //console.log(this.p_id)
    this.portfolioURL = `http://127.0.0.1:3000/api/v1/users/${parseInt(this.u_id)}`
    this.stockURL = `${this.portfolioURL}/portfolios/${this.p_id}/stocks`
    //this.fetchLoc()
  }


  createPortfolio(portfolio_name) {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        portfolio_name,
        user_id: `${parseInt(this.u_id)}`
      }),

    }
    return fetch(`http://127.0.0.1:3000/api/v1/users/${parseInt(this.u_id)}/portfolios`, config).then(res =>
      res.json()
        .then(cp => {
          console.log(cp)
        }),
      console.log(this.portfolioURL)
    )
  }



  fetchLoadPortfolios() {
    this.fetchLocalPortfolios()
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
    }

    return fetch(`${this.portfolioURL}/portfolios`, config)
      .then(res => res.json())
  }


  fetchLocalPortfolios() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
    }
    fetch(`${this.portfolioURL}/portfolios`, config)
      .then((res) => res.json())
      .then(p => {
        Object.keys(p).forEach(function (key) {
          var pid = p[key].id
          PortfoliosAdapter.portfolio_id.push({
            id: pid
          })
          //console.log(PortfoliosAdapter.portfolio_id)
          window.localStorage.setItem('pid', JSON.stringify(PortfoliosAdapter.portfolio_id))
        })

      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }


  updatePortfolio(portfolio_name, id) {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        portfolio_name
      })
    }

    return fetch(`${this.portfolioURL}/portfolios/${id}`, config).then(res =>
      res.json()
    )
  }


  deletePortfolio(pId) {
    const config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
    }
    return fetch(`${this.portfolioURL}/portfolios/${pId}`, config).then(res =>
      res.json()
    )
  }



  fetchLoadStocks() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    }

    return fetch(`${this.stockURL}`, config)
      .then(res => res.json())
  }


  createStock(stock_name, quantity, portfolio_id) {
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        stock_name,
        quantity,
        portfolio_id,
        user_id: `${parseInt(this.u_id)}`
      })
    }
    return fetch(`${this.portfolioURL}/portfolios/${portfolio_id}/stocks`, config)
      .then(res => res.json()
        .then(cs => {
          console.log(cs)
        }),
      )
  }


  updateStock(pId, sId, stock_name, quantity) {
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        stock_name,
        quantity
      })
    }
    console.log(`http://127.0.0.1:3000/api/v1/users/${pId}/portfolios/${pId}/stocks/${sId}`)
    return fetch(`http://127.0.0.1:3000/api/v1/users/${pId}/portfolios/${this.p_id}/stocks/${sId}`, config).then(res =>
      res.json()
    )
  }



  deleteStock(pId, sId) {
    const config = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
      }
    }
    return fetch(`http://127.0.0.1:3000/api/v1/users/${parseInt(this.u_id)}/portfolios/${pId}/stocks/${sId}`, config).then(res =>
      res.json()
    )
  }



  /*
  fetchLoc() {
    fetch('https://ipapi.co/json/')
      .then(function (res) {
          res.json().then(jsonData => { console.log(jsonData) })
        })
        .catch(function (error) { console.log(error) })
  }

  fetchWeather() {
    var openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(function(position) {
           fetch(openWeatherMap)
            .then(function(res) { return res.json() })
            .then(function(data) {
              console.log(data)
            })
        })
    }
  }
  */






  


}