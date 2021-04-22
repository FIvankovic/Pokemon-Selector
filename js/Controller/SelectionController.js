/**
 * SelectionController class
 * Responsible for the Pokemon Selector portion of inde.html
 * Does both the View and Controller responsibilities (it shouldn't, but it is what it is)
 * 
 * Changes are made to the select-img and imageSelectDiv when the user interacts with the 3 dropdowns
 * Change is reflected within the div and with the img
 * 
 * The reset and submit button gain their functionality in this class
 * 
 * @author Filipa Ivankovic
 */
export class SelectionController {
    /**
     * constructor
     * The dropdowns, image div, img and buttons are taken from the index.html to be manipulated here (again shouldn'be here, but...)
     * Three booleans are created to track the user's selection process and to prevent the user from submitting and accessing the form.html page with a blank & invalid selection
     * @param {model} -  the pokemonData.js is being used by the SelectionController class to extract the images for displaying
     */
    constructor(model) {
        this.pokemonData = model; //pokemonData.js Model

        //The Dropdown forms - the options for the colorDropdown and backgroundDropdown will be generated into them by JavaScript code
        this.pokemonDropdown = document.getElementById('pokemonDropdown');
        this.colorDropdown = document.getElementById('colorDropdown');
        this.backgroundDropdown = document.getElementById('backgroundDropdown');

        //Adding Event Listeners to selects
        this.pokemonDropdown.addEventListener("change", this.pokemonChange);
        this.colorDropdown.addEventListener("change", this.colorChange);
        this.backgroundDropdown.addEventListener("change", this.backgroundChange);

        //The two html elements which will be manipulated
        this.pokemonImg = document.getElementById('select-img');
        this.backgroundDiv = document.getElementById('imageSelectDiv');

        //Submit button that stores the data of the user selected options and sends the user to the form.html page
        this.submitButton = document.getElementById('confirmSelect-button');
        this.submitButton.addEventListener("click", this.submitSelection);

        this.resetButton = document.getElementById('reset-Button');
        this.resetButton.addEventListener("click", this.resetSelection);

        //Booleans that are used to track the user selection, when pressing the submission button
        this.pokemonChosen = false;
        this.backgroudChosen = false;
        this.colorChosen = false;

        //Display the Pokemon from the pokemonData
        this.generateOptions("pokemon");
    }



    /**
     * pokemonChange
     * Changes the image to the appropriate Pokemon image
     * resetSelection method is called to reset all the other dropdowns, as each Pokemon has their unique colors and backgrounds
     * The pokemonChosen boolean is set to true
     * 
     * @return {undefined}
     */
    pokemonChange = () => {
        this.resetSelection();
        console.log(this.getPokemonName());
        let newImg = this.pokemonData[`${this.getPokemonName()}`].color1;
        this.generateOptions("color");
        this.pokemonImg.src = `${newImg}`;
        this.pokemonChosen = true;
    }
    /**
     * colorChange
     * Changes the color of the image to the user's selected one
     * Resets the backgroundDropdown, before filling it out with the appropriate <option> by calling the generateOptions() method
     * The colorChosen boolean is set to true
     * 
     * @return {undefined}
     */
    colorChange = () => {
        let newImg = this.pokemonData[`${this.getPokemonName()}`][`${this.getColor()}`];
        this.backgroundDropdown.innerHTML = "";
        this.generateOptions("background");
        this.pokemonImg.src = `${newImg}`;
        this.colorChosen = true;
    }

    /**
     * backgroundChange
     * Changes the background of the backgroundDiv when the user has made a change to the backgroundDropdown
     * The background is changed through stying
     * The backgroundChosen boolean switch is set to true
     * 
     * @return {undefined}
     */
    backgroundChange = () => {
        let currentBg = this.getBackground();
        let newBg = this.pokemonData[`${this.getPokemonName()}`][`${this.getBackground()}`];
        this.backgroundDiv.style.border = "border: 2px solid black";
        this.backgroundDiv.style.backgroundImage = `url(${newBg})`;
        this.backgroudChosen = true;
    }

    /**
     * generateOptions
     * Responsible for the determining for which dropdown to generate the content extracted from the pokemonData
     * The createAnOption() method is called the appropriate number of times via looping
     * The amount of times the loop loops is determined by the number of key elements within the pokemonData object
     * 
     * @param {choice} - determines whether to generate the color or background options for the user made selection
     * @return {undefined}
     */
    generateOptions = (choice) => {
        let numOfPokemon = Object.keys(this.pokemonData).length;
        for (let i = 1; i <= numOfPokemon; i++) {
            //Pokemon
            if (choice === "pokemon") {
                let pokemonName = Object.keys(this.pokemonData)[`${i - 1}`];
                this.createAnOption(pokemonName, choice);
            }
            //If color
            else if (choice === "color") {
                let adding = this.pokemonData[`${this.getPokemonName()}`][`${'color'}` + `${i}`];
                //Fail prevention, if the data is undefined or blank
                if (adding === undefined) {
                    continue;
                }
                let text = `color` + `${i}`;
                this.createAnOption(text, choice);
            }
            else if (choice === "background") {
                let adding = this.pokemonData[`${this.getPokemonName()}`][`${'background'}` + `${i}`];//Get the appropriate background from pokemonData.js
                //Fail prevention, if the data is undefined or blank
                if (adding === undefined) {
                    continue;
                }
                let text = `background` + `${i}`;
                this.createAnOption(text, choice);
            }

        }
    }
    /**
     * createOption
     * Creates the option element, while adding the appropriate text and value
     * A switch case is used to determine whether the options will be displayed in the pokemonDropdow, colorDropdown, or backgroundDropdown
     * Called in the generateOptions method
     * 
     * @param {type} type - determines the value and text which will be put into the option
     * @param {choice} choice - determines for which the dropdown the option is meant for
     */
    createAnOption = (type, choice) => {
        let option = document.createElement('option');
        option.text = `${type.charAt(0).toUpperCase() + type.slice(1)}`;
        option.value = `${type}`;

        switch (choice) {
            case "pokemon":
                this.pokemonDropdown.appendChild(option);
                break;
            case "color":
                this.colorDropdown.appendChild(option);
                break;
            case "background":
                this.backgroundDropdown.appendChild(option);
                break;
            default:
                alert("Unable to append option to dropdown");
                break;
        }
    }

    /**
     * resetSelection
     * Resets the user's selection. Removes the available options from the color & backgroundDropdown. Removes the image of the Pokemon
     * Resets the boolean selection trackers to false
     * @return {undefined}
     */
    resetSelection = () => {
        //Set all selection to false to prevent incomplete submission
        this.pokemonChosen = false;
        this.backgroudChosen = false;
        this.colorChosen = false;
        //Remove all options
        this.colorDropdown.innerHTML = "";
        this.backgroundDropdown.innerHTML = "";
        this.backgroundDiv.style.backgroundImage = "none";//remove background
        this.pokemonImg.src = "";//Remove img
    }

    /**
     * submitSelection
     * Pressing the submit button confirms the user selection
     * If the user has chosen a Pokemon, color and background, this function will save the user's choices into the local webstorage
     * After storing the user's choices, the user is sent to the form.html which contains the form for filling out, and ill be able to see their chosen options and img with background
     * 
     * @return {undefined}
     */
    submitSelection = () => {
        if (this.pokemonChosen === false) {
            this.displayAlertMsg("Pokémon");
        }
        else if (this.colorChosen === false) {
            this.displayAlertMsg("Color");
        }
        else if (this.backgroudChosen === false) {
            this.displayAlertMsg("Background");
        }
        else {
            localStorage.setItem('pokemon', this.getPokemonName());
            localStorage.setItem('color', this.getColor());
            localStorage.setItem('background', this.getBackground());
            window.location.href = "form.html";
        }
    }

    /**
     * displayAlertMsg
     * Display an appropriate alert message if the user tries to submit without making all the required choices for the selection
     * This method is caalled when the submission button is pressed
     * 
     * @param {msg} - msg will either be "Pokemon", "Color" or "Background", depending on what is missing from the selection
     * @return {undefined}
     */
    displayAlertMsg = (msg) => {
        alert(`A ${msg} has not been selected.`);
    }

    /**
     * getPokemonName
     * Gets the currently selected Pokemon from the pokemon dropdown select
     * @return {pokemon} - currently selected pokemon in the pokemonDropdown select
     */
    getPokemonName = () => {
        let pokemon = this.pokemonDropdown.value;
        return pokemon;
    }

    /**
     * getColor
     * Gets the currently selected color variation for the Pokemon from the color dropdown select
     * @return {color} - currently selected color variation in the colorDropdown select
     */
    getColor = () => {
        let color = this.colorDropdown.value;
        return color;
    }

    /**
     * getBackground
     * Gets the currently selected background from the background dropdown select
     * @return {background} - currently selected pokemon in the backgroundDropdown select
     */
    getBackground = () => {
        let background = this.backgroundDropdown.value;
        return background;
    }

}


