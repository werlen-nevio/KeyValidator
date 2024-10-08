class KeyValidator {
    constructor() {
        this.config = null;
    }
  
    async init() {
        const config = await this.loadConfig();
        this.config = config;

        this.addEventListenerToForms();
    }
  
    /**
     * This async function loads a configuration file (config.json) via a fetch request.
     * 
     * - The fetch request uses the `reload` cache option. (After development, the cache option can be removed.)
     * 
     * - After a successful fetch, the function parses the response as JSON and returns the config object.
     */
    async loadConfig() {
        try {
            const response = await fetch('config.json', {cache: "reload"});

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const config = await response.json();
            return config;

        }catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    /**
     * This function disables form submissions for all forms with the class 'keyValidator'.
     * 
     * - For each form, an event listener is attached to the 'submit' event.
     * 
     * - Inside the event handler, `e.preventDefault()` is called to prevent the form from being submitted.
     * 
     * - As a result, any form with the 'keyValidator' class will not submitted when the submit button is clicked or when the form is triggered to submit.
     */
    addEventListenerToForms() {
        $('.keyValidator').each((_, form) => {
            $(form).on("submit", async (e) => {
                e.preventDefault();
                
                let validation = await this.validateForm($(form));
        
                console.log( validation );
            });
        });
    }    

    async validateForm(form) {
        let validation = {
            valid: true,
            errors: []
        };

        $(form).find('input').each((index, input) => {
            var inputType = $(input).attr('type');

            let isInputValid = true;    
            let vValidateInput = this.config.Validation[inputType].use;

            if (vValidateInput) {
                isInputValid = this.validateInput($(input));
            }
        });

        return validation;
    }

    async validateInput(input) {
        return true;
    }
}