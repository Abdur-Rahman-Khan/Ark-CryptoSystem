
export function encrypt(plaintext,key){
    // x=Number(x);
    // y=Number(y);
    let keyarr=[];
    let plaintextarr=[];
    let ciphertextarr=[];
    let n=plaintext.length();
    populateKey(key,keyarr);
    padText(plaintext,plaintextarr);
    encryptHelper(plaintextarr,ciphertextarr,keyarr);
    printText(ciphertextarr);
    return ciphertextarr;
}


