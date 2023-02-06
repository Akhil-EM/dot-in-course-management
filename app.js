require("./src/config/env.config"); //for env file
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT;
morgan.token('date',()=> ` => ${new Date()}`);

const { initializeApplicationRoutes, initializeBaseRoutes } = require("./src/routers");
//configure node app
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date'));
app.use(express.static('public'));//share the public files



initializeBaseRoutes(app);
initializeApplicationRoutes(app);



(async () => {
   
    
    try {
        // const moment = require("moment");
        
        // console.log(toTime);
        } catch (error) {
        console.log(error);
    }

})()




app.listen(port, (err)=>{
    console.log(`Listening port on ${port}`)
});
