const cep = document.getElementById ('cep');
const endereco = document.getElementById ('endereco');
const bairro = document.getElementById ('bairro');
const cidade = document.getElementById ('cidade');

cep.addEventListener('focusout', async () => {

    try {
        const onlyNumbers = /^[0-9]+$/;
        const cepValid = /^[0-9]{8}$/;
        
    if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)){
        throw {cep_error:'CEP invalido'}
    }


const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

if (!response.ok) {
    throw await response.json();  
}
const responseCep = await response.json();

endereco.value=responseCep.logradouro;
bairro.value=responseCep.bairro;
cidade.value=responseCep.localidade;

} catch (error) {
    if (error?.cep_error) {
        message.textContent = error.cep_error;

        setTimeout(() => {
            message.textContent = "";
        },5000);
    }
}
});


