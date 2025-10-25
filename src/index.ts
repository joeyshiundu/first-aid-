import express from 'express';
import { Sequelize } from 'sequelize';
import { initializeModels } from './infrastructure/db/models';
import authController from './presentation/controllers/auth.controller';
import passwordController from './presentation/controllers/password.controller';
import userController from './presentation/controllers/user.controller';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Mount controllers
app.use('/auth', authController);
app.use('/password', passwordController);
app.use('/user', userController);

// Initialize Sequelize (use env vars if available, else fall back to SQLite in-memory for dev)
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING || 'sqlite::memory:', {
  logging: false,
});

const db = initializeModels(sequelize);

db.sequelize.sync().then(() => {
    app.listen(port, () => {
       console.log(`Server is running on port ${port}`); 
    })

}).catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
});