import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../../Global';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';
import { v1 as uuidv1 } from 'uuid';

class Create extends Component {

    URL = Global.url;

    nameRef = React.createRef();
    priceRef = React.createRef();
    descriptionRef = React.createRef();

    state = {
        product: {},
        status: null,
        selectedFile: null
    }

    componentWillMount(){
        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es obligatorio.',
                
            }
        });
    }

    changeState = () => {
        
        this.setState({
            
            product: {
                uuid: uuidv1(),
                name: this.nameRef.current.value,
                description: this.descriptionRef.current.value,
                price: this.priceRef.current.valueAsNumber
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
        
    }

    saveProduct = (e) => {
        e.preventDefault();
        this.changeState()

        if(this.validator.allValid()){

        
            if(this.state.selectedFile !== null){
                
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
                                    uuid: this.state.product.uuid,
                                    name: this.state.product.name,
                                    description: this.state.product.description,
                                    price: this.state.product.price,
                                    image: res.data.image
                                },
                                status: "waiting"
                                
                            });
                            
                            axios.post(this.URL + "/products", this.state.product)
                                .then( res => {
                                    console.log(res);
                                    if(res.data){
                                        this.setState({
                                            product: this.state.product,
                                            status: 'success'
                                        });
                                        

                                        // Alert
                                        swal(
                                            '¡Producto añadido!',
                                            'El producto se ha añadido correctamente.',
                                            'success'
                                        );
                                    
                                    }

                                }).catch( err => {

                                    this.setState({
                                        status: 'error'
                                    });

                                    swal(
                                        'Producto ya registrado',
                                        '¡No se puede insertar dos productos iguales!',
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

                swal(
                    'Foto no adjuntada',
                    'Sube una imagen del producto.',
                    'error'
                ); 
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

        if(this.state.status === 'success'){
            return(
                <Redirect to={'/home'}></Redirect>
            )
        }

        return (
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                <div className="well well-sm">
                <form className="form-horizontal" onSubmit={this.saveProduct}>
                    <legend className="text-center header">
                    Añade un nuevo producto
                    </legend>
                    <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center" />
                    <div className="col-md-8">
                        <span>
                        <i className="fa fa-laptop" aria-hidden="true" />
                        </span>
                        <input
                        id="name"
                        name="name"
                        type="text"
                        style={{textAlign: 'center'}}
                        placeholder="Nombre"
                        className="form-control"
                        ref={this.nameRef}
                        pattern="^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$"
                        onChange={this.changeState}
                        />
                        {this.validator.message('name', this.state.product.name, 'required')}
                    </div>
                    </div>
                    <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center" />
                    <div className="col-md-8">
                        <span>
                        <i className="fa fa-eur" aria-hidden="true" />
                        </span>
                        <input
                        id="price"
                        name="price"
                        type="number"
                        style={{textAlign: 'center'}}
                        placeholder="Precio"
                        className="form-control"
                        min="1" 
                        step="0.01"
                        pattern='([0-9]*[.])?[0-9]+$'
                        ref={this.priceRef}
                        onChange={this.changeState}
                        required
                        />
                        {this.validator.message('price', this.state.product.price, 'required')}
                    </div>
                    </div>
                    <div className="form-group">
                    <span className="col-md-1 col-md-offset-2 text-center" />
                    <div className="col-md-8">
                        <span>
                        <i className="fa fa-info" aria-hidden="true" />
                        </span>
                        <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        placeholder=" Escriba una breve descripción para el producto mostrando sus principales características."
                        rows={6}
                        defaultValue={""}
                        ref={this.descriptionRef}
                        onChange={this.changeState}
                        />
                        {this.validator.message('description', this.state.product.description, 'required')}
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="file0"></label>
                        <input type="file" name="file0" onChange={this.fileChange}></input>
                    </div>
                    <div className="form-group">
                    <div className="col-md-12 text-center">
                        <button
                        type="submit"
                        value="Guardar"
                        className="btn btn-outline-primary btn-lg"
                        >
                        Añadir
                        </button>
                        <Link to={'/home'} className="btn btn-outline-secondary btn-lg">
                        Atrás
                        </Link>
                    </div>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
        );
    }
}

export default Create;
