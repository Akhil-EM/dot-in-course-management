const environment = process.env.ENVIRONMENT;
let envPath = ".env-dev" ; // only use .env file in production 
if(environment === "production" || environment === "staging"){
    //use local or cloud env in development
    envPath = `.env`;
}
envPath = `.env`;
require("dotenv").config({path:envPath});

console.log(`${envPath} in use`);
