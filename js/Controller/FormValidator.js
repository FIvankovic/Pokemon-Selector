/**
 * FormValidator class
 * Controller class that is responsible for validatint the user inputs into the form
 * Valid inputs are stored into the localStorage, while on invalid inputs the user is notified with changes to the inputs and error messages
 * 
 * @author Filipa Ivankovic
 */
export class FormValidator{
    /**
     * constructor
     * Has a reference to the View class FormView.js
     * Calls the showSelectedPokemon() method from the FormView.js class to show the user's selected Pokemon and background
     * @param {validationView} validationView - the FormView.js View class that shows the data and selection of the user 
     */
    constructor(validationView){
        this.validationView = validationView;

        //Check if there are any values in the local Storage for the inputs and form
        this.checkLocalWebStorage();

        //Display the selected Pokemon from the local Storage
        this.validationView.showSelectedPokemon();
 
        //Add eventlistener to the button
        let button = document.getElementById("submit-button").addEventListener("click", this.checkInputs);
    }
    
    /**
     * checkInputs
     * The method responsible for checking the validity of each input field
     * Name musn't be blank to be vali
     * Email needs to be in an appropriate format (check isEmail() function) and not be left blank
     * Passwrod needs to at least 7 characters long and musn't be blank
     * RepeatPassword needs to be at least 7 characters long, not blank and must match EXACTLY with the password value
     * 
     * An errorCount variable keeps track of the errors to prevent the user submitting invalid values into the localStorage
     * 
     * @return {undefined}
     */
    checkInputs = () => {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let password = document.getElementById("password");
        let repeatPassword = document.getElementById("repeatPassword");
        
        let nameValue = name.value.trim();
        let passwordValue = password.value.trim();
        let emailValue = email.value.trim();
        let repeatPasswordValue = repeatPassword.value.trim();

        let errorCount = 0;
        
        //Check validity of the name
        if(nameValue === ''){
            //show error
            this.checkValidity(name, 'Name cannot be blank!', false);
            errorCount++;
        }
        else{
            this.checkValidity(name, '', true);
        }

        //Check validity of the password
        if(passwordValue === '') {
            this.checkValidity(password, 'Password cannot be blank!',false);
            errorCount++;
        }
        else if(passwordValue.length <= 7){
            this.checkValidity(password, 'Password must be longer or equal to 7 characters!',false);
            errorCount++;
        }
        else {
            this.checkValidity(password, '', true);
        }

        //Check validity of re-entered Password
        if(repeatPasswordValue === ''){
            this.checkValidity(repeatPassword, 'Password cannot be blank!',false);
            errorCount++;
        }
        else if(passwordValue !==  repeatPasswordValue){
            this.checkValidity(repeatPassword, 'Passwords do not match!',false);
            errorCount++;
        }
        else if(repeatPasswordValue === passwordValue && repeatPasswordValue !== ''){
            this.checkValidity(repeatPassword, '', true);
        }

        //Check validity of email
        if(emailValue === ''){
            this.checkValidity(email, 'Email cannot be blank!', false);
            errorCount++;
        }
        //Check if the email has the correct format
        else if(!this.isEmail(emailValue)){
            this.checkValidity(email, 'Not a valid email!', false);
            errorCount++;
        }
        else{
            this.checkValidity(email,'', true);
        }

        if(errorCount === 0){
            this.saveToLocalWebStorage(nameValue, passwordValue, repeatPasswordValue, emailValue);
        }
    }


    /**
     * isEmail
     * Email needs to have the appropriate format of "something@address.com", and can't contain illegal characters
     * @param {email} email - the email value that is passed into the method (a String)
     * @return {undefined}
     */
    isEmail = (email) =>{
       return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    /**
     * checkValidity
     *  After checking the input entered value, the change must be reflected in the form.html
     * This method sends the necessary message, validity and the input which is valid/invalid for the FormView, which will display it appropriately
     * 
     * @param {input} input - the input field that will be highlighted with either green/red for correct/invalid
     * @param {message} message - the message which will be displayed in the <small> reserved for the error message
     * @param {validity} validity - whether the input was valid/invalid
     * @return {undefined}
     */
    checkValidity = (input,message,validity) =>{
        if(!validity){
            this.validationView.updateInput(input, message, 'form-control error no-border');
        }
        else{
            this.validationView.updateInput(input, message, 'form-control success no-border');
        }
    }

    /**
     * saveToLocalWebStorage
     * 
     * Saves the valid user entered inputs into the local web storage
     * 
     * @param {name} name - valid name value that is save into the local web storage
     * @param {passwordValue} passwordValue - message - valid password value that is save into the local web storage
     * @param {repeatPasswordValue} repeatPasswordValue - valid repeat password value that is save into the local web storage
     * @param {emailValue} emailValue - valid email value that is save into the local web storage
     * @return {undefined}
     */
    saveToLocalWebStorage = (nameValue, passwordValue, repeatPasswordValue, emailValue) =>{
        localStorage.setItem('name', nameValue);
        localStorage.setItem('password', passwordValue);
        localStorage.setItem('repeatPassword', repeatPasswordValue);
        localStorage.setItem('email', emailValue);
    }

    /**
     * checkLocalWebStorage
     * Checks the Local Web Storage to see if the user has already some saved values that are valid and have been written beforehand into the inputs
     * Displays the values from the storage if they exist
     * 
     * @return {undefined}
     */
    checkLocalWebStorage = () =>{
        if(window.localStorage.length !== 0){
            let storedName = localStorage.getItem('name');
            let storedPassword = localStorage.getItem('password');
            let storedRepeatPassword = localStorage.getItem('repeatPassword');
            let storedEmail = localStorage.getItem('email');
            this.validationView.updateInputValue(storedName, storedPassword, storedRepeatPassword, storedEmail);
        }
    }
   
}
