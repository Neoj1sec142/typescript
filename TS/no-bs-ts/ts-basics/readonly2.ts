class Doggy {
    constructor(public readonly name: string, public age: number){
    }
}

const wub = new Doggy("Wubby", 2)

// This class can NOT be recreated
// The private constructor and static instance
// variable make the instance available 
// outside of the class but deny any new
// initializations of the class meaning the 
// class has only one instance at all times
class DogList {
    private doggies: Doggy[] = [];
    static instance: DogList = new DogList();
    private constructor() {}
    public addDog(dog: Doggy){
        this.doggies.push(dog)
    }
    static addDog(dog: Doggy){
        DogList.instance.doggies.push(dog)
    }
    getDogs() {
        return this.doggies;
    }
}
// DogList.instance;

DogList.addDog(wub)
console.log(DogList.instance.getDogs())
// const dl = new DogList();
// ^^ NOT ALLOWED ^^
