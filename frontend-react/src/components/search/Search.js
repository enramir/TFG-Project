import React, { Component } from "react";
import Products from '../products/Products';

class Search extends Component {

    render() {
        var search = this.props.match.params.search;
    
        return (
            <div id="search">
                
                <Products search={search}>

                </Products>
            </div>

        )
    }
}

export default Search;