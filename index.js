import Container from "./container.js";
import express from "express";

const app = express();
const port = 8080;

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on("error", error => console.log(error));

const container = new Container('./productos.txt');
app.get("/products", async (req, res) => {
    try {
        const products = await container.getAll();
        res.send(products);
    } catch (error) {
        res.send(error);
    }
});

app.get("/randomProduct",async (req, res) => {
    try {
        const products = await container.getAll();
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        res.send(randomProduct);
    } catch (error) {
        res.send(error);
    }
});


//  console.log(await container.deleteAll());
// await container.saveObject({title: 'Compas', price: 21.5, thumbnail: "www.image.com"});
//  console.log(await container.getById(1));
//  await container.saveObject({title: 'Regla', price: 21.5, thumbnail: "www.image.com"});
// // console.log(await container.getAll());
