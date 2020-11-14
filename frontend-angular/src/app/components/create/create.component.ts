import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProductService]
})
export class CreateComponent implements OnInit {

  public product: Product;
  public n: number;
  

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
    this.product = new Product('','',this.n,null);
    
   }

  ngOnInit(): void {
  }

  onSubmit(){
    
    this._productService.create(this.product).subscribe(
      response => {
        
        if(response == 'Created'){
          
          // Alert
          swal(
            '¡Producto añadido!',
            'El producto se ha añadido correctamente.',
            'success'
          );

          this._router.navigate(['/home']);
        
        } 
      },
      error => {
        if(error.error == 'Conflict'){
          swal(
            '¿Producto ya registrado?',
            '¡No se puede insertar dos productos con el mismo nombre! Prueba con otro nombre.',
            'error'
          );
        }
        console.log(error);
      }
    );
  }

  imageUpload(data){
    
    //alert(data.body.image);
    this.product.image = data.body.image;
  }

} 
