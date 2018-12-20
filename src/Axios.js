import axios from 'axios'


const getBookInfo = () => axios.get('https://www.googleapis.com/books/v1/volumes?q=nosql')

export default getBookInfo
