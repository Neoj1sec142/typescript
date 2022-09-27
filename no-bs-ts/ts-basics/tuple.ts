type ThreeDCoordinate = [x:number, y:number, z:number];

function add3DCoordinate(c1: ThreeDCoordinate, c2: ThreeDCoordinate): ThreeDCoordinate{
    return[
        c1[0] + c2[0],
        c1[1] + c2[1],
        c1[2] + c2[2]
    ]
}

console.log(add3DCoordinate([0,0,0], [10,20,30]))

// The function below is similar to useState
// it returns a string(state) function and a set string state function
function simpleStringState(init: string): [()=>string, (v: string) => void]{
    let str: string = init;
    return [
        () => str,
        (v: string) => {
            str = v;
        }
    ]
}

const [stringGetter, stringSetter] = simpleStringState("Hello")
console.log(stringGetter())
stringSetter("Goodbye")
console.log(stringGetter())