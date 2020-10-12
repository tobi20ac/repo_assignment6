
//Følgende variabler indeholder hvad der står i de forskellige bokse på hjemmesiden
const email = document.getElementById("email");
const password = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const birthday = document.getElementById("birthday");
const cpr = document.getElementById("cpr");
const gender = document.getElementById("gender");

//Følgende variabler er brugerens oplysninger, efter de er blevet tjekket og godkendt. 
var userMail = ""; 
var userPassword = ""; 
var userFirstName = "";
var userLastName = ""; 
var userBirthday = ""; 
var userCpr = ""; 
var userGender = "";

// Variabel for hele formularen
const form = document.getElementById("form");

//Variabel der refererer til den error message, som skal vises på hjemmesiden.
const errorElement = document.getElementById("error");

var messages = [];
//Event listerner, som kontrollerer brugerens input, når man prøver at submitte. Hvis message arrayet er tomt, bliver formularen sendt, ellers bliver der vist
// fejlbekseder afhængig af hvor der er fejl. 
form.addEventListener("submit", (e) =>{
    messages = [];
    // Tjekker om inputtet er af korrekt form, og hvis det ikke er bliver der tilføjet en fejlmeddelelse. 
    if (email.value == "") { 
        messages.push("No email"); 
    }

    if(password.value.length<=7 || password == "") {
        messages.push("Invalid password");
    }

    if(firstName.value == "" || lastName.value == ""){
        messages.push("Missing either first name or last name");
    }

    if(birthday.value == "" || Number(birthday.value.replace("-","").replace("-","")) < 19000000 || Number(birthday.value.replace("-","").replace("-","")) > 20200000){
        messages.push("Incorrect birthday (year must be between 1900 and 2020)");
    }
   
    if(cpr.value == "" || cpr.value.toString().length !=10){
        messages.push("Incorrect CPR (must be 10 numbers).");
    }
   
    // Hvis der er fejl i et eller flere af inputtene bliver disse vist til brugeren og siden opdaterer ikke. 
    if(messages.length > 0){
        e.preventDefault();
        errorElement.innerText = messages.join(", ");
    }
})

// Tilføjer eventlistener, som hvis alle brugerens indput er valide vil gemme disse data i localstorage.
form.addEventListener("submit", (e) =>{
    if(messages.length == 0){
        localStorage.setItem("mail", email.value);
        userMail = localStorage.getItem("mail");
        console.log(userMail);

        localStorage.setItem("password", password.value);
        userPassword = localStorage.getItem("password");
        console.log(userPassword);

        localStorage.setItem("firstName", firstName.value);
        userFirstName = localStorage.getItem("firstName");
        console.log(userFirstName);

        localStorage.setItem("lastName", lastName.value);
        userLastName = localStorage.getItem("lastName");
        console.log(userLastName);

        localStorage.setItem("birthday", birthday.value);
        userBirthday = localStorage.getItem("birthday");
        console.log(userBirthday);

        localStorage.setItem("cpr", cpr.value);
        userCpr = localStorage.getItem("cpr");
        console.log(userCpr);

        localStorage.setItem("gender", gender.value);
        userGender = localStorage.getItem("gender");
        console.log(userGender);    
    }
})

//Event listener, der viser brugeren om passwordet opfylder kriterierne. Ændrer i id'et password-length.  
form.addEventListener("keyup", (e) =>{
    if (password.value.length >7) {
        document.getElementById("password-length").innerHTML="Min 8 characters: Yes";
    }
    if (password.value.length <=7) {
        document.getElementById("password-length").innerHTML="Min 8 characters: No";
    }
})

    //Viser på hjemmesiden hvilke data, der er gemt i localStorage ved at køre gennem et loop, der gennemløber de forskellige index i localStorage.  
for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    document.getElementById("user-mail").innerHTML += `${key}: ${value}<br />`;
}


