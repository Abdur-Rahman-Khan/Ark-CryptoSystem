function getSbox(key){
    let arr=[];
    for(let i=0;i<256;i++)
        arr.push(i);
    let tempKey=padKey(key,256);
    for(let i=0;i<256;i++){
        let j=tempKey.charCodeAt(i);
        let temp=arr[j];
        arr[j]=arr[i];
        arr[i]=temp;
    }
    // console.log(arr);
    return arr;
}
function getPbox(key){

    let n=key.length;
    let arr=[];
    for(let i=0;i<n;i++)
        arr.push(i);
    // let tempKey=padKey(key,256);
    for(let i=0;i<n;i++){
        let j=key.charCodeAt(i)%n;
        let temp=arr[j];
        arr[j]=arr[i];
        arr[i]=temp;
    }
    // console.log(arr);
    return arr;
}
export function encrypt(plaintext,key,blockSize=32,rounds=3){
    let keyarr=[],
        plaintextarr=[],
        dplaintextarr=[],
        ciphertextarr=[];
    let n=plaintext.length;
    keyarr = populateKey(key,rounds);
    plaintextarr = padText(plaintext,blockSize);
    ciphertextarr=encryptHelper(plaintextarr,keyarr,rounds);
    dplaintextarr=decryptHelper(ciphertextarr,keyarr,rounds);
    // printText(ciphertextarr);
    // return ciphertextarr;
    // console.log(plaintextarr);
    console.log(plaintextarr);
    console.log(ciphertextarr);
    console.log(dplaintextarr);
    // getSbox(keyarr[0]);
    // permutationBox(keyarr[0]);
    // console.log(ciphertextarr);
    console.log()
    return 1;
}
function xor(text, key){
    let tempstring=``;
    for(let i=0;i<key.length;i++){
        let x=(key.charCodeAt(i));
        let y=(text.charCodeAt(i));
        x=(x^y)%256;
        let tempchar=String.fromCharCode(x);
        tempstring+=tempchar;
    }
    return tempstring;
}
function substitutionLayer(text,key){
    let sboxarr=getSbox(key);
    let newtext=``;
    for(let i=0;i<text.length;i++){
        let x=(text.charCodeAt(i));
        newtext+=String.fromCharCode(sboxarr[x]);
    }
    return newtext;
}
export function convertArrToStr(chararr){
    let text=``;
    for(let i=0;i<chararr.length;i++){
        text+=chararr[i];
    }
    return text;
}
function permutationLayer(text,key){
    let pboxarr=getPbox(key);
    // let newtext=text;
    let newtext=[];
    newtext.length=text.length;
    for(let i=0;i<text.length;i++){
        // let x=(text.charCodeAt(i));
        // newtext+=String.fromCharCode(pboxarr[x]);
        newtext[i]=text[pboxarr[i]];
    }
    newtext=convertArrToStr(newtext);
    return newtext;
}
function invPermutationLayer(text,key){
    let pboxarr=getPbox(key);
    pboxarr=getInvSbox(pboxarr);
    let newtext=[];
    newtext.length=text.length;
    for(let i=0;i<text.length;i++){
        // let x=(text.charCodeAt(i));
        // newtext+=String.fromCharCode(pboxarr[x]);
        newtext[pboxarr[i]]=text[i];
    }
    newtext=convertArrToStr(newtext);
    return newtext;
}

function getInvSbox(sbox){
    let arr=[];
    arr.length=sbox.length;
    for(let i=0;i<sbox.length;i++){
        arr[sbox[i]]=i;
    }
    return arr;
}
function invSubstitutionLayer(text,key){
    let sboxarr=getSbox(key);
    sboxarr=getInvSbox(sboxarr);
    let newtext=``;
    for(let i=0;i<text.length;i++){
        let x=(text.charCodeAt(i));
        newtext+=String.fromCharCode(sboxarr[x]);
    }
    return newtext;
}
function encryptHelper(plaintextarr,keytextarr,rounds=3){
    let ciphertextarr=[];
    for(let i=0;i<plaintextarr.length;i++){
        ciphertextarr.push(encryptBlockHelper(plaintextarr[i],keytextarr,rounds));
    }
    return ciphertextarr;
}
function encryptBlockHelper(plaintext,keyarr,rounds=3 ){
    //N number of rounds
    let ciphertext=plaintext;
    // console.log(ciphertext);
    for(let i=0;i<rounds;i++){
        //xor with 1st key
        // console.log(ciphertext);

        ciphertext=xor(ciphertext,keyarr[i]);
        //substitution Box
        // let subsBox=getSbox(key[i]);
        ciphertext=substitutionLayer(ciphertext,keyarr[i]);
        //Permutatuion box
        ciphertext=permutationLayer(ciphertext,keyarr[i]);
    }
    // console.log(ciphertext);
    return ciphertext;
}
function decryptHelper(ciphertextarr,keytextarr,rounds=3){
    let plaintextarr=[];
    for(let i=0;i<ciphertextarr.length;i++){
        plaintextarr.push(decryptBlockHelper(ciphertextarr[i],keytextarr,rounds));
    }
    return plaintextarr;
}
function decryptBlockHelper(plaintext,keyarr,rounds=3 ){
    //N number of rounds
    let ciphertext=plaintext;
    for(let i=rounds-1;i>=0;i--){
        //Permutatuion box

        ciphertext=invPermutationLayer(ciphertext,keyarr[i]);
        //substitution Box
        ciphertext=invSubstitutionLayer(ciphertext,keyarr[i]);
        //xor with 1st key
        // console.log(ciphertext);
        ciphertext=xor(ciphertext,keyarr[i]);
        
        
    }
    console.log(ciphertext);
    return ciphertext;
}

export function padText(text,blockSize){
    let arr=[];
    let n=blockSize-(text.length%blockSize);
    let addString=``;
    let tempstring=``;
    text+=addString.padEnd(n,'\\');

    //Breaking String to blocksize array - BruteForce
    // for(let i=0;i<text.length;i++){
    //     if(i%blockSize==0)
    //         tempstring=``;
    //     tempstring+=text[i];
    //     if(i%blockSize==(blockSize-1)){
    //         arr.push(tempstring);
    //     }
    // }

    //Breaking String to blocksize array - Refactored
    for(let i=0;i<(text.length/blockSize);i++){
        arr.push(text.slice(i*blockSize,(i+1)*blockSize));
    }
    return arr;
}


export function populateKey(key,rounds=3,size=32){
    key=padKey(key,size);
    let arr=[];
    arr.push(vignere(key,key,size));
    for(let i=1; i<rounds; i++){
        let tempKey=vignere(arr[i-1],key,size);
        arr.push(tempKey);
    }
    // hashCode(key,i);
    // vignere(key);
    // console.log(arr);
    return arr;
}
export function padKey(key,size){
    // console.log(size,key.length);
    let tempKey=``;
    tempKey+=key;
    while(size>tempKey.length){
        // console.log(key);
        tempKey+=vignere(tempKey.slice(tempKey.length-key.length,tempKey.length),key,key.length);
    }
    key=tempKey.slice(0,size);
    return key;
}
// function hashCode(key,shift) {
//     let hash = 0;
//     if (key.length == 0) {
//         return hash;
//     }
//     console.log(key);
//     for (var i = 0; i < key.length; i++) {
//         var char = key.charCodeAt(i);
//         hash = ((hash<<shift)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     console.log(`A`+hash);
//     return hash;
// }
// function dec2bin(dec) {
//     return (dec >>> 0).toString(2);
//   }
function vignere(keyati,key,size=32){
    let tempstring=``;
    // console.log(keyati);
    for(let i=0;i<size;i++){
        let x=(key.charCodeAt(i));
        let y=(keyati.charCodeAt(i));
        // console.log(x+x);
        x=(x+y)%256;
        let tempchar=String.fromCharCode(x);
        tempstring+=tempchar;
    }
    // console.log(tempstring.length,tempstring);
    return tempstring;
}