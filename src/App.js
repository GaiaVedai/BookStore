import React, { Component } from 'react';
import Header from './Main/Header'
import Searchresults from './Main/Searchresults'
import getBookInfo from './Axios'
import './App.css';
import CartContainer from './Cart/CartContainer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      cartActive: false,
      cart: []
    }
  }

  componentDidMount = () => {
  //   const bookmap =[
  //   {
  //     id: 1,
  //     title: 'bla',
  //     thumbnail: 'abla bla bla',
  //     pageCount: 'bla bla',
  //     price: 10,
  //   },
  //     {
  //       id: 2,
  //       title: 'bla',
  //       thumbnail: 'abla bla bla',
  //       pageCount: 'bla bla',
  //       price: 10
  //   }]
  //   this.setState({ books: bookmap })
  // }


    getBookInfo()
      .then((response) => {
        const books = response.data.items
        const bookmap = books.map(book => {
          return (
            {
              id: book.id,
              title: book.volumeInfo.title,
              thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
              pageCount: book.volumeInfo.pageCount,
              price: 10
            })
        })
        this.setState({ books: bookmap })
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  changeCartState = (newState) => {
    this.setState({ ...newState })
    // this.handleCartDisplay()
  }


  addToCart = (addedBook) => {
    const foundBook = this.state.cart.some(item => addedBook.id === item.id)
    if (this.state.cart.length >= 0 && !foundBook) {
      this.setState({ cartActive: true, cart: [...this.state.cart, { ...addedBook, quantity: 1}] })
    }
  }

  deleteBook = (deletedBook) =>{
    const cartBookList = this.state.cart
    const newCart = cartBookList.filter(book => {
      return book.id !== deletedBook.id
    })
    this.setState({cart : newCart},()=>{
      if(this.state.cart.length === 0 ) {
        this.setState({cartActive:false})
      }
    })
    // if (!this.state.cart.deleteBook )
} 

  render() {
    return (
      <div className="App">
        <Header changeCartState={this.changeCartState} cartLength={this.state.cart.length}  >
          {this.state.cartActive && (<CartContainer cart={this.state.cart} deleteBook={this.deleteBook}/>)}
        </Header>

        <Searchresults books={this.state.books} addToCart={this.addToCart} cartActive={this.state.cartActive} />
      </div>
    );
  }
}

export default App;
