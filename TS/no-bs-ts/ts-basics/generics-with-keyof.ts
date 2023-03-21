/* 
The pluck function taskes an array of objects
and will pluck all the values of a specific 
given key. The keyof factor comes in for the 
KeyType extending the keyof DataType helping 
reference that the KeyType needs to be inside
of the datatype to succeed
*/

function pluck<DataType, KeyType extends keyof DataType>(
    items: DataType[], 
    key: KeyType
): DataType[KeyType][] {
    return items.map(item => item[key])
}

const dogs = [
    {name: "Wubby", age: 4},
    {name: "IDK", age: 5}
]

console.log(pluck(dogs, "age"))
console.log(pluck(dogs, "name"))

interface BaseEvent {
    time: number
    user: string
}
interface EventMap{
    addToCart: BaseEvent & {quantity: number; productId: string};
    checkout: BaseEvent
}
function sendEvent<Name extends keyof EventMap>(
    name: Name, 
    data: EventMap[Name]
): void {
    console.log([name, data])
}
sendEvent("addToCart", {productId: "foo", user: "bar", quantity: 1, time: 10})
sendEvent("checkout", {time: 20, user: 'bob'})