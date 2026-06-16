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
    let respostaGaleria = await fetch(linkGaleria);
    let DadosGaleria = await respostaGaleria.json();
    let listaPokemons = DadosGaleria.results;
    const localGaleria = document.getElementById('localGaleria');

   

    for (let i = 0; i < listaPokemons.length; i++) {

        let pokemonsGaleria = listaPokemons[i];
        let resposta_detalhes = await fetch(pokemonsGaleria.url);
        let dados_completos = await resposta_detalhes.json();

        fazer_catão(dados_completos,localGaleria);
       
        
    }
    
}


function fazer_catão(dados,localNaTela){

    let cartao = document.createElement('div');
    cartao.className = 'cartaDoPokemon';

    let nome = document.createElement('h3');
    nome.textContent = dados.name;

    let imagem = document.createElement('img');
    imagem.src = dados.sprites.front_default;
    imagem.alt = "imagem do pokemon " + nome;

    

    let btnVerMais = document.createElement('button')
    btnVerMais.type = 'button';
    btnVerMais.textContent = 'ver informações';
    btnVerMais.addEventListener('click', function(){
        exibirNoTopo(dados);
    });

    cartao.appendChild(nome);
    cartao.appendChild(imagem);
    cartao.appendChild(btnVerMais);
    localNaTela.appendChild(cartao);
}
carregar_galeria();

const botaoCarregarMais = document.getElementById('btnParaCarregar');
botaoCarregarMais.addEventListener('click',function(){

    offsetAtual = offsetAtual + limiteAtual;

    limiteAtual =  5

    carregar_galeria();


});
function exibirNoTopo(dados){
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

