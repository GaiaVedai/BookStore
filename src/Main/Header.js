import React, { Component } from 'react'
import '../Styling/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cartActive: false
        }
    }


    changeCartState = () => {
        if (this.props.cartLength > 0) {
            this.setState({ cartActive: !this.state.cartActive },
                () => this.props.changeCartState(this.state))
        }
    }


    render() {
        return (
            <div className="storeHeader">
                <h2>Welcome to the Google book store!</h2>
                <div className="faCart">
                <FontAwesomeIcon icon="shopping-cart" /><br />
                <button type="button" onClick={this.changeCartState}>My Cart {this.props.cartLength > 0 ? this.props.cartLength : ''}</button>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default Header