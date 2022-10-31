import Cookies from "js-cookie";
import {createContext, useReducer} from "react"

const initailState={
    pages:[],
    token:Cookies.get("token")?JSON.parse(Cookies.get("token")):null,
    user:Cookies.get("user")?JSON.parse(Cookies.get("user")):null,
    viewedCart:Cookies.get("viewedItems")?JSON.parse(Cookies.get("viewedItems")):[],
    lovedItems:Cookies.get("lovedItems")?JSON.parse(Cookies.get("lovedItems")):[],
    cart:{
        cartItems:Cookies.get("items")?JSON.parse(Cookies.get("items")):[],
        shipping:Cookies.get("shipping")?JSON.parse(Cookies.get("shipping")):{},
        paymanetMethod:Cookies.get("paymentMethod")?Cookies.get("paymentMethod"):"",
        orderComplete:false
    }
}
export const Store= createContext();

function reducer(state,action){
  switch (action.type){
      case "ADD_TO_CART":{
        const newItem=action.payload;        
        const existItem=state.cart.cartItems.find(item=>item.id===newItem.id);
        const cartItems=existItem?state.cart.cartItems.map(item=>
          item.id===existItem.id?newItem:item
        ):[...state.cart.cartItems,newItem];
         Cookies.set("items",JSON.stringify(cartItems));
        return{...state,cart:{...state.cart,cartItems}}
      }
      case "REMOVE_FROM_CART":{
        const cartItems=state.cart.cartItems.filter(item=>item.id!==action.payload.id);
        Cookies.set("items",JSON.stringify(cartItems));
        return{...state,cart:{...state.cart,cartItems}}
      }
      case "ADD_SHIPPING":{
        Cookies.set("shipping",JSON.stringify(action.payload));
        return{...state,cart:{...state.cart,shipping:action.payload}}
      }
      case "ADD_PAYMENT_METHOD":{
        Cookies.set("paymentMethod",action.payload);
        return{...state,cart:{...state.cart,paymanetMethod:action.payload}}
      }
      case "CLEAR_CARITEMS":{
        return{...state,cart:{...state.cart,cartItems:[]}}
      }
      case "ORDER_COMPLEATE":{
        return{...state,cart:{...state.cart,orderComplete:true}}
      }
      case "USER_LOGIN":{
        Cookies.set("user",JSON.stringify(action.payload));
        return{...state,user:action.payload}
      }
      case "TOKEN":{
        Cookies.set("token",JSON.stringify(action.payload));
        return{...state,token:action.payload}
      }

      case "USER_LOGOUT":{
        Cookies.remove("token");
        Cookies.remove("user");
        Cookies.remove("cartIems");
        Cookies.remove("shipping");
        return{...state,user:null,cart:{cartItems:[]}}
      }
      case "ADD_VIEWED_CARD":{
        const newItem=action.payload;        
        const existItem=state.viewedCart.find(item=>item.id===newItem.id);
        const viewedCart=existItem?state.viewedCart.map(item=>
          item.id===existItem.id?newItem:item
        ):[...state.viewedCart,newItem];
         Cookies.set("viewedItems",JSON.stringify(viewedCart));
        return{...state,viewedCart}
      }
      case "ADD_TO_LOVEDITEMS":{
        const newItem=action.payload;        
        const existItem=state.lovedItems.find(item=>item.id===newItem.id);
        const lovedItems=existItem?state.lovedItems.map(item=>
          item.id===existItem.id?newItem:item
        ):[...state.lovedItems,newItem];
         Cookies.set("lovedItems",JSON.stringify(lovedItems));
        return{...state,lovedItems}
      }
      case "REMOVE_LOVED_PRODUCT":{
        const lovedItems=state.lovedItems.filter(item=>item.id!==action.payload.id);
        Cookies.set("items",JSON.stringify(lovedItems));
        return{...state,lovedItems}
      }
      case "ADD_PAGES":{
        return{...state,pages:action.payload}
      }
      default : return state;
  }
}


export default function StoreProvider(props){
    const [state,dispatch]=useReducer(reducer,initailState)
    const value={state,dispatch}

    return <Store.Provider value={value}>{props.children}</Store.Provider>
}