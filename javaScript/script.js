const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector('#close-message');
const fadeElement = document.querySelector("#fade")

// validate cep input
cepInput.addEventListener("keypress", (e) =>{
    const onlyNumbers= /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    console.log(e.keyCode);
    console.log(keyCode);

    if (!onlyNumbers.test(key)){
        e.preventDefault();
        return;
    }
});

//bUSCANDO O EVENTO DE ENDEREÇO
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value

    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});

//Buscando o endereço do cliente da API
const getAddress = async (cep) => {
    console.log(cep);
    toggleLoader();

    cepInput.blur();
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    const response = await fetch (apiUrl);
    const data = await response.json();
    console.log(data);

    //mostrar messagem de erro e resetar o formulário
    if(data.erro === "true") {
        if(!addressInput.hasAttribute("disabled")){
            toggleDisabled();
        }

        addressForm.reset();
        toggleLoader();
        //Mostrar mensagem
        toggleMessage("CEP inválido, tente novamente!")
        return;
    }

    if(addressInput.value === ""){
        toggleDisabled();
    }
    

    addressInput.value = data.logradouro
    cityInput.value = data.localidade
    neighborhoodInput.value = data.bairro
    regionInput.value = data.uf

    toggleLoader();
};

// adicionar ou remover atributos desativados
const toggleDisabled = () => {
    if(regionInput.hasAttribute("disabled")){
        formInputs.forEach((input) => {
            input.removeAttribute("disabled")
        })
    }else{
        formInputs.forEach((input)=>
        {
            input.setAttribute("disabled", "disabled");
        })
    }
};


//Mostrar ou ocultar o leitor
const toggleLoader = () => {
    const loaderElement = document.querySelector("#loader")

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

//mostrar ou ocultar mensagem
const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message")
    const messageElementText = document.querySelector("#message p")
    messageElementText.innerText = msg
    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};

//Fechar mensagem do modal
closeButton.addEventListener("click", () => toggleMessage());

//salvar endereço
addressForm.addEventListener("submit", (e) =>{
    e.preventDefault()
    toggleLoader()
    setTimeout(()=>{
        toggleLoader();
        toggleMessage("Endereço salvo com sucesso!");
        addressForm.reset();
        toggleDisabled();
    }, 150)
});