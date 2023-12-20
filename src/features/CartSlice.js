import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify'
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem
            ("cartItems")) : [],
        cartTotalQty:0,
        cartTotalAmount:0
    },
    reducers:{
        addCart(state,action){

           const itemIndex = state.cartItems.findIndex(
            (item) => item.id === action.payload.id);
            if(itemIndex >= 0){
                // Item is already in the cart so we just need to update its quantity
                state.cartItems[itemIndex].cartQuantity +=1;
                toast.info(`Increased ${state.cartItems[itemIndex].name} cart QTY `,{
                    position:'top-left',
                })
            } else {
                const tepmProduct = {...action.payload, cartQuantity: 1}
                state.cartItems.push(tepmProduct);
                toast.success(`${action.payload.name} added to cart` ,{
                    position:'top-left',
                })
            }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action){
            const nextCartItems = state.cartItems.filter(
                cartitem => cartitem.id !== action.payload.id
            )

            state.cartItems = nextCartItems ;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

            toast.error(`${action.payload.name} Removed from cart` ,{
                position:'top-left',
            })
        },
        decreaseCart(state, action){
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem.id === action.payload.id
            )
            if(state.cartItems[itemIndex].cartQuantity > 1){
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.info(`Decreased ${action.payload.name} Cart Quanity` ,{
                    position:'top-left',
                })
            } else if(state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    cartitem => cartitem.id !== action.payload.id
                )
    
                state.cartItems = nextCartItems ;
    
                toast.error(`${action.payload.name} Removed from cart` ,{
                    position:'top-right',
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))

        },
        clearCart(state,action){
            state.cartItems=[]
            toast.error(`Cart Cleared` ,{
                position:'top-right',
            });
            localStorage.removeItem('cartItems')
            },
        getTotal(state, action){
           let {total, quantity} = state.cartItems.reduce((cartTotal, cartItem) =>{
                const {price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            } ,{
                total:0,
                quantity:0
            });
            state.cartTotalQty = quantity;;
            state.cartTotalAmount = total;
        }
        
    }
});

export const { addCart,removeFromCart, decreaseCart, clearCart, getTotal } = cartSlice.actions;


export default cartSlice.reducer