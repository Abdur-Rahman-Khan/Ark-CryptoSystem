
export function encrypt(plaintext,key,blockSize=32,rounds=3){
    // x=Number(x);
    // y=Number(y);
    let keyarr=[],
        plaintextarr=[],
        ciphertextarr=[];
    let n=plaintext.length;
    keyarr = populateKey(key,rounds);
    plaintextarr = padText(plaintext,blockSize);
    ciphertextarr=encryptHelper(plaintextarr,keyarr,rounds);
    // decryptHelper(ciphertextarr,keyarr,rounds);
    // printText(ciphertextarr);
    // return ciphertextarr;
    // console.log(plaintextarr);
    console.log(ciphertextarr);
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
    console.log(ciphertext);
    for(let i=0;i<rounds;i++){
        //xor with 1st key
        // console.log(ciphertext);

        ciphertext=xor(ciphertext,keyarr[i]);
        //substitution Box
        //Permutatuion box
    }
    console.log(ciphertext);
    return ciphertext;
}
function decryptBlockHelper(plaintext,keyarr,rounds=3 ){
    //N number of rounds
    let ciphertext=plaintext;
    for(let i=rounds-1;i>=0;i--){
        //xor with 1st key
        console.log(ciphertext);

        ciphertext=xor(ciphertext,keyarr[i]);
        //substitution Box
        //Permutatuion box
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