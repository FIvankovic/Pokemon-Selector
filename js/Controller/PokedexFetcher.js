/**
 * PokedexFetcher class
 * Responsible for getting the data of the Pokemon from the Pokemon API: https://pokeapi.co/api/v2/pokemon/
 * Retrieved data is sent to the PokedexView class, which styles it and appends it to the .html
 * 
 *  @author Filipa Ivankovic
 */
export class PokedexFetcher {
    /**
     * Constructor calls the fetchPokemon() function to start retrieveing the data
     * @param {*} pokedexView - the class responsible for displaying and styling the retrieved pokemonData
     */
    constructor(pokedexView) {
        this.pokedexView = pokedexView;
        this.fetchPokemon();
    }

    /**
     * fetchPokemon
     * Goes through the retrieved pokemon data from the API a set number of time by calling the getPokemon function
     * The for loop can go from 1 to 898. 898 being the currently total number of Pokemon in existence
     * Depending on this number it may take less or more to load each Pokemon image
     * 
     * @return {undefined}
     */
    fetchPokemon = async () => {
        const startingPokemon = 1;//Can't be lower than 1
        const finalPokemon = 898;//Max 898
        for (let i = startingPokemon; i <= finalPokemon; i++) {
            this.getPokemon(i);
        }
    }

    /**
     * getPokemon
     * Gets the Pokemon from the url
     * The function is called "i" number of times. The "i" also represents the id of the Pokemon and the number of Pokemon which will be displayed
     * Stored data is put into the "const pokemon" which is sent to the pokedexView through the createPokemon(pokemon) function
     * @return {undefined}
     */
    getPokemon = async (id) => {

        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        //console.log(pokemon);
        this.pokedexView.createPokemon(pokemon);
    }
}



