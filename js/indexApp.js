/**
 * indexApp.js
 * Initializes the .js for the index.html page
 * 
 * @import {SelectionController} - responsible for the interactive Pokemon Selector
 * @import {pokemonData} - the database of the Pokemons that will be displayed on the Pokemon Selector section of the page
 * 
 * @author Filipa Ivanković
 */
import {SelectionController}          from './Controller/SelectionController.js';
import {pokemonData}                  from './Model/pokemonData.js';

const app = new SelectionController(pokemonData);