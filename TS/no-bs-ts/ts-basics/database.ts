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

interface Database<T, K> {
    get(id: K): T;
    set(id: K, value:T): void
}

interface Persistable {
    saveToString(): string;
    restoredFromString(storedState: string): void;
}

type DBKeyType = string | number | symbol

class InMemoryDatabase<T, K extends DBKeyType> implements Database<T, K> {
    protected db : Record<K, T> = {} as Record<K, T>
    get(id: K): T {
        return this.db[id];
    }
    set(id: K, value:T): void {
        this.db[id] = value;
    }
}

class PersistentMemoryDB<T, K extends DBKeyType> extends InMemoryDatabase<T, K> implements Persistable {
    saveToString(): string {
        return JSON.stringify(this.db)
    }
    restoredFromString(storedState: string): void {
        this.db = JSON.parse(storedState)
    }
    
}

const myDB = new PersistentMemoryDB<number, string>();
myDB.set("0", 1234)

console.log(myDB.get("0"))
const saved = myDB.saveToString()

const myDB2 = new PersistentMemoryDB<number, string>();
myDB2.restoredFromString(saved)