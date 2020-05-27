import {BASE_URL, CREDENTIALS} from '../../settings/api.js';
import {idbCompetitions} from '../../utils/db.js';
import Spinner from '../../components/Spinner/Spinner.component.js';

export const getCompetitions = async (section) => {
    section.innerHTML = Spinner();
    const response = await fetch(BASE_URL+"competitions", CREDENTIALS);
    const value = await response.json();
    const competitions = value.competitions
        .filter(({area}) => area.ensignUrl)
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
                    <button data-id=${id} class="btn-save-competition btn-floating btn-large halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </button>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">
                        Description <i class="material-icons right">close</i>
                    </span>
                    <p>Code: ${code ? code : 'not yet'}</p>
                    <p>Available Season: ${numberOfAvailableSeasons}</p>
                    <p>last Update: ${lastUpdated}</p>
                </div>
            </div>
        `
    ), '');
    section.innerHTML = competitions;
    // Button Action
    section.querySelectorAll('.btn-save-competition').forEach(btn => {
        const id = btn.getAttribute('data-id');
        idbCompetitions.get(id)
            .then(value => (value.id === parseInt(id)) ? btn.setAttribute("disabled", "disabled") : '')
            .catch(err => err);
    })
    section.querySelectorAll('.btn-save-competition').forEach(btn => {
        btn.addEventListener('click', function(){
            const id = btn.getAttribute('data-id');
            const competition = value.competitions.find(competition => competition.id === parseInt(id));
            idbCompetitions.add(competition);
            idbCompetitions.get(id)
                .then(value => (value.id === parseInt(id)) ? btn.setAttribute("disabled", "disabled") : '')
                .catch(err => err);
        })
    });
}
