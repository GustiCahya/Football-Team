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
        .then((db) => {
            const tx = db.transaction("competitions", "readwrite");
            const store = tx.objectStore("competitions");
            store.put(competition);
            return tx.complete;
        })
        .then(() => {
            console.log("competition has been saved.");
        })
}

export const deleteCompetition = (id) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("competitions", "readwrite");
            const store = tx.objectStore("competitions");
            store.delete(id);
            return tx.complete;
        })
        .then(() => {
            console.log("competition has been deleted with id: "+id);
        })
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
        })
    });
}

export const saveTeam = (team) => {
    dbPromised
        .then((db) => {
            const tx = db.transaction("teams", "readwrite");
            const store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(() => {
            console.log("team has been saved.");
        })
}

export const deleteTeam = (id) => {
  dbPromised
      .then((db) => {
          const tx = db.transaction("teams", "readwrite");
          const store = tx.objectStore("teams");
          store.delete(id);
          return tx.complete;
      })
      .then(() => {
          console.log("team has been deleted with id: "+id);
      })
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
        })
    });
}