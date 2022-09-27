import houses from "./houses.json";

interface House {
    name: string
    planets: string | string[]
}
interface HouseWithId extends House{
    id: number
}

// function findHouses(houses: string): HouseWithId[];
// function findHouses(
//     houses: string, 
//     filter: (house: House) => boolean
// // ):HouseWithId[];
// function findHouses(houses: string | House[]): HouseWithId[];
// function findHouses(
//     houses: string| House[], 
//     filter: (house: House)=> boolean
// ): HouseWithId[];


function findHouses(
    input: string | House[], 
    filter?: (house: House)=> boolean
): HouseWithId[]{
    const houses: House[] = typeof input === "string" ? JSON.parse(input) : input;
    return (filter? houses.filter(filter): houses)
        .map((house) => ({
            id: houses.indexOf(house),
            ...house
        }))
}

console.log(findHouses(JSON.stringify(houses), ({name}) => name === "Harkonnen"))
console.log(findHouses(houses, ({name}) => name === "Atreides"))


