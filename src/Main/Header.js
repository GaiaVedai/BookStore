import React, { Component } from 'react'
import './header.css'

class Header extends Component {
    constructor (props) {
        super(props) 
        this.state = {
            cartActive: false
          }
    }


    changeCartState = () => {
        if (this.props.cartLengthh > 0){
        this.setState({cartActive: !this.state.cartActive},
            ()=>this.props.changeCartState(this.state) )
        }
      }

       
    render() {
        return (
            <div className="storeHeader">
                <h2>Welcome to the Google book store!</h2>

                <button type="button" onClick={this.changeCartState}>My Cart {this.props.cartLength>0 ? this.props.cartLength : ''}</button>
                {this.props.children}
            </div>
        )
    }
}

export default Header