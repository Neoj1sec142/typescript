export function printToFile(text: string, callback: () => void):void{
    console.log(text);
    callback();
}

export type MutationFunction = (v: number) => number;
// decare a function inside a function with a type^^
// export function arrayMutate(numbers: number[], mutate: (v: number) => number): number[] {
//     return numbers.map(mutate)
// }

export function arrayMutate(numbers: number[], mutate: MutationFunction): number[] {
    return numbers.map(mutate)
}

const myNewNutate: MutationFunction = (v: number) => v * 100;

// console.log(arrayMutate([1,2,3], (v) => v * 10))

export type NewAdderTypeFunc = (v: number) => number;
export function createAdder(num: number): NewAdderTypeFunc```{
    return (val: number) => num + val
}
const addOne = createAdder(5);
console.log(addOne(55))