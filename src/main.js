import 'regenerator-runtime/runtime'
import './library/materialize.min.css';
import './library/materialize.min.js';
import './styles.scss';
import $ from './settings/selector.js';
import Navigation from './components/Navigation/Navigation.component.js';
import Teams from './pages/Teams/Teams.page.js';
import { getTeams } from './pages/Teams/Teams.api.js';
import Competitions from './pages/Competitions/Competitions.page.js';
import { getCompetitions } from './pages/Competitions/Competitions.api.js';

// Create SPA
const app = {
  init: function(){
    $('.nav-link').forEach((link)=>{
        link.addEventListener('click', app.nav);
    })
    // Default page
    $('.fcontent').innerHTML = Competitions();
    getCompetitions($('.cards-competitions'))
    history.replaceState({}, 'competitions', '#competitions');
    window.addEventListener('popstate', app.poppin);
  },
  nav: function(ev){
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    app.route(currentPage)
  },
  poppin: function(){
    let currentPage = location.hash.replace('#' ,'');
    app.route(currentPage)
  },
  route: function(currentPage){
    if(currentPage === "competitions"){
      history.pushState({}, currentPage, `#${currentPage}`);
      $('.fcontent').innerHTML = Competitions();
      getCompetitions($('.cards-competitions'));
    }else if(currentPage === "teams"){
      history.pushState({}, currentPage, `#${currentPage}`);
      $('.fcontent').innerHTML = Teams();
      getTeams($('.cards-teams'));
    }
  }
}

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    //Initialize Materialize Attributes
    M.Sidenav.init($('.sidenav'));
    M.Slider.init($('.slider'));

    //Call Navigation
    $('.nav-content').forEach(nav => nav.innerHTML = Navigation());

    //Call Pages
    app.init()
    console.log();

})

// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Registering ServiceWorker successfull");
      })
      .catch(function() {
        console.log("Registering ServiceWorker failed");
      });
  });
} else {
  console.log("ServiceWorker not supported in this browser.");
}

