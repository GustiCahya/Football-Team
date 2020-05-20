import idb from 'idb'

const dbPromised = idb.open("football-db", 1, function(upgradeDb) {
    upgradeDb.createObjectStore("competitions", {
      keyPath: "id"
    });
    upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
});

export const saveCompetition = (competition) => {
    dbPromised
        .then(function(db) {
            const tx = db.transaction("competitions", "readwrite");
            const store = tx.objectStore("competitions");
            store.add(competition);
            return tx.complete;
        })
        .then(function() {
            console.log("competition has been saved.");
        }).catch((err)=>console.log(err));
}


export const getAllCompetitions = () => {
    return new Promise((resolve, reject) => {
      dbPromised
        .then((db) => {
          const tx = db.transaction("competitions", "readonly");
          const store = tx.objectStore("competitions");
          return store.getAll();
        })
        .then((competitions) => {
          resolve(competitions);
        }).catch((err)=>console.log(err));
    });
}

export const saveTeam = (team) => {
    dbPromised
        .then(function(db) {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.add(team);
            return tx.complete;
        })
        .then(function() {
            console.log("team has been saved.");
        }).catch((err)=>console.log(err));
}


export const getAllTeams = () => {
    return new Promise((resolve, reject) => {
      dbPromised
        .then((db) => {
          const tx = db.transaction("teams", "readonly");
          const store = tx.objectStore("teams");
          return store.getAll();
        })
        .then((teams) => {
          resolve(teams);
        }).catch((err)=>console.log(err));
    });
}