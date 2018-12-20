import React, { Component } from 'react'
import Bookbox from './Bookbox'
import '../Styling/searchresults.css'



class Searchresults extends Component {

    createBookboxes = () => {
        return this.props.books.map((book,index) => {
            return <Bookbox
                key={index}
                id={book.id}
                title={book.title}
                img={book.thumbnail}
                pages={book.pageCount}
                price={book.price}
                addToCart={this.props.addToCart}
            />
        })

    }
    
 

    render() {
        let classes = "search"
        if (this.props.cartActive) {
            classes+= " true"
        }
        return (
            <div className={classes}>
                <h2> Search Results  </h2>
                {this.createBookboxes()}
            </div>
        )
    }
}

export default Searchresults