import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../create/create.component.css'], 
  providers: [ProductService]
})
export class EditComponent implements OnInit {

  public product: Product;
  public n: number;
  public url: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url:Global.url+"/products/upload"
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Adjuntar foto...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
    }
  };
  

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.product = new Product('','','',this.n,'');
    this.url = Global.url;
   }

  ngOnInit(): void {
    this.getProduct();
  }

  onSubmit(){
    
    this._productService.update(this.product.uuid, this.product).subscribe(
      response => {
      
        if(response == 'OK'){
          
          // Alert
          swal(
            '¡Producto guardado!',
            'El producto se ha editado y guardado correctamente.',
            'success'
          );

          this._router.navigate(['/home']);
        
        }else{
          response.status(405);
        } 

      },
      error => {
        console.log(error);
        swal(
          '¡Producto no guardado!',
          'El producto no se ha editado correctamente.',
          'error'
        );
      }
    );
  }

  getProduct(){
    this._route.params.subscribe(params => {
      
      let uuid = params['uuid'];
     
      this._productService.getProduct(uuid).subscribe(
        response => {
          this.product = response;
          // console.log(this.product);
        },
        error => {
          console.log(error);
        }
      )


    });
  }

  imageUpload(data){
    
    // alert(data.body.image);
    this.product.image = data.body.image;
  }

}
