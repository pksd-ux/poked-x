const ApiBase = 'https://pokeapi.co/api/v2/pokemon/' ;


let formulario = document.getElementById('formularioPesquisa');

formulario.addEventListener('submit', async function (evento ) {

    evento.preventDefault();
    
    let NomePokemon = document.getElementById('barraPesquisa').value.toLowerCase() ;
   
    let linkApiName = ApiBase + NomePokemon;

    let resposta = await fetch(linkApiName);

    let dados = await resposta.json();

    console.log(dados);    

    // gerar nome
    const nomePoke = document.getElementById('nomePoke');

    nomePoke.textContent = "";

    let nomePoke_Api = document.createElement('h3');

    nomePoke_Api.textContent = `${dados.name}`;


    nomePoke.appendChild(nomePoke_Api);

    let tipo_pokemon = dados.types.map(tipo => tipo.type.name).join(" -- ");
    let habilidade_pokemon = dados.abilities.map(habilidade => habilidade.ability.name).join(" -- ");
   const informações_pokemon = [

    {chave: "nome:", valor: dados.name},
    {chave: "ID:", valor: dados.id},
    {chave: "tipo_elemental:", valor: tipo_pokemon},
    {chave: "altura:", valor: (dados.height / 10) + " m"} ,
    {chave: "peso:", valor: dados.weight / 10 + "Kg"} ,
    {chave: "habilidades:", valor: habilidade_pokemon}


   ] 


    // gerar imagem
    const imagePoke = document.getElementById('imagePoke');

    imagePoke.innerHTML = "";


    let imagePoke_Api = document.createElement('img');


    imagePoke_Api.src = `${dados.sprites.front_default}`;


    imagePoke.appendChild(imagePoke_Api);

    // gerar status
    const lista_informacoes = document.getElementById('PokeInfo');

    lista_informacoes.innerHTML = "";

    for (let i = 0;  i < informações_pokemon.length ; i++) {

        let info_create = document.createElement('li')

        info_create.innerHTML = `${informações_pokemon[i].chave} ${informações_pokemon[i].valor}`

        lista_informacoes.appendChild(info_create);



        
        
    }

    

    

});

let galeria = document.getElementById('galery');
galeria.addEventListener('submit', async function (showM) {

    showM.preventDefault();

    
})




       
    
   
    


    carregarImgs();