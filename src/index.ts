import "reflect-metadata";
import createConnectionDb from "./config/connection-db";
import app from "./server";

createConnectionDb().then(async () =>{

    console.log('Connected with database');

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at http://localhost:${process.env.PORT || 8000}`)
    })

})
.catch(console.error)