const live = new Live()


function logOutClear() {
    window.localStorage.clear()
    window.location.reload()
}



// Materialize JS -- Begin
document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems);
    
})
// Materialize JS -- End



