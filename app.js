const options = {
    method: 'GET',
    url: 'https://pokemon-api3.p.rapidapi.com/pokemon',
    params: { name: '<REQUIRED>' },
    headers: {
        'X-RapidAPI-Key': '01f39ed913mshc8e3be3baa5ca8fp11c6f7jsn7441d0cb87e2',
        'X-RapidAPI-Host': 'pokemon-api3.p.rapidapi.com'
    }
};



window.addEventListener('load', funcion);

var cont = 25;
var ultimo = 0;

function funcion() {
    cargarPokemon(cont);
    document.getElementById('anterior').addEventListener('click', anterior);
    document.getElementById('siguiente').addEventListener('click', siguiente);
    document.getElementById('enviar').addEventListener('click', enviar);

    fetch('https://pokeapi.co/api/v2/pokemon-species')
        .then(response => response.json())
        .then(data => {
            ultimo = data.count;
        })
}

function cargarPokemon(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, options)
        .then(response => response.json())
        .then(pokemon => {
            console.log(pokemon.name)
            document.getElementById('nombre').innerHTML = pokemon.name;
            console.log(pokemon.id);
            document.getElementById('id').innerHTML = pokemon.id;
            const ul = document.getElementById('tipos')
            ul.innerHTML = '';
            pokemon.types.forEach(element => {
                const li = document.createElement('li');
                li.innerHTML = element.type.name;
                ul.appendChild(li);

                console.log(element.type.name)
            });
            console.log(pokemon.sprites.front_default)
            const sprite = document.getElementById('sprite');
            sprite.setAttribute('src', pokemon.sprites.front_default);
        })

}

function anterior() {
    cont--;
    if (cont == 0) {
        cont = ultimo;
    }
    cargarPokemon(cont);
}

function siguiente() {
    cont++;
    if(cont>ultimo){
        cont=1;
    }
    cargarPokemon(cont);
}

function enviar(){
    cont = document.getElementById('numero').value;
    cargarPokemon(cont);
}