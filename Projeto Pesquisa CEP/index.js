//Seleciona os elementos HTML
const cep = document.getElementById ('cep');
const endereco = document.getElementById ('endereco');
const bairro = document.getElementById ('bairro');
const cidade = document.getElementById ('cidade');
//Adiciona um focusout para quando o usuário sair do campo rodar a api
cep.addEventListener('focusout', async () => {

    try {
        const onlyNumbers = /^[0-9]+$/; //Verifica se o value contem apenas números
        const cepValid = /^[0-9]{8}$/; //Verifica se o value contem 8 números
        
    if (!onlyNumbers.test(cep.value) || !cepValid.test(cep.value)){
        throw {cep_error:'CEP invalido'}
    }

//Requisição para a api
const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

//Verifica se a resposta da api foi realizada corretamente
if (!response.ok) {
    throw await response.json();  
}
//Converte a resposta da api
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


