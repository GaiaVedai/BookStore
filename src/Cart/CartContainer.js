import React, { Component } from 'react'
import CartBookbox from './CartBookBox';
import '../Styling/cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CartContainer extends Component {

    showCartBox = () => {
        console.log(this.props.cart)
        // console.log(this.props.cart)
        if (this.props.cart.length > 0) {
            return this.props.cart.map(book => {
                return <CartBookbox
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    img={book.thumbnail}
                    pages={book.pages}
                    price={book.price}
                    deleteBook={this.props.deleteBook}
                    quantity={book.quantity}
                    updateCartQuantity={this.props.updateCartQuantity}
                />
            })
        }
    }

    updateTotal = () => {

        const bookPrice = this.props.cart.map(book => {
            return book.price * book.quantity
        })
        const bookTotal = bookPrice.reduce((a, b) => a + b, 0)
        return bookTotal + '$'


    }

    deleteBook = (book) => {
        this.props.deleteBook(book)
    }

    render() {
        const noOfItems = this.props.cart.length
        return (
            <div className="cartContainer">
                <div>
                    Shopping Cart
                </div>
                you have {noOfItems} items
                    {this.showCartBox()}
                <div className="total">
                    <div className="faBookIcon"><FontAwesomeIcon icon="book-open" />
                    </div>
                    <p>Total:</p>
                    <p>{this.updateTotal()}</p>
                </div>
            </div>
        )

    }
}

export default CartContainer