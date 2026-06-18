const ApiBase = 'https://pokeapi.co/api/v2/pokemon/' ;



let formulario = document.getElementById('formularioPesquisa');

formulario.addEventListener('submit', async function (evento ) {

    evento.preventDefault();
    
    let NomePokemon = document.getElementById('barraPesquisa').value.toLowerCase() ;
   
    let linkApiName = ApiBase + NomePokemon;

    let resposta = await fetch(linkApiName);

    let dados = await resposta.json();

    console.log(dados);    
    exibirNoTopo(dados);
});

const btnInformação = document.getElementById('btnMostrar_info');
const caixa_informações = document.getElementById('PokeInfo')

btnInformação.addEventListener('click', function(){

 if( caixa_informações.style.display === 'none' || caixa_informações.style.display === '') {

    caixa_informações.style.display = 'block';
    btnInformação.textContent = 'ocultar informações';
 }
    else {
        caixa_informações.style.display = 'none';
        btnInformação.textContent = 'mostrar informações';
    }


})
let limiteAtual = 30;
let offsetAtual = 0;
async function carregar_galeria() {
    const linkGaleria = `https://pokeapi.co/api/v2/pokemon?limit=${limiteAtual}&offset=${offsetAtual}`;
  
    const localGaleria = document.getElementById('localGaleria');

    const buscarPokemon = await fetch(linkGaleria);
    const dadosPokemons = await buscarPokemon.json();
    const listaPokemons = dadosPokemons.results;
    const dadosBrutos = listaPokemons.map(pokemon=> fetch(pokemon.url));
    const promesasDosDados = await Promise.all(dadosBrutos);   
    const dadosPromesas = promesasDosDados.map(resultados => resultados.json());
    const dadosFinais = await Promise.all(dadosPromesas);
    console.log(dadosFinais);

  

    fazer_catão(dadosFinais,localGaleria);

 
    
}


function fazer_catão(dados,localNaTela){

    dados.forEach(pokemon => {

        
    let cartao = document.createElement('div');
    cartao.className = 'cartaDoPokemon';

    let nome = document.createElement('h3');
    nome.textContent = pokemon.name;

    let imagem = document.createElement('img');
    imagem.src = pokemon.sprites.front_default;
    imagem.alt = "imagem do pokemon " + nome;

    

    let btnVerMais = document.createElement('button')
    btnVerMais.type = 'button';
    btnVerMais.textContent = 'ver informações';
    btnVerMais.addEventListener('click', function(){
        exibirNoTopo(pokemon);
    });

    cartao.appendChild(nome);
    cartao.appendChild(imagem);
    cartao.appendChild(btnVerMais);
    localNaTela.appendChild(cartao);

        console.log();
    });

}
carregar_galeria();

const botaoCarregarMais = document.getElementById('btnParaCarregar');
botaoCarregarMais.addEventListener('click',function(){

    offsetAtual = offsetAtual + limiteAtual;

    limiteAtual =  6

    carregar_galeria();


});
function exibirNoTopo(pokemon){
     // gerar nome
    const nomePoke = document.getElementById('nomePoke');

    nomePoke.textContent = "";

    let nomePoke_Api = document.createElement('h3');

    nomePoke_Api.textContent = `${pokemon.name}`;


    nomePoke.appendChild(nomePoke_Api);

    let tipo_pokemon = pokemon.types.map(tipo => tipo.type.name).join(" -- ");
    let habilidade_pokemon = pokemon.abilities.map(habilidade => habilidade.ability.name).join(" -- ");
   const informações_pokemon = [

    {chave: "nome:", valor: pokemon.name},
    {chave: "ID:", valor: pokemon.id},
    {chave: "tipo elemental:", valor: tipo_pokemon},
    {chave: "altura:", valor: (pokemon.height / 10) + " m"} ,
    {chave: "peso:", valor: pokemon.weight / 10 + "Kg"} ,
    {chave: "habilidades:", valor: habilidade_pokemon}


   ] 


    // gerar imagem
    const imagePoke = document.getElementById('imagePoke');

    imagePoke.innerHTML = "";


    let imagePoke_Api = document.createElement('img');


    imagePoke_Api.src = `${pokemon.sprites.front_default}`;

    imagePoke_Api.alt = "imagem do pokemon " + nomePoke


    imagePoke.appendChild(imagePoke_Api);

    // gerar informações
    const lista_informacoes = document.getElementById('PokeInfo');

    lista_informacoes.innerHTML = "";

    for (let i = 0;  i < informações_pokemon.length ; i++) {

        let info_create = document.createElement('li')

        info_create.innerHTML = `${informações_pokemon[i].chave} ${informações_pokemon[i].valor}`

        lista_informacoes.appendChild(info_create);
        
        
    }

     btnInformação.style.display = 'block';

     caixa_informações.style.display = 'none';
    
     btnInformação.textContent = 'mostrar informações';

     const secaoTopo = document.getElementById('formularioPesquisa');
     secaoTopo.scrollIntoView({ behavior: 'smooth' });

};

