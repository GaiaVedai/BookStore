import React, { Component } from 'react';
import Header from './components/Main/Header'
import Searchresults from './components/Main/Searchresults'
import getBookInfo from './Axios'
import CartContainer from './components/Cart/CartContainer';
import LocalStorage from './LocalStorage'
import './Styling/App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faBookOpen } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart, faBookOpen)

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
    const localCart = LocalStorage.getFromLocalStorage()
    if (localCart) {
      this.setState({ cart: localCart })
    }

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
      });
  }
  changeCartState = (newState) => {
    this.setState({ ...newState })
  }


  addToCart = (addedBook) => {
    const foundBook = this.state.cart.some(item => addedBook.id === item.id)
    if (this.state.cart.length >= 0 && !foundBook) {
      this.setState({ cartActive: true, cart: [...this.state.cart, { ...addedBook, quantity: 1 }] },
        () => { LocalStorage.saveToLocalStorage(this.state.cart) })
    }
  }

  deleteBook = (deletedBook) => {
    const cartBookList = this.state.cart
    const newCart = cartBookList.filter(book => {
      return book.id !== deletedBook.id
    })
    this.setState({ cart: newCart }, () => {
      LocalStorage.saveToLocalStorage(this.state.cart)
      if (this.state.cart.length === 0) {
        this.setState({ cartActive: false })
      }
    })

  }

  updateCartQuantity = (quantity, bookId) => {
    const newCart = this.state.cart.map(book => {
      if (book.id === bookId) {
        return { ...book, quantity }
      }
      return book
    })
    this.setState({ cart: newCart }, () => { LocalStorage.saveToLocalStorage(this.state.cart) })
  }

  render() {
    return (
      <div className="App">
        <Header changeCartState={this.changeCartState} cartLength={this.state.cart.length} updateCartQuantity={this.updateCartQuantity} >
          {this.state.cartActive && (<CartContainer cart={this.state.cart} deleteBook={this.deleteBook} updateCartQuantity={this.updateCartQuantity} />)}
        </Header>

        <Searchresults books={this.state.books} addToCart={this.addToCart} cartActive={this.state.cartActive} />
      </div>
    );
  }
}

export default App;
