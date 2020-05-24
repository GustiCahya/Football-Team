import {idbTeams} from '../../utils/db.js';
import Spinner from '../../components/Spinner/Spinner.component.js';

export const getFavoriteTeams = (section) => {
    section.innerHTML = Spinner();
    idbTeams.getAll().then((teams) => {
        const favoriteTeams = teams
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
                        <button class="btn-delete-team btn-floating btn-large halfway-fab waves-effect waves-light red">
                           <i data-id=${id} class="material-icons">delete</i>
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
        section.innerHTML = favoriteTeams;
        // Button Action
        section.querySelectorAll('.btn-delete-team').forEach(btn =>
            btn.addEventListener('click', function(event){
                const id = event.target.getAttribute('data-id');
                idbTeams.delete(id);
                getFavoriteTeams(section);
            })
        );
    });
}

