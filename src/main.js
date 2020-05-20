import 'regenerator-runtime/runtime';
import './library/materialize.min.css';
import './library/materialize.min.js';
import './styles.scss';
import $ from './utils/selector.js';
import Navigation from './components/Navigation/Navigation.component.js';
import Teams from './pages/Teams/Teams.page.js';
import { getTeams } from './pages/Teams/Teams.api.js';
import Competitions from './pages/Competitions/Competitions.page.js';
import { getCompetitions } from './pages/Competitions/Competitions.api.js';
import SavedCompetitions from './pages/SavedCompetitions/SavedCompetitions.page.js';
import { getSavedCompetitions } from './pages/SavedCompetitions/SavedCompetitions.api.js';
import FavoriteTeams from './pages/FavoriteTeams/FavoriteTeams.page.js';
import { getFavoriteTeams } from './pages/FavoriteTeams/FavoriteTeams.api.js';
import { requestPermission } from './utils/pushNotification.js';

// Create SPA
const app = {
  init: function(){
    $('.nav-link').forEach((link)=>{
        link.addEventListener('click', app.nav);
    })
    // Default page
    let currentPage = 'competitions';
    if(location.hash !== ''){
      currentPage = location.hash.replace('#' ,'');
    }
    app.route(currentPage);
    window.addEventListener('popstate', app.poppin);
  },
  nav: function(event){
    event.preventDefault();
    let currentPage = event.target.getAttribute('data-target');
    history.pushState({}, currentPage, `#${currentPage}`);
    app.route(currentPage)
  },
  poppin: function(){
    let currentPage = location.hash.replace('#' ,'');
    history.pushState({}, currentPage, `#${currentPage}`);
    app.route(currentPage)
  },
  route: function(currentPage){
    // Cannot use switch case. It won't work instead I use if else.
    if(currentPage === "competitions"){
      $('.fcontent').innerHTML = Competitions();
      getCompetitions($('.cards-competitions'));
    }else if(currentPage === "teams"){
      $('.fcontent').innerHTML = Teams();
      getTeams($('.cards-teams'));
    }else if(currentPage === "savedCompetitions"){
      $('.fcontent').innerHTML = SavedCompetitions();
      getSavedCompetitions($('.cards-competitions'));
    }else if(currentPage === "favoriteTeams"){
      $('.fcontent').innerHTML = FavoriteTeams();
      getFavoriteTeams($('.cards-teams'));
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
    app.init();

});

//Request Notification Permission
requestPermission();
