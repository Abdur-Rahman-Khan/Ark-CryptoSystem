import { encrypt } from "./encrypt.js";
const plaintextDom=document.getElementsByClassName("plaintext");
const plainkeyDom=document.querySelector(".keyp");

console.log(plainkeyDom);


console.log(encrypt(10,2));