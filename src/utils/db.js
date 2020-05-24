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
    return (await dbPromise).put('competitions', val).then(alert("competition added"));
  },
  async delete(key) {
    return (await dbPromise).delete('competitions', key).then(()=>{alert("competition deleted");});
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
    return (await dbPromise).get('competitions', key);
  },
  async add(val) {
    return (await dbPromise).put('competitions', val).then(()=>alert("teams added"));
  },
  async delete(key) {
    return (await dbPromise).delete('competitions', key).then(()=>{alert("team deleted");});
  },
  async clear() {
    return (await dbPromise).clear('competitions');
  },
  async getAll() {
    return (await dbPromise).getAll('competitions');
  },
};