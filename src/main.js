class KeyValidator {
    constructor() {
        this.config = null;
    }
  
    async init() {
        const config = await this.loadConfig();
        this.config = config;
        // todo: make all forms with class not submittable
        this.disableForms();
    }
  
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

    disableForms() {
        $('.keyValidator').each(function(){
            $(this).find('form').on("submit", function (e) {
                e.stopPropagation();
            });
        });
    }
}