const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreBtn');

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="showStats()">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit);

//Botão pra carregar mais pokemons
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit

    if(qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }
})


//abrir tela e mostrar stats dos pokemons
function showStats() {

    const pokemonItems = document.querySelectorAll('#pokemonList li');

    pokemonItems.forEach(item => {
        item.addEventListener('click', () => {
            let number = item.querySelector('.number').textContent;
            number = number.slice(1)
            const name = item.querySelector('.name').textContent;
            let type1 = item.querySelector('.types').children[0];
            let type2 = item.querySelector('.types').children[1];

            if(typeof(type1) == typeof(type2)) {
                type1 = type1.textContent;
                type2 = type2.textContent;
            }else {
                type1 = type1.textContent;
                type2 = "";
            }

            showDetailsPokemons(number)

            const showDetails = document.getElementById('separacao')

            showDetails.innerHTML = `
                <div id="statsResult" class="${type1}">
                    <i class="fa-solid fa-arrow-left-long setaVoltar" onclick="fecharStats()"></i>
                    <div class="titulo">
                        <h2 class="statsName">${name}</h2>
                        <span class="statsNumber">#${number}</span>
                    </div>
                    <ol class="types">
                        <li class="detailType ${type1}">${type1}</li>
                        <li class="detailType ${type2}">${type2}</li>
                    </ol>

                    <div id="imgStats">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="Bulbasaur">
                    </div>

                    <div class="select">
                        <div id="tabSelect">
                            <button class="tab" onclick="tabAbout()">About</button>
                            <button class="tab" onclick="tabBaseStats()">Base Stats</button>
                        </div>

                        <div id="detailsAbout">
                            <ol class="titleDetail">
                                <li class="titleDetailSpecs"><b>Species</b> <span class="valueOf">Grass</span></li>
                                <li class="titleDetailSpecs"><b>Height</b> <span class="valueOf">2'3.6* (0.70 cm)</span></li>
                                <li class="titleDetailSpecs"><b></b> <span class="valueOf">15.2 lbs (6.9kg)</span></li>
                                <li class="titleDetailSpecs"><b>Abilities</b> <span class="valueOf">Overgrow, Chlorophyl</span></li>
                                <li class="titleDetailSpecs"><b>Gender</b> <span class="valueOf">Male</span></li>
                            </ol>
                        </div>
                    </div>

                </div>
            `
            document.getElementById('statsResult').style.display = 'block'
        });
    });
}

//fechar tela dos stats dos pokemons
function fecharStats() {
    document.getElementById('statsResult').style.display = 'none'
}

//selecionar base stats
function tabBaseStats() {
    document.getElementById('detailsAbout').innerHTML = `
    <ol class="titleDetail">
        <li class="titleDetailSpecs"><b>HP</b> <span class="valueOf">45</span></li>
        <li class="titleDetailSpecs"><b>Attack</b> <span class="valueOf">60</span></li>
        <li class="titleDetailSpecs"><b>Defense</b> <span class="valueOf">48</span></li>
        <li class="titleDetailSpecs"><b>Sp. Atk</b> <span class="valueOf">65</span></li>
    </ol>
    `;
}

//selecionar About
function tabAbout() {
    document.getElementById('detailsAbout').innerHTML = `
    <ol class="titleDetail">
        <li class="titleDetailSpecs"><b>Species</b> <span class="valueOf">Grass</span></li>
        <li class="titleDetailSpecs"><b>Height</b> <span class="valueOf">2'3.6* (0.70 cm)</span></li>
        <li class="titleDetailSpecs"><b>Weight</b> <span class="valueOf">15.2 lbs (6.9kg)</span></li>
        <li class="titleDetailSpecs"><b>Abilities</b> <span class="valueOf">Overgrow, Chlorophyl</span></li>
        <li class="titleDetailSpecs"><b>Gender</b> <span class="valueOf">Male</span></li>
    </ol>
    `;
}