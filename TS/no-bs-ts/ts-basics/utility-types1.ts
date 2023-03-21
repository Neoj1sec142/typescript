interface MyUser {
    name: string;
    id: string;
    email?: string;
}
// interface MyUserOptionals {
//     name?: string;
//     id?: string;
//     email?: string;
// }
type MyUserOptionals = Partial<MyUser>

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
    return{
        ...user,
        ...overrides
    }
}
// console.log(merge({
//     name: "Jack",
//     id: "captain",
//     email: "captainjacksp@theblack.com"
// }, {
//     name: "Jack Sparrow"
// }))

type RequriedMyUser = Required<MyUser>
type JustEmailName = Pick<MyUser, "email" | "name">

type UserWithoutId = Omit<MyUser, "id">
// const mapById = (users: MyUser[]): Record<string, MyUser> => {
//     return users.reduce((a, v) => {
//         return{
//             ...a,
//             [v.id]:v,
//         }
//     }, {})  
// }

const mapById = (users: MyUser[]): Record<string, Omit<MyUser, "id">> => {
    return users.reduce((a, v) => {
        const {id, ...other} = v
        return{
            ...a,
            [id]:other,
        }
    }, {})  
}

console.log(mapById([
    {
        id: "foo",
        name: "Mr. Foo"
    },
    {
        id: "fop",
        name: "Mr. Fop"
    }
]))
