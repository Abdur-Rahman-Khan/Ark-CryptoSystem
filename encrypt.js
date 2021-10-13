const {xor,reverseString,convertArrToStr,vignere,padKey,populateKey,getPbox,getSbox}=require('./utility');
function encrypt(plaintext,key,blockSize=32,rounds=3){
    let keyarr=[],
        plaintextarr=[],
        // dplaintextarr=[],
        ciphertextarr=[],
        ciphertext=``;
    let n=plaintext.length;
    keyarr = populateKey(key,rounds);
    plaintextarr = padText(plaintext,blockSize);
    ciphertextarr=encryptHelper(plaintextarr,keyarr,rounds);
    ciphertext=convertArrToStr(ciphertextarr);
    return ciphertext;
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

function padText(text,blockSize){
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

function substitutionLayer(text,key){
    let sboxarr=getSbox(key);
    let newtext=``;
    for(let i=0;i<text.length;i++){
        let x=(text.charCodeAt(i));
        newtext+=String.fromCharCode(sboxarr[x]);
    }
    return newtext;
}
function permutationLayer(text,key){
    let pboxarr=getPbox(key);
    // let newtext=text;
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

module.exports = encrypt;