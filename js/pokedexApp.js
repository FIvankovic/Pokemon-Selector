/**
 * pokedexApp.js
 * Initiliazer .js for the pokedex.html which holds the API fetching and API data
 * 
 * @import - class which fetches the data from the Pokemon API
 * @import - class responsible for displaying the data from the Pokemon API onto the pokedex.html page
 * @import - data for a number of hex color that are used to color the background of the cards meant to display the pokemon from the API
 * 
 * 
 * @author Filipa Ivankovic
 */
import {PokedexFetcher} from "./Controller/PokedexFetcher.js";
import {PokedexView} from "./View/PokedexView.js";
import {typesColors} from "./External/typesColors.js"

const app = new PokedexFetcher(new PokedexView(typesColors));