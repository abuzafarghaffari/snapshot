import Dexie, { Table } from 'dexie';

var db = new Dexie("MyDatabase");

db.version(1).stores({
    friends: "timestamp,title,category, url"
    
});
console.log("db")

async function storeDataInIndexDB(data){
await db.friends.add(data)
}

 function FriendList() {
    const friends = useLiveQuery(
      () => db.friends.toArray()
    );
 }