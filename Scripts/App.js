import express from 'express';

const app = express();

app.use(express.static('Public'));

app.use((req, res) => {
     res.status(404);
     res.send(`<h1>Error 404: Resourse not found</h1>`)  // pode chamar uma tela de erro customizável, só passar o path
})

app.listen(3000, () => {
    console.log("App listening on port 3000");
})

