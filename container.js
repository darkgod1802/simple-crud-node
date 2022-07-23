import fs from 'fs';

export default class Container {
    constructor(text){
        this.text = text
    }
    
    async readObject(){
        try {
            return await fs.promises.readFile(this.text, 'utf8');
        } catch (error) {
            console.log(`No se pudo leer el archivo ${error}`);
            return null;
        }
    }

    async saveObject(obj){
        try{
            const data = await this.readObject();
            let dataJsonString;
            if(data === null){
                dataJsonString = JSON.stringify([{...obj, id: 1}], null, 2);
            } else {
                const dataJson = JSON.parse(data);
                
                if(dataJson.length === 0){
                    dataJsonString = JSON.stringify([{...obj, id: 1}], null, 2);
                } else {
                    dataJsonString = JSON.stringify([...dataJson, {...obj, id: dataJson[dataJson.length-1].id + 1}], null, 2);
                }
            }
            await fs.promises.writeFile(this.text, dataJsonString, 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id){
        try {
            const data = await this.readObject();
            if(data === null){
                return "No hay productos";
            }
            const dataJson = JSON.parse(data);
            const producto = dataJson.find(producto => producto.id === id);
            if(!producto){
                return "No se encontro el producto";
            }
            return producto;
            
        } catch (error) {
            console.log(`Error al encontrar el producto ${err}`)
        }
    }

    async deleteById(id){
        try {
            const data = await this.readObject();
            if(data === null){
                return "No hay productos";
            }
            const dataJson = JSON.parse(data);
            const newDataJson = dataJson.filter((item) => item.id !== id);
            const dataJsonString = JSON.stringify(newDataJson, null, 2);
            await fs.promises.writeFile(this.text, dataJsonString, 'utf8');
            return "Eliminacion exitosa";
            
        } catch (error) {
            console.log(`Error al encontrar el producto ${error}`);
            return "Ocurrio un error";
        }
    }


    async getAll(){
        try {
            const data = await this.readObject();
            if(data === null){
                return "No hay productos";
            }
            const dataJson = JSON.parse(data);
            if(!dataJson){
                return "No se encontro el producto";
            }
            return dataJson;
            
        } catch (error) {
            console.log(`Error al cargar todos los productos ${err}`)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.text, JSON.stringify([]), 'utf8');
            return "Eliminacion exitosa";
            
        } catch (error) {
            console.log(`Error al eliminar todos los productos ${err}`)
        }
    }
}

// module.exports = Container;