import { encrypt } from "./encrypt.js";
const plaintextDom=document.getElementsByClassName("plaintext");
const plainkeyDom=document.querySelector(".keyp");

// console.log(plainkeyDom);
console.log(encrypt("Ahmad khan is my brother and I want to tell You","Mohd1"));
// padText("hello",20);

const toggleBtn=document.querySelector(".btnToggleAdv");
toggleBtn.addEventListener('click',myFunc);

function myFunc(){
    console.log("Ok",toggleBtn.textContent=='Show Advanced',typeof(toggleBtn.textContent),typeof('Show Advanced'));
    let temp=document.querySelector(".advanced");
    if(toggleBtn.textContent=="Show Advanced")
        toggleBtn.textContent="Hide Advanced";
    else
        toggleBtn.textContent="Show Advanced";
    temp.classList.toggle("advancedHide");
    temp.classList.toggle("advancedShow");
}