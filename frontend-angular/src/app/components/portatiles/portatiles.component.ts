import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-portatiles',
  templateUrl: './portatiles.component.html',
  styleUrls: ['./portatiles.component.css'],
  providers: [ProductService]
})
export class PortatilesComponent implements OnInit {

  public url: string;
  public products: Array<Product>;
  public title: string;
  public offset: number;
  public limit: number;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    
    this.url = Global.url;
    this.title = "Portátiles";
    
   }

  ngOnInit(): void {

    this._productService.getProductsDevice().subscribe(
      response => {
        //console.log(JSON.stringify(response,null,2));
        if(response){
          this.products = response;
        }
      },
      error => {
        console.log(error); 
      }
      
    );
  }


  delete(name){

    swal({
      title: "¿Estás seguro?",
      text: "¡Una vez borrado, no podrás recuperar el producto!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
    .then((willDelete) => {
      if (willDelete) {
        this._productService.delete(name).subscribe(
          response => {
            swal("¡El producto ha sido borrado!", {
              icon: "success",
            });

            this._router.navigate(['/home']);
          },
          error => {
            console.log(error);
          }
        );
        
      } else {
        swal("¡Nada se ha borrado!");
      }
    });

    
  }

}
