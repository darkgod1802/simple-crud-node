import Container from "./container.js";

 const container = new Container('./productos.txt');
 console.log(await container.deleteAll());
await container.saveObject({title: 'Compas', price: 21.5, thumbnail: "www.image.com"});
 console.log(await container.getById(1));
 await container.saveObject({title: 'Regla', price: 21.5, thumbnail: "www.image.com"});
// console.log(await container.getAll());
