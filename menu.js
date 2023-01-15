let hamburger = document.getElementById('hamburger');
let navbar = document.getElementById('navbar');
hamburger.addEventListener("click", (e) => {
    e.preventDefault();
    if(navbar.style.display == 'none') {
        if (hamburger.style.display == 'none'){
            navbar.style.display = 'flex';
        }else{
        navbar.style.display = 'grid';}
    }else {
        navbar.style.display = 'none';
    }
})
