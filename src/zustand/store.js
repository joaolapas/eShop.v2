import { create } from 'zustand'
import axios from 'axios'
import { url } from './api'
import jwtDecode from 'jwt-decode'

const useProducts = create(set => ({
  items: [],
  cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  cartTotalPrice: 0,
  cartCounter: 0,
  status: null,
  auth: {
    token: localStorage.getItem('token'),
    name: '',
    email: '',
    password: '',
    _id: '',
    registerStatus: '',
    registerError: '',
    loginStatus: '',
    loginError: '',
    userLoaded: false
  },
  notifications: '',
  registerUser: async (values) => {
    try{
      const token = await axios.post(`${url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password
      })
      localStorage.setItem('token', token.data)
      set(() => ({notifications: 'Successfully registered!'}))
      return token.data 
    }catch(err){
      set(()=> ({notifications: err.response.data}))
      
      return err.response.data
    }
  },
  login: async (values) => {
    try {
      const response = await axios.post(`${url}/login`, {
        email: values.email,
        password: values.password
      })
      const decoded = jwtDecode(response.data)
      localStorage.setItem('token', response.data)
      set(state => ({
        auth: {
          ...state.auth,
          token: response.data,
          name: decoded.name,
          email: decoded.email,
          _id: decoded._id,
          userLoaded: true
        },
        notifications: 'Welcome back!'
      }))
      return response.data
    } catch (err) {
      set(() => ({
        notifications: err.response.data
      }))
      return err.response.data
    }
  },
  setAuth: (auth) => {
    set(state => ({
      auth: {
        ...state.auth,
        ...auth,
      }
    }))
  },
  resetNotifications: () => { set(()=> ({notifications: ''})) },

  fetch: async () => {
    try {
      set(state => ({ ...state, status: 'pending' }))
      const response = await axios.get('http://localhost:5001/products')
      set(state => ({ ...state, status: 'success', items: response.data }))
    } catch (error) {
      set(state => ({ ...state, status: 'rejected' }))
    }
    
  },

  addToCart: (props) => {
    const { name, price, image, id, description } = props;
    const quantity = 1;
    if (id !== "") {
      set((state) => {
        let exists = false;
        let updatedCart = state.cart.map((item) => {
          if (item.id === id) {
            exists = true;
            
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        if (!exists) {
          updatedCart = [
            ...state.cart,
            { name:name, price, image, id, description, quantity },
            
          ];
          
        }
        return {
          cart: updatedCart,
          cartCounter: state.cartCounter + quantity,
        };
      });
      
    }
  },
  resetCart: () => {
    set(() => ({
      cart: [],
      cartCounter: 0,
    }));
  },

  deleteProduct: (id) => {
    set((state) => {
      let updatedCart = state.cart.filter((item) => item.id !== id);
      let deletedProduct = state.cart.find((item) => item.id === id);
      let updatedSum = state.cartCounter;
      if (deletedProduct) {
        updatedSum -= deletedProduct.quantity;
      }
      return {
        cart: updatedCart,
        cartCounter: updatedSum,
      };
    });
  },

  qtyAddOne: (id) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      return {
        cart: updatedCart,
        cartCounter: state.cartCounter + 1,
      };
    });
  },

  qtySubtractOne: (id) => {
    set((state) => {
      let updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          let updatedQuantity = item.quantity - 1;
          if (updatedQuantity === 0) {
            return;
          }
          return {
            ...item,
            quantity: updatedQuantity,
          };
        }
        return item;
      });
      updatedCart = updatedCart.filter((item) => item);
      return {
        cart: updatedCart,
        cartCounter: state.cartCounter - 1,
      };
    });
  },
  updatePrice: () => {
    set((state) => {
      let updatedCart = state.cart;
      let updatedPrice = 0;
      updatedCart.forEach((item) => {
        updatedPrice += item.price * item.quantity;
      });
      
      return {
        cart: updatedCart,
        cartTotalPrice: updatedPrice,
      };
    });
  },
  updateCounter: () => {
    set((state) => {
      let cartItems = state.cart;
      let updatedCount = 0
      cartItems.forEach((item) => {
        updatedCount += item.quantity
      });
      
      return {
        cartCounter: updatedCount
      };
    })
  }
  
}))


export default useProducts