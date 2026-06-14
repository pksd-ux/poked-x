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


    // gerar imagem
    const imagePoke = document.getElementById('imagePoke');

    imagePoke.innerHTML = "";


    let imagePoke_Api = document.createElement('img');


    imagePoke_Api.src = `${dados.sprites.front_default}`;


    imagePoke.appendChild(imagePoke_Api);

    // gerar status
    const lista_Stats = document.getElementById('PokeInfo');

    lista_Stats.innerHTML = "";

    for (let i = 0;  i < dados.stats.length ; i++) {

        let pegar_stats = dados.stats[i];

        let linha_Stats = document.createElement("p");

        linha_Stats.textContent = `${pegar_stats.stat.name}: ${pegar_stats.base_stat}`;

        lista_Stats.appendChild(linha_Stats);
        
        
    }

    

    

});

let galeria = document.getElementById('galery');
galeria.addEventListener('submit', async function (showM) {

    showM.preventDefault();

    
})




       
    
   
    


    carregarImgs();