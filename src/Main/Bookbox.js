import React, { Component } from 'react'
import './bookbox.css'

class Bookbox extends Component {

    addToCart = () => {
        const {title,pages,price,id}  = this.props
        this.props.addToCart({title,pages,price,id})
    }

    render() {
        return (
            <div className="bookbox">
                <div className="bookPic">
                    <img src={this.props.img} />
                </div>
                <div className="bookboxText">
                    <p>Title: {this.props.title}</p>
                    <p>Pages: {this.props.pages}</p>
                    <p>Price: {this.props.price}</p>
                    <button type="button" onClick={this.addToCart}>Add to cart</button>
                </div>
            </div>
                )
            }
        }
        
export default Bookbox