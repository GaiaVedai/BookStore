const STORAGE_ID = 'shopping-cart'

const saveToLocalStorage = (cart) => {
    localStorage.setItem(STORAGE_ID, JSON.stringify(cart))
  } 

const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_ID))
  }

  export default {getFromLocalStorage , saveToLocalStorage}