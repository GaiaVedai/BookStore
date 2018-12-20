import React, { Component } from 'react'

class CartBookbox extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: '',

        }
    }


    deleteBook = () => {
        this.props.deleteBook(this.props)


    }
    handleCartUpdate = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name

        event.preventDefault()
        this.setState({
            [name]: value
        })


    }

    quantityValidation = (e) => {
        e.preventDefault()
        const quantity = this.state.quantity
    
        if (quantity < 1 || quantity > 100 || quantity === '' || isNaN(quantity)) {
            this.setState({ error: 'Error! this is not a valid number' })
            return
        }
        this.setState({ error: '' })

        this.props.updateCartQuantity(this.state.quantity, this.props.id)

    }

    resetInput = () => {
        this.setState({ reset: '' })
    }

    render() {
        return (
            <div className="cartBookbox">
                <h4>Title: {this.props.title}</h4>
                <div>
                    <p className="delete" onClick={this.deleteBook}>X</p>
                    {/* <p>Pages: {this.props.pages}</p> */}
                    <p>Price: {this.props.price}</p>
                    <p>Quantity: {this.props.quantity}</p>
                </div>
                <form onSubmit={this.quantityValidation}>

                    <input type="text" name="quantity" onChange={this.handleCartUpdate} max="100" min="1" className="quantity" />< br />
                    <input type="submit" value="update quantity" htmlFor="quantity" className="quantity update" />
                    {this.state.error && (<p className="validError"> {this.state.error} </p>)}
                </form>

            </div>
        )
    }
}

export default CartBookbox