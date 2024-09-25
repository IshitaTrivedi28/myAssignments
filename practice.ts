let x:number =1;
console.log(x);

function greet(firstName:string){
console.log('Hello '+firstName);
}
greet("radhe radhe");

//return type of this function is number
function sum(a:number,b:number):number{
    return a+b;
}
const value=sum(10,20);
console.log(value);

//for 18+ it is legal -> automatically figures out that its a boolean
function isLegal(age:number){
    if(age<=18)return false;
    return true;
}

//how give type of another function as argument
function runA(runB:()=>void){
    setTimeout(runB,1000);
}
//using interfaces
interface User{
    firstName:string,
    lastName:string,
    age:number,
    //here ? denotes optional attribute
    email?:string
}
function isLegall(user:User){
    if(user.age>18)return true;
    else 
    return false;
}
//reuse the user interface
function greets(user:User){
    console.log('Hello '+user.firstName);
}
// T represents any, here if we use type=string | number
//then toUpperCase would throw an error
function identity<T>(arg:T):T{
    return arg;
}
let output1=identity<string>("string");
let output2=identity<number>(101);
//for mixed bag do
function identitys<T>(arr:T[]):T{
    return arr[0];
}
let output3=identitys<(string | number)>(["hello",1,101]);
console.log(output1.toUpperCase());
console.log(output1.toUpperCase());
