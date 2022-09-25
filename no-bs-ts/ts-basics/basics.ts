let userName: string = "Jack";
let hasLoggedIn: boolean = true;

userName += " Harrington";

console.log(hasLoggedIn);

let num: number = 10;
let regex = /foo/;

const nameArray: string[] = userName.split(" ");
const myArray: Array<number> = [2, 4, 6];


// You can declare an interface with the types
// one time then when you create an obj (instance)
// of the interface you just use inheritance
interface Person{
    first: string,
    last: string,
    isLoggedIn: boolean
};
const personObj: Person = {
    first: 'Donny',
    last: 'Darko',
    isLoggedIn: true
}

const ids: Record<number, string> = {
    10: "a",
    20: "b"
}
ids[30] = "e";

// if else conditionals
if (ids[30] == "D"){
// some stuff
}
// for loops
for (let i = 0; i < 10; i++){
    console.log(i);
}

// forEach method
[1,2,3].forEach((v) => console.log(v));

const out = [4,5,6].map((v) => v * 10);