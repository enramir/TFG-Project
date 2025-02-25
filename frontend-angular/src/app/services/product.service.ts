import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';


@Injectable()
export class ProductService{

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        
        this.url = Global.url;

    }
    
    //METHODS
    
    getProducts(limit,offset):Observable<any>{
        
        return this._http.get(this.url + "/products"+"?limit="+limit+"&offset="+offset);
    }

    getProductsDevice():Observable<any>{
        
        return this._http.get(this.url + "/products");
    }

    getProduct(uuid):Observable<any>{
        return this._http.get(this.url + "/products/" + uuid);
    }

    search(searchString):Observable<any>{
        return this._http.get(this.url + "/products/search/" + searchString);
    }

    create(product):Observable<any>{
        
        let data = product;

        return this._http.post(this.url + "/products", data, {responseType: 'text'});
    }

    update(uuid, product):Observable<any>{
        let data = product;
       
        var data_sinId = [];
        data_sinId.push({
            "uuid": data.uuid,
            "name": data.name,
            "description": data.description,
            "price": data.price,
            "image": data.image
        });
         

        return this._http.put(this.url + "/products/" + uuid, data_sinId[0], {responseType: 'text'});
    }

    delete(uuid):Observable<any>{ 
        
        return this._http.delete(this.url + "/products/" + uuid, {responseType: 'text'});
    }

    
}
