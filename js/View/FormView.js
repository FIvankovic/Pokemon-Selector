/**
 * FormView class
 * Responsible for reflecting if the form input values have been either valid or invalid
 *  Also display the selected options for the Pokemon Selector in a reserved div made for specifically that chosen Pokemon and background
 * The data for the selection is retrived from the local Web Storage
 * @author Filipa Ivankovic
 */
export class FormView{
    /**
     * 
     * @param {model} model 
     * @param {controller} controller - The FormValidator.js
     */
    constructor(model){
        this.pokemonData = model;
    }

    /**
     * updateInput
     * Updates the appropriate input field with the appropriate success/error class
     * Display the error if invalid in the "small" element
     * Parameters are received from the FormValidator.js class
     * @param {input} input - the input field which will be updated
     * @param {message} message - the error message if applicable (is invalid)
     * @param {className} className - the .css class that will reflect whether the input was valid/invalid
     * @return {undefined}
     */
    updateInput = (input, message,className) =>{
        const formControl = input.parentElement; //.form-control
        const small = formControl.querySelector('small');
        
        small.innerText = message;
        formControl.className = className;
    }

    /**
     * updateInputValue
     * If there is preexisiting localStorage data that is valid, it will be displayed on loading the form.html page
     * The inputs will be blank if its empty otherwise
     * 
     * @param {storedName} storedName - the name from the localStorage to be displayed in the input field for it
     * @param {storedPassword} storedPassword - the password from the localStorage to be displayed in the input field for it
     * @param {storedRepeatPassword} storedRepeatPassword - the repeat Password from the localStorage to be displayed in the input field for it
     * @param {storedEmail} storedEmail - the name from the email to be displayed in the input field for it
     */
    updateInputValue = (storedName, storedPassword, storedRepeatPassword, storedEmail) =>{
        document.getElementById('name').value = storedName;
        document.getElementById('password').value = storedPassword;
        document.getElementById('repeatPassword').value = storedRepeatPassword;
        document.getElementById('email').value = storedEmail;
    }

    /**
     * showSelectedPokemon
     * Displays the selected Pokemon from the Pokemon Selector in index.html
     * 
     * @return {undefined}
     */
    showSelectedPokemon(){
        const div = document.getElementById('chosenPokemonDiv');
        const selectedOptionsDiv = document.getElementById('selectedOptions');

        //Extract data from localStorage
        let pokemonName = localStorage.getItem('pokemon');
        let color = localStorage.getItem('color');
        let background = localStorage.getItem('background');

        //Paragraph which will display the user
        let p = document.createElement('p');
        let text = document.createTextNode(`Selection - Pokemon: ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)} | Color variant: ${color} | Background: ${background}`);
        p.appendChild(text);

        //Create the Img
        let pokemon = document.createElement('img');
        let imgSource = this.pokemonData[`${pokemonName}`][`${color}`];
        pokemon.src = imgSource;
        pokemon.alt = `Image of ${pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}`;
        pokemon.setAttribute("id", "chosenPokemon");
        pokemon.classList.add('img-fluid');

        //Display the selected background
        let newBg = this.pokemonData[`${pokemonName}`][`${background}`];
        div.style.backgroundImage = `url(${newBg})`;

        //Appending
        selectedOptionsDiv.appendChild(p);
        div.appendChild(pokemon);
    }
}