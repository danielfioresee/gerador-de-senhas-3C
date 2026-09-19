function generatePassword() {
 const length = document.getElementById("length").value;


 const useUpper = document.getElementById("uppercase").checked;
 const useNumbers = document.getElementById("numbers").checked;
 const useSymbols = document.getElementById("symbols").checked;


 const lower = "abcdefghijklmnopqrstuvwxyz";
 const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const numbers = "0123456789";
 const symbols = "!@#$%^&*()_+[]{}<>?";


 let chars = lower;


 if (useUpper) chars += upper;
 if (useNumbers) chars += numbers;
 if (useSymbols) chars += symbols;


 let password = "";


 for (let i = 0; i < length; i++) {
   const randomIndex = Math.floor(Math.random() * chars.length);
   password += chars[randomIndex];
 }


 document.getElementById("password").value = password;
}

