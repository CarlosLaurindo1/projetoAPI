const addressForm = document.querySelector("address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInput = document.querySelector("[data-input]");

const closeButton = document.querySelector('#close-message');

// validate cep input
cepInput.addEventListener("keypress", (e) =>{
    const onlyNumbers= /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    console.log(e.keyCode);
    console.log(keyCode);
})