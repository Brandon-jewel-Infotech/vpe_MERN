import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  cart: [],
  user:[],
//   items:0,
  // totalQuantity:0,
  cartTotal:0
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers:{
    addToCart(state,action){
      // console.log(state.cart[0]);
      // console.log(action.payload.id)
      // console.log(action.payload.quantity)
        let find = state.cart.findIndex((item)=>item.id === action.payload.id);
        // console.log(find);
        if (find>=0) {
          state.cart[find].quantity +=1;
        }else{
          if (state.cart.length>0){
            state.cart = [...state.cart, action.payload];
        }else{
            state.cart = [action.payload];
        }

        }
    },
    removeItem:(state,action)=>{
      state.cart = state.cart.filter((item)=>item.id!==action.payload.id);
    },
    increaseQuantity:(state,action)=>{
      state.cart = state.cart.map((item)=>{
        if (item.id===action.payload.id) {
          return {...item,quantity:item.quantity+1}
        }
        return item
      })
    },
    increaseQuantityby10:(state,action)=>{
      state.cart = state.cart.map((item)=>{
        if (item.id===action.payload.id) {
          return {...item,quantity:item.quantity+10}
        }
        return item
      })
    },
    decreaseQuantity:(state,action)=>{
 

      state.cart = state.cart.map((item)=>{
        if (item.id===action.payload.id) {
          if(item.quantity<1){
            state.cart = state.cart.filter((item)=>item.id!==action.payload.id);
          }
          return {...item,quantity:item.quantity-1}
        }else{
          return item
        }
      })
      console.log(state.cart)

    },
    
    decreaseQuantityby10:(state,action)=>{
  
      state.cart = state.cart.map((item)=>{
        if (item.id===action.payload.id) {
          if(item.quantity<1){
            state.cart = state.cart.filter((item)=>item.id!==action.payload.id);
          }
          return {...item,quantity:item.quantity-10}
        }
        return item
      })
    },
    emptyCart:(state,action)=>{
        state.cart=[]
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToCart ,removeItem,decreaseQuantity,increaseQuantity,increaseQuantityby10,decreaseQuantityby10,emptyCart} = cartSlice.actions;

export default cartSlice.reducer;