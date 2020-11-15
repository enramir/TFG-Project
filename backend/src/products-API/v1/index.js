var fs = require("fs");
var path = require("path");
var ObjectId = require('mongodb').ObjectId;

module.exports = (app, BASE_PATH, products, md_upload) => {
    console.log("Registering products API (v1)...");
    var pathAPI = "";

    pathAPI = BASE_PATH + "/products";
     
    app.get(pathAPI, (req, res) => {
        
        console.log("Registering get "+pathAPI+"...");

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        products.find({}).skip(offset).limit(limit).toArray((err, productsArray) => {
            if(err){
              console.log("Error" + err);
            }
            res.send(productsArray);
          });
    });
      
    app.get(pathAPI + "/:uuid", (req, res) => {
        
        var uuid = req.params.uuid;
        
        console.log("Registering get "+pathAPI+"/"+uuid);
        
        products.find({"uuid": uuid}).toArray((err, productsArray) => {
            if(err){
                console.log("Error: " + err);
            }
            if(productsArray.length > 0){
                res.send(productsArray[0]);
            }else{
                res.sendStatus(404, "Resource not found");
            }
        });
    });
    
    app.post(pathAPI, (req, res) => {
        console.log("Registering post "+pathAPI+"...");
        var newProduct = req.body;

        products.find({"name": newProduct["name"], "price":newProduct["price"], "description": newProduct["description"]}).toArray( (err, productsArray) => {

            if(err) console.log("Error: "+ err);

                    if(newProduct == "" || newProduct.name == null || newProduct.description == null || newProduct.price == null || newProduct.image == null){
                        res.sendStatus(400, 'Bad Request');
                    }
                
                    else if(productsArray.length == 0){
                        
                        products.insert(newProduct);
                        console.log("Request accepted, creating new resource in database.");
                        res.sendStatus(201, 'Created'); 
                        
                    } else {
                        console.log("Error: Resource already exists in the database.");
                        res.sendStatus(409, 'Conflict');
                        
                    }
                    
        });
    });
    
    app.put(pathAPI + "/:uuid", (req, res) => {
        
        var updateProduct = req.body;
        var uuid = req.params.uuid;

        console.log("Registering put "+pathAPI+"/"+uuid);

        products.find({"uuid": uuid}).toArray((err, productsArray) => {
            // console.log(productsArray);
            if(err){
                console.log("Error: " + err);
            }

            else if(updateProduct == "" || updateProduct.name == null || updateProduct.description == null || updateProduct.price == null || updateProduct.image == null){
                res.sendStatus(400, 'Bad Request');
            }

            else if(productsArray.length > 0){
                
                products.update({"uuid": uuid}, updateProduct);
                // console.log(updateProduct);
                res.sendStatus(200);
                
                
            }else{
                res.sendStatus(404, "Resource not found");

            }
        });
    });
    
    app.delete(pathAPI + "/:uuid", (req, res) => {

        var uuid = req.params.uuid;
        
        console.log("Registering delete "+pathAPI+"/"+uuid);

        products.find({"uuid": uuid}).toArray((err, productsArray) => {
            if(err){
                console.log("Error: " + err);
            }
            if(productsArray.length > 0){
                products.remove(productsArray[0]);
                res.sendStatus(200);
            }else{
                res.sendStatus(404, "Resource not found");
            }
        });
    });
    
    app.delete(pathAPI, (req, res) => {
        console.log("Registering delete "+pathAPI+"...");
        
        products.remove({});
        res.sendStatus(200, "All resources have been removed")
    });

    //Searches
    app.get(pathAPI + "/search/:search", (req,res) => {

        var searchString = req.params.search;
        // console.log(searchString);
        products.find({"name": searchString}).toArray((err, productsSearched) => {
            if(err){
                console.log("Error: " + err);
            }else if(productsSearched.length >= 1){
                res.send(productsSearched);
            }else if(productsSearched.length == 0){
                res.sendStatus(404, "Resource not found");
            }
            
        });
            
            
    });

    //Upload image
    app.post(pathAPI + "/upload/:uuid?", md_upload, (req, res) => {
        
        // console.log(req.files);

        if(!req.files){
            res.sendStatus(404, "Error: Imagen no subida.")
        }

        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');
        
        var file_name = file_split[2];
       
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        

        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){

            fs.unlink(file_path, (err) => {
                res.sendStatus(400, "La extensión de la imagen no valida");
            });

        }else{

            var uuid = req.params.uuid;

            if(uuid){

                products.find({"uuid": uuid}, {new:true}).toArray((err, product) => {
                    if(product.length == 0){
                        res.sendStatus(404, "Imagen no encontrada.");
                    }else{
                        product[0].image = file_name;
                    
                        res.sendStatus(200);
                        
                    }
                    
                });
            }else{

                return res.status(200).send({
                    status: "success",
                    image: file_name
                });
                
            }
            
        }

    });

    //GET image
    app.get(pathAPI + "/display/:image", (req, res) => {
        
        let file = req.params.image;
        // console.log(pathAPI + "/display/"+file);
        let path_file = "./upload/products/" + file;
        fs.access(path_file, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send({
                    status: "error",
                    message: "La imagen no existe !!!"
                });
            } else {
                
                return res.sendFile(path.resolve(path_file));
            }
        });
    });
    

    // method not allowed
    app.post(pathAPI + "/:uuid", (req, res) => {
            
        res.sendStatus(405, "Method Not Allowed!");
        
    });

    // method not allowed
    app.put(pathAPI, (req, res) => {
        
        res.sendStatus(405, "Method Not Allowed!");
        
    });


    console.log("Product API registered.");
}