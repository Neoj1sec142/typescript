//  Optional Parameters
function printIngredient(quantity: string, indredient: string, extra?: string){
    console.log(`${quantity} ${indredient} ${extra ? `${extra}` : ""}`)
}
printIngredient("1C", "Flour", "Sifted")

interface User {
    id: string
    info?: {
        email?: string
    }
}

function getEmail(user: User): string {
    if (user.info){
        return user.info.email!;
    }
    return ""
}

function getEmailEasy(user: User): string {
    // Easy way to say:
    // if user exists get info
    // and if info exists get email
    // if not return a empty string
    return user?.info?.email ?? "";
}

function addWithCallback(x: number, y: number, callback?: () => void){
    // Only executes the callback if 
    // the callback exists otherwise ignored
    // after console.log
    console.log([x,y])
    callback?.();
}