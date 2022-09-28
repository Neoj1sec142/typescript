interface Cat {
    name: string;
    breed: string;
}
// type ReadonlyCat = Readonly<Cat>
// function makeCat(name:string, breed:string):ReadonlyCat{
//     return {name, breed}
// }

function makeCat(name:string, breed:string):Readonly<Cat>{
    return {name, breed}
}


const dex = makeCat("Dex", "Siamese")

function makeCoordinate(
    x: number, y: number, z: number
): readonly [number,number,number] {
    return [x,y,z]
}

const reallyConstant = [1,2,3] as const
