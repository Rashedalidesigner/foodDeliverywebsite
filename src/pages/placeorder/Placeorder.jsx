import React, { useContext } from 'react';
import "./Placeorder.css"
import { StoreContext } from '../../context/Storecontext';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { getCartTotalAmount, token, food_list, cartitem, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const OnchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let order_item = [];
    food_list.map((item) => {
      if (cartitem[item._id] > 0) {
        let iteminfo = item;
        iteminfo["quantity"] = cartitem[item._id];
        order_item.push(iteminfo)
      }
    })
    let order_data = {
      address: data,
      items: order_item,
      amount: getCartTotalAmount() + 2
    }
    console.log(order_data, "order data")
    let response = await axios.post(`${url}/api/order/placeorder`, { order_data }, { headers: { token } })
    console.log(response, "response from place order")
    if (response.data.success) {
      const { sessionUrl } = response.data;
      window.location.replace(sessionUrl);
    } else {
      alert("Error in placing order")
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    }
    else if(getCartTotalAmount()===0){
      navigate("/cart")
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fiuld">
          <input required name='firstname' onChange={OnchangeHandler} type="text" placeholder='Frist name' />
          <input required name='lastname' onChange={OnchangeHandler} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={OnchangeHandler} type="text" placeholder='Email address' />
        <input required name='street' onChange={OnchangeHandler} type="text" placeholder='Street' />
        <div className="multi-fiuld">
          <input required name='city' onChange={OnchangeHandler} type="text" placeholder='City' />
          <input required name='state' onChange={OnchangeHandler} type="text" placeholder='State' />
        </div>
        <div className="multi-fiuld">
          <input required name='zipcode' onChange={OnchangeHandler} type="text" placeholder='Zip code' />
          <input required name='country' onChange={OnchangeHandler} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={OnchangeHandler} type="text" placeholder='phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-detiles">
              <p>Subtotal</p>
              <p>${getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-detiles">
              <p>Delivery Fee</p>
              <p>${getCartTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detiles">
              <b>Total</b>
              <b>${getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
