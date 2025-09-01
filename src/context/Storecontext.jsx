import { createContext } from "react";
// import { food_list } from "../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "https://fooddelivery-server-3.onrender.com"
    const [cartitem, setCartitem] = useState({});
    const [token, setToken] = useState("");
    const [food_list, setFood_list ]= useState([])
    // console.log(cartitem,"cart item from context")



    const addToCart = async(itemid) => {
        if (!cartitem[itemid]) {
            console.log(itemid, "if")
            setCartitem((prev) => ({ ...prev, [itemid]: 1 }))
        }
        else {
            setCartitem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }))
        }
        if(token){
            await axios.post(`${url}/api/cart/add`,{itemId:itemid},{headers:{token}})
        }
    }


    const removeFromCart = async(itemid) => {
        setCartitem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }))
        if(token){
            await axios.post(`${url}/api/cart/remove`,{itemId:itemid},{headers:{token}})
        }
    }

    const getCartTotalAmount = () => {
        let TotalAmount = 0;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                TotalAmount += itemInfo.price * cartitem[item]
            }

        }
        return TotalAmount
    }

    const fetchFoodlist = async()=>{
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFood_list(response.data.data)
        } catch (error) {
            console.log("error while fetching foodlist", error)
        }
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(`${url}/api/cart/get`,{},{headers:{token}});
        setCartitem(response.data.cartData)
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodlist();
            if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"));
        }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartitem,
        setCartitem,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        token,
        setToken,
        url
    }
    return (
        <StoreContext.Provider value={contextValue} >
            {
                props.children
            }
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;