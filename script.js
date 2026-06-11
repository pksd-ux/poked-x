let formulario = document.getElementById('formularioPesquisa');
formulario.addEventListener('submit', async function (evento ) {

    evento.preventDefault();
    
    let NomePokemon = document.getElementById('barraPesquisa').value.toLowerCase()
   

    let linkApiname = 'https://pokeapi.co/api/v2/pokemon/' + NomePokemon;

    let resposta = await fetch(linkApiname);

    let dados = await resposta.json();

    console.log(dados);    

    document.getElementById('nomePoke').innerHTML = dados.name;

    document.getElementById('imagePoke').src = dados.sprites.front_default;

    

});

async function carregarImgs() {
    for (let i = 1; i < 41 ; i++) {
       
        let apilink = 'https://pokeapi.co/api/v2/pokemon/' + i;

        let resposta = await fetch(apilink);

        let dados = await resposta.json();

        const imagemBase = document.createElement('img');

        imagemBase.src = dados.sprites.front_default;
        imagemBase.alt = "Imagem do " + dados.name;
        
        
        
        const local = document.getElementById('localImagens');
        local.appendChild(imagemBase);
        
    }
   
    
}

    carregarImgs();