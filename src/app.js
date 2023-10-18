window.addEventListener('load', funcion);

const options = {
    method: 'GET',
    url: 'https://pokemon-api3.p.rapidapi.com/pokemon',
    params: { name: '<REQUIRED>' },
    headers: {
        'X-RapidAPI-Key': '01f39ed913mshc8e3be3baa5ca8fp11c6f7jsn7441d0cb87e2',
        'X-RapidAPI-Host': 'pokemon-api3.p.rapidapi.com'
    }
};

var cont = 25;
var ultimo = 0;

fetch('https://pokeapi.co/api/v2/pokemon-species')
    .then(response => response.json())
    .then(data => {
        ultimo = data.count;
    })

var tipos = []

fetch('https://pokeapi.co/api/v2/type', options)
    .then(response => response.json())
    .then(type => {
        var results = type.results;

        for (let i = 0; i < results.length; i++) {
            tipos.push(results[i].name);
        }
    });

function funcion() {
    cargarPokemon(cont);
    document.getElementById('anterior').addEventListener('click', anterior);
    document.getElementById('siguiente').addEventListener('click', siguiente);
    document.getElementById('buscar').addEventListener('click', buscar);
}



function cargarPokemon(pokemon) {
    const card = document.getElementById('card');
    const flechaAnterior = document.getElementById('anterior');
    const flechaSiguiente = document.getElementById('siguiente');
    const buscar = document.getElementById('buscar');
    const ul = document.getElementById('tipos');
    ul.innerHTML = '';
    const nombre = document.getElementById('nombre');
    const id = document.getElementById('id');


    for (let i = 0; i < tipos.length; i++) {
        flechaAnterior.classList.remove((`${tipos[i]}L`));
        flechaAnterior.classList.remove((tipos[i]));
        flechaSiguiente.classList.remove((`${tipos[i]}L`));
        flechaSiguiente.classList.remove((tipos[i]));
        card.classList.remove((`${tipos[i]}L`));
        card.classList.remove((tipos[i]));
        buscar.classList.remove((`${tipos[i]}L`));
        buscar.classList.remove((tipos[i]));
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, options)
        .then(response => response.json())
        .then(pokemon => {

            // SPRITES
            const sprite = document.getElementById('sprite');
            let shiny = document.getElementById('shiny').checked;
            if (shiny) {
                sprite.setAttribute('src', pokemon.sprites.front_shiny);
            } else {
                sprite.setAttribute('src', pokemon.sprites.front_default);
            }

            // Inicializacion de los tipos del pokemon
            let tiposPoke = [];
            for (let i = 0; i < pokemon.types.length; i++) {
                tiposPoke.push(pokemon.types[i].type.name);
            }

            const primerTipo = tiposPoke[0];
            const li = document.createElement('li');
            li.innerHTML = primerTipo;
            li.classList.add('text-2xl');
            li.classList.add('mx-4');
            li.classList.add('px-4');
            li.classList.add('rounded-full');

            const tipoClases = {
                normal: 'normal',
                fighting: 'fighting',
                flying: 'flying',
                poison: 'poison',
                ground: 'ground',
                rock: 'rock',
                bug: 'bug',
                ghost: 'ghost',
                steel: 'steel',
                fire: 'fire',
                water: 'water',
                grass: 'grass',
                electric: 'electric',
                psychic: 'psychic',
                ice: 'ice',
                dragon: 'dragon',
                dark: 'dark',
                fairy: 'fairy',
            };

            li.classList.add(tipoClases[primerTipo]);
            card.classList.add(`${tipoClases[primerTipo]}L`);
            flechaAnterior.classList.add(tipoClases[primerTipo]);
            flechaAnterior.classList.add(`${tipoClases[primerTipo]}L`);
            flechaSiguiente.classList.add(tipoClases[primerTipo]);
            flechaSiguiente.classList.add(`${tipoClases[primerTipo]}L`);
            buscar.classList.add(tipoClases[primerTipo]);
            buscar.classList.add(`${tipoClases[primerTipo]}L`);

            if (tiposPoke.length > 1) {
                const segundoTipo = tiposPoke[1];
                var li2 = document.createElement('li');
                li2.innerHTML = segundoTipo;
                li2.classList.add('text-2xl');
                li2.classList.add('mx-4');
                li2.classList.add('px-4');
                li2.classList.add('rounded-full');
                li2.classList.add(tipoClases[segundoTipo]);
            }

            ul.appendChild(li);
            if (tiposPoke.length > 1) {
                ul.appendChild(li2);
            }

            // ID
            let idPokemon = "#";
            if (pokemon.id > 0 && pokemon.id < 10) {
                idPokemon += '00';
                idPokemon += pokemon.id;
            } else if (pokemon.id >= 10 && pokemon.id < 100) {
                idPokemon += '0';
                idPokemon += pokemon.id;
            } else {
                idPokemon += pokemon.id;
            }
            id.innerHTML = idPokemon;

            // NOMBRE
            nombre.innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            document.getElementById('numero').value = pokemon.id;
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
    if (cont > ultimo) {
        cont = 1;
    }
    cargarPokemon(cont);
}

function buscar() {
    cont = document.getElementById('numero').value;
    cargarPokemon(cont);
}