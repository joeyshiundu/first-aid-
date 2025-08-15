import express from 'express';
import  db from './infrastructure/db/models'

const app = express();
const port = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    app.listen(port, () => {
       console.log(`Server is running on port ${port}`); 
    })

}).catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
});