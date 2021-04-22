/**
 * formApp.js
 * Initializes the .js for the index.html page
 * 
 * @import {FormValidator} - responsible for validating the form for the user inputs: name, password, repeatPassword and email
 * @import {pokemonData} - the database of the Pokemons that will be displayed on the Pokemon Selector section of the page
 * @import {FormView} - responsible updating the forms on correct/incorrect states, and displays the the user selected Pokemon element from the localStorage
 * 
 * @author Filipa Ivanković
 */
import {FormValidator}              from './Controller/FormValidator.js';
import {FormView}                   from './View/FormView.js';
import {pokemonData}                from './Model/pokemonData.js';

const app = new FormValidator(new FormView(pokemonData));