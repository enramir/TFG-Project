import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [ProductService]
})
export class SearchComponent implements OnInit {

  public products: Array<Product>;
  public title: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) { 
    this.url = Global.url;
    this.title = "¡Estos son los productos encontrados!";
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      var search = params['search'];

      this._productService.search(search).subscribe(
        response => {
          if(response){
            this.products = response;
          }else{
            this.products = [];
          }
          
        },
        error => {
          console.log(error);
          this.products = [];
        }
      );
    });
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
