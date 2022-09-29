type Key = "Httpresponse 200" | "Httpresponse 500"

class User {
    name: string;
    username: string;
    email: string;
    constructor(name:string, username:string, email:string){
        this.name = name
        this.username = username
        this.email = email
    }
    login(){
        console.log(`${this.name} has logged in.`)
    }
    logout(){
        console.log(`${this.name} has logged out.`)
    }
}
const neo = new User("Neo", "Neothej1sec142", "Test@test.com")

neo.login()