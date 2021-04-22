/**
 * PokedexView class
 * The class responsible for displaying the data retrieved by the PokedexFetcher.js from the Pokemon API
 * 
 * @author Filipa Ivankovic
 */
export class PokedexView {
    /**
     * @param {model} model - typeColors data, a bunch of hex color values used to style the Pokemon card divs
     */
    constructor(model) {
        this.typeColors = model;
    }

    /**
     * createPokemon 
     * Create the elements and div necessary to display the data fromt the Pokemon API
     * The typeColors is used to color the cards according to each "typing" of a Pokemon
     * 
     * @param {pokemon} pokemon - the pokemon object retrieved from the Pokemon API
     */
    createPokemon = (pokemon) => {
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('card'); //Adds 'card' class to each individual Pokemon div
        pokemonEl.classList.add('img-fluid'); //Adds 'card' class to each individual Pokemon div

        const pokemonTypes = pokemon.types.map(type => type.type.name);//Map over the arrays of types and take only the name
        const type = pokemon.types[0].type.name; //The first typing
        let backgroundColor = this.typeColors[type];//The background color which will be applied to each pokemon div
        pokemonEl.style.backgroundColor = backgroundColor;
        pokemonEl.style.border = `1px solid rgb(41, 41, 41)`;

        const pokemonAbilities = pokemon.abilities.map(abilities => abilities.ability.name);
        const pokemonArtwork = pokemon.sprites.other['official-artwork'].front_default;//Image

        //The stuff that will be contained in the Pokemon div element
        const pokeInnerHTML = ` 
            <div class="card-upperLayer">
                <p>
                    <span class="pokemonPokedexNum">#${pokemon.id.toString().padStart(3, '0')}</span>
                    <span class="text-align-right">
                        <a class="pokedexLink" href="https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}">Bulbapedia</a>
                    </span>
                </p>
            </div>
                <div class="text-align-center pokemonArtwork-container">
                    <img class="pokemon-artwork" src="${pokemonArtwork}" alt="${pokemon.name} Image">
                </div>
                <div class="pokemon-info">
                    <h3 class="capitalize underline">${pokemon.name}</h3>
                    <div class="line-height-20px">
                    <p class="capitalize">Typing: ${pokemonTypes}</p>
                    <p class="capitalize">Abilities: ${pokemonAbilities}</p>
                    </div>
                </div>
        `;

        //Appending 
        pokemonEl.innerHTML = pokeInnerHTML;
        pokedex.appendChild(pokemonEl);
    }
}