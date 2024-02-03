const loader = document.getElementById('Loader');
const portfolio = document.getElementById('Portfolio');
const lifter = document.querySelector('.lifter');

// script for loading content 
window.addEventListener('load', ()=>{
  loader.style.display = "none";

portfolio.classList.remove('visually-hidden');

window.addEventListener('scroll', ()=>{
  if(window.scrollY > 200){
    lifter.style.opacity = "1";
    lifter.style.visibility = "visible";
    lifter.style.bottom = "2rem";
  }else{
    lifter.style.opacity = "0";
    lifter.style.visibility = "hidden";
    lifter.style.bottom = "1rem";
  }
})

});



