import React, { Component } from 'react';
import axios from 'axios';
import Global from '../../Global';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import Sidebar from '../sidebar/Sidebar';

class Products extends Component {

    URL = Global.url;
    limit = 5;
    offset = 0;

    state = { 
        products: [],
        status: null
    }

    componentWillMount(){
        var search = this.props.search;
        // console.log(search);
        if(search && search !== null && search !== undefined){
            
            this.getProductsBySearch(search);
            
        }else{
            
            this.getProducts();
        }
        
    }

    getProducts = () => {
        axios.get(this.URL + "/products?limit="+this.limit+"&offset="+this.offset)
            .then( res => {
                if(res.data){
                  //console.log(JSON.stringify(res.data,null,2));
                    this.setState({
                        products: res.data,
                        status: 'success'
                    });
                    //console.log(JSON.stringify(this.state.products,null,2));
                }else{
                    this.setState({
                        products: res.data,
                        status: 'failed'
                    });
                }
                
            });
    }

    getProductsBySearch = (search) => {
        axios.get(this.URL + "/products/search/" + search)
            .then( res => {
                
                this.setState({
                    products: res.data,
                    status: 'exito'
                });
                
                
            }).catch( err => {
                // console.log(err.response.data);
                this.setState({
                    products: [],
                    status: 'error'
                });
            });
    }

    aumentaOffset = () => {
        this.offset = this.offset+5;
        this.getProducts();
    }

    disminuyeOfsset = () => {
        this.offset = this.offset-5;
        this.getProducts();
    }

    deleteProduct = (name) => {
        swal({
            title: "¿Estás seguro?",
            text: "¡Una vez borrado, no podrás recuperar el producto!",
            icon: "warning",
            buttons: [true, true],
            dangerMode: true
          })
          .then((willDelete) => {

            if(willDelete){
                axios.delete(this.URL + "/products/" + name)
                
                    .then( res => {

                        this.setState({
                            products: res.data,
                            status: 'deleted'
                        });

                    swal("¡El producto ha sido borrado!", {
                        icon: "success",
                    });

                    });
            }else{
                swal("¡Nada se ha borrado!");
            }
            
          });
              
        
    }

    render() {

    
        if(this.state.status === 'deleted'){
            this.getProducts();
            return(
                <Redirect to={'/home'}></Redirect>
            )
        }
       
        if(this.state.products.length >= 1 && this.state.status === 'exito'){
            
            return(
                <div className="center">
                    
                    <section id="content">
                        <h1 className="subheader">¡Estos son los productos encontrados!</h1>
                        
                        
                        {
                            this.state.products.map((product, i) => {
                                return(
                                    <div id="products" key={product._id}>
                                        <article className="article-item">
                                        
                                            <img src={this.URL+ '/products/display/' + product.image} alt={product.name}></img>
                            
                                            <h3>{product.name}</h3>
                                            <span><strong>Precio: </strong>{product.price}€</span>
                                            <p><strong>Descripción: </strong>{product.description}</p>
                                            <Link to={'/home/editar/' + product.name} className="btn btn-outline-primary" style={{fontSize: '20px', color: 'rgba(124, 6, 160, 0.979)'}}> <i className="fa fa-pencil-square-o" />Editar</Link>
                                                    <button onClick={
                                                        () => {
                                                            this.deleteProduct(product.name)
                                                        }
                                                    } className="btn btn-outline-dark" style={{fontSize: '20px', color: 'red'}}><i className="fa fa-close" />Borrar</button>
                                        </article>
                                    </div>
                                )
                            })
                        }
                        
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix" />
                    <Link to={'/home'} className="btn btn-outline-secondary">Atrás</Link>
                </div>
            )
            
        }else if(this.state.products.length >= 1 && this.state.status === 'success'){
            
            return(
                <div className="center">
                    
                    <section id="content">
                        <h1 className="subheader">Todos los productos disponibles</h1>
                        
                        
                        {
                            this.state.products.map((product, i) => {
                                return(
                                    <div id="products" key={product._id}>
                                        <article className="article-item">

                                            <img src={this.URL+ '/products/display/' + product.image} alt={product.name}></img>
                                            
                                            <h3>{product.name}</h3>
                                            <span><strong>Precio: </strong>{product.price}€</span>
                                            <p><strong>Descripción: </strong>{product.description}</p>
                                            <Link to={'/home/editar/' + product.name} className="btn btn-outline-primary" style={{fontSize: '20px', color: 'rgba(124, 6, 160, 0.979)'}}> <i className="fa fa-pencil-square-o" />Editar</Link>
                                                    <button onClick={
                                                        () => {
                                                            this.deleteProduct(product.name)
                                                        }
                                                    } className="btn btn-outline-dark" style={{fontSize: '20px', color: 'red'}}><i className="fa fa-close" />Borrar</button>
                                        </article>
                                        
                                    </div>
                                    
                                )
                                
                            })
                        }
                        <button onClick={
                            () => {
                                this.disminuyeOfsset()
                            } 
                        } className="btn btn-outline-primary my-2 my-sm-0">Página Anterior</button>
                        <button onClick={ 
                            () => {
                                this.aumentaOffset()
                            } 
                        } className="btn btn-outline-primary my-2 my-sm-0">Página Siguiente</button>
                        
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix" />
                    
                </div>
            )
 
            
        }else if(this.state.products.length === 0 && this.state.status === 'error'){
            return(
                <div className="center">
                    <section id="content">
                        
                        <h2 className="subheader">No hay productos que coincidan con tu búsqueda</h2>
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix" />
                    <Link to={'/home'} className="btn btn-outline-secondary">Atrás</Link>
                </div>
            )
            
        }else if(this.state.products.length === 0 && this.state.status === 'failed'){
            return(
                <div className="center">
                    <section id="content">
                        
                        <h2 className="subheader">No existen productos. ¡Añade uno nuevo!</h2>
                        
                    </section>
                    <Sidebar></Sidebar>
                    <div className="clearfix" />
                    <Link to={'/'} className="btn btn-outline-secondary">Atrás</Link>
                </div>
            )
            
        }else{
            return(
                <div id="products">
                    <h2 className="subheader">Cargando...</h2>
                </div>
            );
            
        }
        
        
    }
}

export default Products;
