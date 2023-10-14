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
            // console.log(shiny);
            if (shiny) {
                sprite.setAttribute('src', pokemon.sprites.front_shiny);
            } else {
                sprite.setAttribute('src', pokemon.sprites.front_default);
            }

            // Resetear UL
            const ul = document.getElementById('tipos')
            ul.innerHTML = '';

            // Inicializacion de los tipos del pokemon
            let tiposPoke = [];
            for (let i = 0; i < pokemon.types.length; i++) {
                tiposPoke.push(pokemon.types[i].type.name);
            }





            // fetch('https://pokeapi.co/api/v2/type', options)
            //     .then(response => response.json())
            //     .then(type => {
            //         const tipos = type.results;
            //         for (let i = 0; i < tipos.length; i++) {
            //             if (card.classList.contains((tipos[i].name + "L"))) {
            //                 card.classList.remove(tipos[i].name + "L");
            //             }
            //         }

            //     });

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

            

            // switch (primerTipo) {
            //     case ('normal'):
            //         li.classList.add('normal');
            //         card.classList.add('normalL');
            //         flechaAnterior.classList.add('normal');
            //         flechaAnterior.classList.add('normalL');
            //         flechaSiguiente.classList.add('normal');
            //         flechaSiguiente.classList.add('normalL');
            //         break;

            //     case ('fighting'):
            //         li.classList.add('fighting');
            //         card.classList.add('fightingL');
            //         flechaAnterior.classList.add('fighting');
            //         flechaAnterior.classList.add('fightingL');
            //         flechaSiguiente.classList.add('fighting');
            //         flechaSiguiente.classList.add('fightingL');
            //         break;

            //     case ('flying'):
            //         li.classList.add('flying');
            //         card.classList.add('flyingL');
            //         flechaAnterior.classList.add('flying');
            //         flechaAnterior.classList.add('flyingL');
            //         flechaSiguiente.classList.add('flying');
            //         flechaSiguiente.classList.add('flyingL');
            //         break;

            //     case ('poison'):
            //         li.classList.add('poison');
            //         card.classList.add('poisonL');
            //         flechaAnterior.classList.add('poison');
            //         flechaAnterior.classList.add('poisonL');
            //         flechaSiguiente.classList.add('poison');
            //         flechaSiguiente.classList.add('poisonL');
            //         break;

            //     case ('ground'):
            //         li.classList.add('ground');
            //         card.classList.add('groundL');
            //         flechaAnterior.classList.add('ground');
            //         flechaAnterior.classList.add('groundL');
            //         flechaSiguiente.classList.add('ground');
            //         flechaSiguiente.classList.add('groundL');
            //         break;

            //     case ('rock'):
            //         li.classList.add('rock');
            //         card.classList.add('rockL');
            //         flechaAnterior.classList.add('rock');
            //         flechaAnterior.classList.add('rockL');
            //         flechaSiguiente.classList.add('rock');
            //         flechaSiguiente.classList.add('rockL');
            //         break;

            //     case ('bug'):
            //         li.classList.add('bug');
            //         card.classList.add('bugL');
            //         flechaAnterior.classList.add('bug');
            //         flechaAnterior.classList.add('bugL');
            //         flechaSiguiente.classList.add('bug');
            //         flechaSiguiente.classList.add('bugL');
            //         break;

            //     case ('ghost'):
            //         li.classList.add('ghost');
            //         card.classList.add('ghostL');
            //         flechaAnterior.classList.add('ghost');
            //         flechaAnterior.classList.add('ghostL');
            //         flechaSiguiente.classList.add('ghost');
            //         flechaSiguiente.classList.add('ghostL');
            //         break;

            //     case ('steel'):
            //         li.classList.add('steel');
            //         card.classList.add('steelL');
            //         flechaAnterior.classList.add('steel');
            //         flechaAnterior.classList.add('steelL');
            //         flechaSiguiente.classList.add('steel');
            //         flechaSiguiente.classList.add('steelL');
            //         break;

            //     case ('fire'):
            //         li.classList.add('fire');
            //         card.classList.add('fireL');
            //         flechaAnterior.classList.add('fire');
            //         flechaAnterior.classList.add('fireL');
            //         flechaSiguiente.classList.add('fire');
            //         flechaSiguiente.classList.add('fireL');
            //         break;

            //     case ('water'):
            //         li.classList.add('water');
            //         card.classList.add('waterL');
            //         flechaAnterior.classList.add('water');
            //         flechaAnterior.classList.add('waterL');
            //         flechaSiguiente.classList.add('water');
            //         flechaSiguiente.classList.add('waterL');
            //         break;

            //     case ('grass'):
            //         li.classList.add('grass');
            //         card.classList.add('grassL');
            //         flechaAnterior.classList.add('grass');
            //         flechaAnterior.classList.add('grassL');
            //         flechaSiguiente.classList.add('grass');
            //         flechaSiguiente.classList.add('grassL');
            //         break;

            //     case ('electric'):
            //         li.classList.add('electric');
            //         card.classList.add('electricL');
            //         flechaAnterior.classList.add('electric');
            //         flechaAnterior.classList.add('electricL');
            //         flechaSiguiente.classList.add('electric');
            //         flechaSiguiente.classList.add('electricL');
            //         break;

            //     case ('psychic'):
            //         li.classList.add('psychic');
            //         card.classList.add('psychicL');
            //         flechaAnterior.classList.add('psychic');
            //         flechaAnterior.classList.add('psychicL');
            //         flechaSiguiente.classList.add('psychic');
            //         flechaSiguiente.classList.add('psychicL');
            //         break;

            //     case ('ice'):
            //         li.classList.add('ice');
            //         card.classList.add('iceL');
            //         flechaAnterior.classList.add('ice');
            //         flechaAnterior.classList.add('iceL');
            //         flechaSiguiente.classList.add('ice');
            //         flechaSiguiente.classList.add('iceL');
            //         break;

            //     case ('dragon'):
            //         li.classList.add('dragon');
            //         card.classList.add('dragonL');
            //         flechaAnterior.classList.add('dragon');
            //         flechaAnterior.classList.add('dragonL');
            //         flechaSiguiente.classList.add('dragon');
            //         flechaSiguiente.classList.add('dragonL');
            //         break;

            //     case ('dark'):
            //         li.classList.add('dark');
            //         card.classList.add('darkL');
            //         flechaAnterior.classList.add('dark');
            //         flechaAnterior.classList.add('darkL');
            //         flechaSiguiente.classList.add('dark');
            //         flechaSiguiente.classList.add('darkL');
            //         break;

            //     case ('fairy'):
            //         li.classList.add('fairy');
            //         card.classList.add('fairyL');
            //         flechaAnterior.classList.add('fairy');
            //         flechaAnterior.classList.add('fairyL');
            //         flechaSiguiente.classList.add('fairy');
            //         flechaSiguiente.classList.add('fairyL');
            //         break;

            //     case ('unknown'):
            //         li.classList.add('bg-emerald-700');
            //         break;

            //     case ('shadow'):
            //         li.classList.add('bg-gray-950');
            //         break;

            // }



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
            // switch (segundoTipo) {
            //     case ('normal'):
            //         li2.classList.add('normal');
            //         break;

            //     case ('fighting'):
            //         li2.classList.add('fighting');
            //         break;

            //     case ('flying'):
            //         li2.classList.add('flying');
            //         break;

            //     case ('poison'):
            //         li2.classList.add('poison');
            //         break;

            //     case ('ground'):
            //         li2.classList.add('ground');
            //         break;

            //     case ('rock'):
            //         li2.classList.add('rock');
            //         break;

            //     case ('bug'):
            //         li2.classList.add('bug');
            //         break;

            //     case ('ghost'):
            //         li2.classList.add('ghost');
            //         break;

            //     case ('steel'):
            //         li2.classList.add('steel');
            //         break;

            //     case ('fire'):
            //         li2.classList.add('fire');
            //         break;

            //     case ('water'):
            //         li2.classList.add('water');
            //         break;

            //     case ('grass'):
            //         li2.classList.add('grass');
            //         break;

            //     case ('electric'):
            //         li2.classList.add('electric');
            //         break;

            //     case ('psychic'):
            //         li2.classList.add('psychic');
            //         break;

            //     case ('ice'):
            //         li2.classList.add('ice');
            //         break;

            //     case ('dragon'):
            //         li2.classList.add('dragon');
            //         break;

            //     case ('dark'):
            //         li2.classList.add('dark');
            //         break;

            //     case ('fairy'):
            //         li2.classList.add('fairy');
            //         break;

            //     case ('unknown'):
            //         li2.classList.add('bg-emerald-700');
            //         break;

            //     case ('shadow'):
            //         li2.classList.add('bg-gray-950');
            //         break;

            // }






            ul.appendChild(li);
            if (tiposPoke.length > 1) {
                ul.appendChild(li2);
            }

            // console.log(element.type.name)
            // });



            // ID
            let id = "#";
            if (pokemon.id > 0 && pokemon.id < 10) {
                id += '00';
                id += pokemon.id;
            } else if (pokemon.id >= 10 && pokemon.id < 100) {
                id += '0';
                id += pokemon.id;
            } else {
                id += pokemon.id;
            }
            document.getElementById('id').innerHTML = id;
            // console.log(pokemon.id);


            // NOMBRE
            document.getElementById('nombre').innerHTML = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            // console.log(pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1));




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