import { openDB } from 'idb';
 
const dbPromise = openDB('football-db', 1, {
  upgrade(db) {
    db.createObjectStore('competitions', {
      keyPath: "id"
    });
    db.createObjectStore('teams', {
      keyPath: "id"
    });
  },
});
 
export const idbCompetitions = {
  async get(key) {
    return (await dbPromise).get('competitions', key);
  },
  async add(val) {
    return (await dbPromise).put('competitions', val).then(console.log("competition added"));
  },
  async delete(key) {
    return (await dbPromise).delete('competitions', key).then(()=>{console.log("competition deleted");});
  },
  async clear() {
    return (await dbPromise).clear('competitions');
  },
  async getAll() {
    return (await dbPromise).getAll('competitions');
  },
};

export const idbTeams = {
  async get(key) {
    return (await dbPromise).get('teams', key);
  },
  async add(val) {
    return (await dbPromise).put('teams', val).then(()=>console.log("team added"));
  },
  async delete(key) {
    return (await dbPromise).delete('teams', key).then(()=>{console.log("team deleted");});
  },
  async clear() {
    return (await dbPromise).clear('teams');
  },
  async getAll() {
    return (await dbPromise).getAll('teams');
  },
};