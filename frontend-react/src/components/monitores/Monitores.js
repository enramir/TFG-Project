import React, { Component } from "react";
import Global from '../../Global';
import { Link, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';

class Monitores extends Component {

    URL = Global.url;

        state = { 
            products: [],
            status: null
        }

        componentWillMount() {
            
            this.getProducts();
            
        }

        getProducts = () => {
            axios.get(this.URL + "/products")
                .then(res => {
                    if(res.data){
                        this.setState({
                            products: res.data,
                            status: 'success'
                        });
                    }else{
                        this.setState({
                            products: res.data,
                            status: 'failed'
                        });
                    }
                    
                });
        }

        deleteProduct = (uuid) => {
            swal({
                title: "¿Estás seguro?",
                text: "¡Una vez borrado, no podrás recuperar el producto!",
                icon: "warning",
                buttons: [true, true],
                dangerMode: true
              })
              .then((willDelete) => {
    
                if(willDelete){
                    axios.delete(this.URL + "/products/" + uuid)
                    
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
                <Redirect to={'/monitores'}></Redirect>
            )
        }

        return (
            
            <div className="center">
                    
                    <section id="content">
                    <h1 className="subheader">Monitores</h1>
                    
                        {            
                            this.state.products.filter(product => product.name.includes('Monitor') || product.name.includes('monitor') || product.name.includes('monitores') || product.name.includes('Monitores')).map((filteredName, i) => {
                                //console.log(filteredName)
                                return(
                                    <div id="products" key={filteredName._id}>
                                        <article className="article-item">
                                        
                                            <img src={this.URL+ '/products/display/' + filteredName.image} alt={filteredName.name}></img>
                            
                                            <h3>{filteredName.name}</h3>
                                            <span><strong>Precio: </strong>{filteredName.price}€</span>
                                            <p><strong>Descripción: </strong>{filteredName.description}</p>
                                            <Link to={'/home/editar/' + filteredName.uuid} className="btn btn-outline-primary" style={{fontSize: '20px', color: 'rgba(124, 6, 160, 0.979)'}}> <i className="fa fa-pencil-square-o" />Editar</Link>
                                                    <button onClick={
                                                        () => {
                                                            this.deleteProduct(filteredName.uuid)
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
    }
}

export default Monitores;