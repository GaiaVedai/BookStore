import React, { Component } from 'react'

class CartBookbox extends Component {

    constructor(props) {
        super(props)
        this.state={
            error:''
        }
    }


    deleteBook = () => {
        console.log(this.props)
        this.props.deleteBook(this.props)


    }
    handleCartUpdate = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        console.log(value)
        
        event.preventDefault()
        this.setState({
            [name]: value
        })
        
        
    }

    quantityValidation = (e) => {
        e.preventDefault()

        console.log(this.state.quantity)
        
        if (this.state.quantity< 1 || this.state.quantity < 100) {
            this.setState({error:'Error! this is not a valid number'})
            return
        }
        // this.setState({error:''})
    }

    updateCart = () => {
        // event.preventDefault();
        this.quantityValidation()

    }

    

    render() {
        return (
            <div className="cartBookbox">
                <h4>Title: {this.props.title}</h4>
                <div>
                    <p className="delete" onClick={this.deleteBook}>X</p>
                    <p>Pages: {this.props.pages}</p>
                    <p>Price: {this.props.price}</p>
                    <p>Quantity: {this.props.quantity}</p>
                </div>
                <form onSubmit={this.quantityValidatio}>
                    <input type="text" name="quantity" onChange={this.handleCartUpdate} max="100" min="1" className="quantity" />< br />
                    <input type="submit"  value="update quantity"  htmlFor="quantity" className="quantity" />
                    {this.state.error && (<p> {this.state.error} </p>)}
                </form>
            </div>
        )
    }
}

export default CartBookbox