import {idbCompetitions} from '../../utils/db.js';
import Spinner from '../../components/Spinner/Spinner.component.js';

export const getSavedCompetitions = (section) => {
    section.innerHTML = Spinner();
    idbCompetitions.getAll().then((competitions) => {
        const savedCompetitions = competitions
        .reduce((accumulator, {id, name, plan, area, code, numberOfAvailableSeasons, lastUpdated}) => (
            accumulator += `
               <div class="card">
                   <div class="card-image waves-effect waves-block waves-light">
                       <img src="${area.ensignUrl}" alt="${name} picture" class="activator">
                   </div>
                   <div class="card-content">
                       <span class="card-title activator grey-text text-darken-4">
                           ${name} <i class="material-icons right">more_vert</i>
                       </span>
                       <p>Plan: ${plan},</p>
                       <p>Area: ${area.name}</p>
                       <button data-id=${id} class="btn-delete-competition btn-floating btn-large halfway-fab waves-effect waves-light red">
                           <i class="material-icons">delete</i>
                       </button>
                   </div>
                   <div class="card-reveal">
                       <span class="card-title grey-text text-darken-4">
                           Description <i class="material-icons right">close</i>
                       </span>
                       <p>Code: ${code || 'not yet'}</p>
                       <p>Available Season: ${numberOfAvailableSeasons}</p>
                       <p>last Update: ${lastUpdated}</p>
                   </div>
               </div>
           `), '');
        section.innerHTML = (savedCompetitions || `<p style="text-align:center; color:#eee; font-size: 1.4rem; letter-spacing: .01rem">Saved Competitions haven't been added</p>`);
        // Button Action
        section.querySelectorAll('.btn-delete-competition').forEach(btn =>
            btn.addEventListener('click', function(){
                const id = btn.getAttribute('data-id');
                idbCompetitions.delete(id);
                getSavedCompetitions(section);
            })
        );
    });
}

