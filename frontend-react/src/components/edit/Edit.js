import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../../Global';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class Edit extends Component {

    URL = Global.url;
    productName = null;

    nameRef = React.createRef();
    priceRef = React.createRef();
    descriptionRef = React.createRef();

    state = {
        product: {},
        status: null
    }

    componentWillMount(){
        
        this.productName = this.props.match.params.name;
        this.getProduct(this.productName)

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio.'
                
            }
        });
    }

    getProduct = (name) => {
    
        axios.get(this.URL + "/products/" + name)
            .then( res => {
                
                this.setState({
                    product: res.data,
                    status: 'success'
                });
            }).catch( err => {
                console.log("Error: " + err);
            });
    }

    changeState = () => {
    
        this.setState({
            
            product: {
                name: this.props.match.params.name,
                description: this.descriptionRef.current.value,
                price: this.priceRef.current.valueAsNumber,
                image: this.state.product.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
        
    }

    editProduct = (e) => {
        e.preventDefault();
        this.changeState();

        if(this.validator.allValid()){
            
            if(this.state.selectedFile !== undefined){
                const formData = new FormData();
                formData.append(
                    'file0',
                    this.state.selectedFile,
                    this.state.selectedFile.name
                );
                
                axios.post(this.URL + "/products/upload", formData)
                    .then(res => {
                        if(res.data){
            
                            this.setState({
                                product: {
                                    name: this.state.product.name,
                                    description: this.state.product.description,
                                    price: this.state.product.price,
                                    image: res.data.image
                                },
                                status: "waiting"
                                
                            });
         
                            axios.put(this.URL + "/products/" + this.productName, this.state.product)
                            .then( res => {
                            
                                if(res.data){
                                
                                    this.setState({
                                        product: res.data,
                                        status: 'exito'
                                    });

                                    // Alert
                                    swal(
                                        '¡Producto guardado!',
                                        'El producto se ha editado y guardado correctamente.',
                                        'success'
                                    );
                                
                                }
                
                                }).catch(err => {

                                    this.setState({
                                        status: 'error'
                                    });

                                    swal(
                                        '¡Producto no guardado!',
                                        'El producto no se ha editado correctamente.',
                                        'error'
                                        ); 
                                    });
                                
                            }else{
                                this.setState({
                                    product: res.data,
                                    status: "failed"
                                    
                                });
                            }
                        });
    
            
                }else{
                    axios.put(this.URL + "/products/" + this.productName, this.state.product)
                        .then( res => {
                        
                            if(res.data){
                            
                                this.setState({
                                    product: res.data,
                                    status: 'exito'
                                });

                                // Alert
                                swal(
                                    '¡Producto guardado!',
                                    'El producto se ha editado y guardado correctamente.',
                                    'success'
                                );
                            
                            }
            
                            }).catch(err => {

                                this.setState({
                                    status: 'error'
                                });

                                swal(
                                    '¡Producto no guardado!',
                                    'El producto no se ha editado correctamente.',
                                    'error'
                                    ); 
                                });
                }
                
    
            }else{
                
                this.setState({
                    status: 'error'
                });
    
                this.validator.showMessages();
                this.forceUpdate();
            }        
    
        }

        fileChange = (event) => {
            this.setState({
                selectedFile: event.target.files[0]
            });
            //console.log(event.target.files[0]);
        }

    render() {

        if(this.state.status === 'exito'){
            return(
                <Redirect to={'/home'}></Redirect>
            )
        }

        return (
            
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <div className="well well-sm">
                        <form className="form-horizontal" onSubmit={this.editProduct}>
                        <fieldset>
                            <legend className="text-center header">Editar producto</legend>
                            
                            <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center" />
                            <div className="col-md-8">
                                <span>
                                <i className="fa fa-laptop" aria-hidden="true" />
                                </span>
                                <input  id="name" name="name" type="text" style={{textAlign: 'center'}} defaultValue={this.state.product.name} className="form-control" readOnly="readonly" />
                            </div>
                            </div>
                            <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center" />
                            <div className="col-md-8">
                                <span>
                                <i className="fa fa-eur" aria-hidden="true" />
                                </span>
                                <input  id="price" name="price" type="number" defaultValue={this.state.product.price} min="1" step="0.01" style={{textAlign: 'center'}} placeholder="Precio" className="form-control" pattern="([0-9]*[.])?[0-9]+$" required ref={this.priceRef} onChange={this.changeState}/>
                                {this.validator.message('price', this.state.product.price, 'required')}
                            </div>
                            
                            </div>
                            <div className="form-group">
                            <span className="col-md-1 col-md-offset-2 text-center" />
                            <div className="col-md-8">
                                <span>
                                <i className="fa fa-info" aria-hidden="true" />
                                </span>
                                <textarea className="form-control" id="description" name="description" placeholder=" Escriba una breve descripción para el producto mostrando sus principales características." defaultValue={this.state.product.description}  rows={6} required ref={this.descriptionRef} onChange={this.changeState}/>
                                {this.validator.message('description', this.state.product.description, 'required')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="file0"></label>
                                <div class="image-thumb">
                                    <img src={this.URL + '/products/display/' + this.state.product.image} alt={this.state.product.name} className="thumb"/>
                                </div>
                                <input type="file" name="file0" onChange={this.fileChange}></input>
                            </div>
                            
                            </div>
                            <div className="form-group">
                            <div className="col-md-12 text-center">
                                <button type="submit" value="Guardar" className="btn btn-outline-primary btn-lg">Guardar</button>
                                <Link to={'/home'} className="btn btn-outline-secondary btn-lg">Atrás</Link>
                            </div>
                            </div>
                        </fieldset>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}

export default Edit;