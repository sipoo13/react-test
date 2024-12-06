const express = require('express');
const cors = require('cors')
const routes = require('./routes/routes');
const port = 3001;
const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.listen(port, (error) => {
    if (error) return console.log(`Ошибка: ${error}`);
    console.log(`Сервер работает на порту ${port}`);
});