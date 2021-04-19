class App {
  constructor() {
    this.usersignup = new UserSignUpForm()
    this.usersignin = new UserSignInForm()
    this.portfolios = new Portfolios()
    //this.stocks = new Stocks()
  }
}

function logOutClear() {
  window.localStorage.clear()
  window.location.reload()
  sessionStorage.removeItem('jwt')
}

function refreshPage() {
  location.reload()
}


// Materialize JS -- Begin
document.addEventListener("DOMContentLoaded", () => {
  var elems_col = document.querySelectorAll('.collapsible');
  var instances = M.Collapsible.init(elems_col);

  var elems_modal = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems_modal);

  //var elems = document.querySelectorAll('select');
  //var instances = M.FormSelect.init(elems);

  var elems_sel = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems_sel);

  var elems_float = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems_float);

})
// Materialize JS -- End