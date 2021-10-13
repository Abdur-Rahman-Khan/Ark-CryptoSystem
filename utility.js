function populateKey(key,rounds=3,size=32){
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
function padKey(key,size){
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

function convertArrToStr(chararr){
  let text=``;
  for(let i=0;i<chararr.length;i++){
      text+=chararr[i];
  }
  return text;
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


function reverseString(str) {
  var splitString = str.split(""); 
  var reverseArray = splitString.reverse(); 
  var joinArray = reverseArray.join(""); 
  return joinArray; 
}

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
function convertStrToArr(text,blockSize=32){
  let arr=[];
  for(let i=0;i<text.length;i+=blockSize)
    arr.push(text.slice(i,i+blockSize));
  return arr;
}

module.exports ={xor,reverseString,convertArrToStr,convertStrToArr,vignere,padKey,populateKey,getPbox,getSbox};