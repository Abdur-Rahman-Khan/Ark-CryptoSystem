// import
//Async
const {xor,reverseString,convertArrToStr,convertStrToArr,vignere,padKey,populateKey,getPbox,getSbox}=require('./utility');
function decrypt(ciphertext,key,blockSize=32,rounds=3){
    let keyarr=[],
        plaintextarr=[],
        // dplaintextarr=[],
        ciphertextarr=[];
    let n=ciphertext.length;
    keyarr = populateKey(key,rounds);
    ciphertextarr=convertStrToArr(ciphertext,blockSize);
    plaintextarr=decryptHelper(ciphertextarr,keyarr,rounds);
    return extractFinalPlaintext(plaintextarr);
    // return ;
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
    // console.log(ciphertext);
    return ciphertext;
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



function extractFinalPlaintext(ciphertextarr){
    let finaltext=``;
    let n=ciphertextarr.length;
    for(let i=0;i<n-1;i++)
        finaltext+=ciphertextarr[i];
    let flag=0;
    let invtext=``;
    for(let i=ciphertextarr[n-1].length-1;i>=0;i--){
        if(ciphertextarr[n-1][i]!='\\')
            flag=1;
        if(flag==1){
            invtext+=ciphertextarr[n-1][i];
        }
    }
    finaltext+=reverseString(invtext);
    return finaltext;
}

module.exports =decrypt;