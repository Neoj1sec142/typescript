/* 
This is a simple implementation of a 
typescript noSQL In Memory Database

The interface has 2 methods:
    * get - takes a string(id) and returns a string value
    * set - takes a string(id) and string value(value to store)
            and doesnt return anything

The class implements the interface and 
then the methods by creating a record
utility that has string ids and values

The private feature on the db makes it 
not possible to overwrite the db without
calling the methods
*/

interface Database {
    get(id: string): string;
    set(id: string, value:string): void
}

interface Persistable {
    saveToString(): string;
    restoredFromString(storedState: string): void;
}

class InMemoryDatabase implements Database {
    protected db : Record<string, string> = {}
    get(id: string): string {
        return this.db[id];
    }
    set(id: string, value:string): void {
        this.db[id] = value;
    }
}

class PersistentMemoryDB extends InMemoryDatabase implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db)
    }
    restoredFromString(storedState: string): void {
        this.db = JSON.parse(storedState)
    }
    
}

const myDB = new PersistentMemoryDB();
myDB.set("0", "bar")

console.log(myDB.get("0"))
const saved = myDB.saveToString()

const myDB2 = new PersistentMemoryDB();
myDB2.restoredFromString(saved)