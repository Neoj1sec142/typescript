function myLogFunction() {
    return(str: string) => {
        console.log(str)
    }
}
const logger = myLogFunction();
// logger("Some String")

function createLoggerClass(){
    return class MyLoggerClass{
        private completeLog: string = "";
        log(str:string){
            console.log(str + " has been logged");
            this.completeLog += str + '\n';
        }
        dumpLog(){
            return this.completeLog;
        }
    }
}
const MyLogger = createLoggerClass()
const logger2 = new MyLogger()
// logger2.log("foo")
// console.log(logger2.dumpLog())

function CreateSimpleMemoryDB<T>(){
    return class SimpleMemoryDB{
        private db: Record<string, T> = {}
        set(id: string, value: T){
            this.db[id] = value
        }
        get(id: string): T{
            return this.db[id];
        }
        getObject(): object {
            return this.db;
        }
    }
}
const StringDB = CreateSimpleMemoryDB<string>();
const stdb1 = new StringDB()
// stdb1.set("a", "deez")
// stdb1.set("b", "nutz")
// console.log(`${stdb1.get("a")} ${stdb1.get("b")}`)

type Contructor<T> = new (...args:any[]) => T;

function Dumpable<T extends Contructor<{
    getObject(): object;
}>>(Base: T){
    return class Dumpable extends Base{
        dump(){
            console.log(this.getObject())
        }
    }
}

const DumpableStrDb = Dumpable(StringDB)
const stdb2 = new DumpableStrDb()
stdb2.set("Jack", "Hello Jack")
stdb2.dump()