import {BASE_URL, CREDENTIALS} from '../../settings/api.js';
import {idbTeams} from '../../utils/db.js';
import Spinner from '../../components/Spinner/Spinner.component.js';

export const getTeams = async (section) => {
    section.innerHTML = Spinner();
    const response = await fetch(BASE_URL+"teams", CREDENTIALS);
    const value = await response.json();
    const teams = value.teams
        .filter(({crestUrl}) => crestUrl)
        .reduce((accumulator, {id, name, area, tla, crestUrl, shortName, address, phone, website, email, founded, clubColors, venue, lastUpdated}) => (
        accumulator += `
            <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                    <img src="${crestUrl}" alt="${name} picture" class="activator">
                </div>
                <div class="card-content">
                    <span class="card-title activator grey-text text-darken-4">
                        ${name} <i class="material-icons right">more_vert</i>
                    </span>
                    <p>TLA: ${tla}</p>
                    <p>Area: ${area.name}</p>
                    <button data-id=${id} class="btn-save-team btn-floating btn-large halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </button>
                </div>
                <div class="card-reveal">
                    <span class="card-title grey-text text-darken-4">
                        Description <i class="material-icons right">close</i>
                    </span>
                    <p>Short name: ${shortName}</p>
                    <p>Address: ${address}</p>
                    <p>Phone: ${phone}</p>
                    <p>Website: <a href="${website}" target=”_blank”>${website}</a></p>
                    <p>Email: ${email}</p>
                    <p>Founded: ${founded}</p>
                    <p>Club colors: ${clubColors}</p>
                    <p>Venue: ${venue}</p>
                    <p>Last updated: ${lastUpdated}</p>
                </div>
            </div>
        `
    ), '');
    section.innerHTML = teams;
    // Button Action
    section.querySelectorAll('.btn-save-team').forEach(btn => {
        const id = btn.getAttribute('data-id');
        idbTeams.get(id)
            .then(value => (value.id === parseInt(id)) ? btn.setAttribute("disabled", "disabled") : '')
            .catch(err => err);
    })
    section.querySelectorAll('.btn-save-team').forEach(btn =>
        btn.addEventListener('click', function(){
            const id = btn.getAttribute('data-id');
            const team = value.teams.find(team => team.id === parseInt(id));
            idbTeams.add(team);
            idbTeams.get(id)
                .then(value => (value.id === parseInt(id)) ? btn.setAttribute("disabled", "disabled") : '')
                .catch(err => err);
        })
    );
}