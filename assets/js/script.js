const result = document.querySelector(".result");
const copy = document.querySelector(".copy");

const length = document.querySelector(".length");
const lowercase = document.querySelector(".lowercase");
const uppercase = document.querySelector(".uppercase");
const numbers = document.querySelector(".numbers");
const symbols = document.querySelector(".symbols");

const generate_btn = document.querySelector(".generate-btn");

const randomFunc = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numbers: getRandomNumber,
  symbols: getRandomSymbol
};

const handleCopy = () => {

  const password = result.value;
  
  if(password === ''){
    return;
  }

  navigator.clipboard.writeText(password);
  alert("Your Password has been copied to clipboard!");

}

const generatePassword = (length, lowercase, uppercase, numbers, symbols) => {
  let generatedPassword = '';

  const typesCount = lowercase + uppercase + numbers + symbols; // count types
  const typesArr = [{lowercase}, {uppercase}, {numbers}, {symbols}].filter(item => Object.values(item)[0]); // filtering out unchecked input

  if(typesCount === 0){
    return '';
  }
  
  for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += randomFunc[funcName]();
      });
    }

    const finalPassword = generatedPassword.slice(0, length);
    generatedPassword = ''; 
    return finalPassword;
}

const handleGenerate = () => {
  const hasLength = length.value;
  const hasLowercase = lowercase.checked;
  const hasUppercase = uppercase.checked;
  const hasNumbers = numbers.checked;
  const hasSymbols = symbols.checked;

  result.value = generatePassword(hasLength, hasLowercase, hasUppercase, hasNumbers, hasSymbols);
}

copy.addEventListener("click", () => handleCopy());

generate_btn.addEventListener("click", () => handleGenerate());

function getRandomLower(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(){
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(){
  return Math.floor(Math.random() * 10);
}

function getRandomSymbol(){
  const symbols = '!@#$%^&*()_+={}[]<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
