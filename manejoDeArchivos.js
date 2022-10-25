const fs= require("fs")
const pathToFile= "./products.json"

class Contenedor{
    save =async(product)=>{
        if(!product.name || !product.price){
            return{
                status:"error",
                message:"Missing required fields"
            };
        }
            try{
                if(fs.existsSync(pathToFile)){
                    let data= await(fs.promises.readFile(pathToFile,"utf-8"));
                    let products=JSON.parse(data);
                    let id= products.length + 1;
                    product.id=id;
                    products.push(product);
                    await fs.promises.writeFile(pathToFile, JSON.stringify(products,null,2));
                    return{
                        status:"success",
                        message:"Product created"
                    };
                } else{
                    product.id=1;
                    await fs.promises.writeFile(
                        pathToFile,
                        JSON.stringify([product], null, 2)
                    );
                    return{
                        status:"success",
                        message:"Product created"
                    };
                }
            } catch (error){
            return{
                status: "error",
                message:error.message
            }
        }
    }
    //Funcion para leer todos los productos
    getAll = async()=>{
        try{
            if(fs.existsSync(pathToFile)){
                let data= await(fs.promises.readFile(pathToFile,"utf-8"));
                let products=JSON.parse(data);
                return{
                    status:"success",
                    products:products,
                };
    } else{
        return{
            status:"error",
            message:"No products found",
        }
    }
} catch(error){
    return{
        status:"error",
        message:error.message,
    } 
}
}
 // funcion para leer por id
 getById= async(id)=>{
    if(!id){
        return{
            status:"error",
            message:"ID is required",
        }
    }
    if(fs.existsSync(pathToFile)){
        let data= await fs.promises.readFile(pathToFile, "utf-8");
        let products = JSON.parse(data);
        let product= products.find((product)=> product.id == id);
        if(product){
            return{
                status:"success",
                product: product,
            }
        } else{
            return{
                status:"error",
                message:"Product not found"
            }
        }
    } else{
        return{
            status:"error",
            message:"Product not found"
        }
    }
 }
 //Eliminar producto por id
 deleteById= async(id)=>{
    if(!id){
        return{
            status:"error",
            message:"ID is required",
        }
    }
    if(fs.existsSync(pathToFile)){
        if(fs.existsSync(pathToFile)){
            let data= await fs.promises.readFile(pathToFile, "utf-8");
            let products = JSON.parse(data);
            let newProducts= products.filter((product)=> product.id !=id);
            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(newProducts,null,2)
            )
            return{
                status:"success",
                message:"Product Delete"
            }
    } else{
        return{
            status:"error",
            message:"No products found"
         }
        }
     }
  }
//Eliminar todos los objetos
deleteAll = async () => {
    try {
        if (fs.existsSync(pathToFile)) {
            let newProduct = [];
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProduct))
        } else {
            return {
                status: "Error",
                Message: "No file found"
            }
        }
    } catch (error) {
        return {
            status: "Error",
            message: error.message
        }
        }
    }
}

module.exports = Contenedor;