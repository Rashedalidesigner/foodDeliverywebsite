import React, { useContext } from 'react';
import "./cart.css"
import { StoreContext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  const { food_list, cartitem, removeFromCart,getCartTotalAmount,url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quentity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartitem[item._id] > 0) {
              return (
                <div key={index}>
                  <div className='cart-item-title cart-item-item'>
                    
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartitem[item._id]}</p>
                    <p>${item.price * cartitem[item._id]}</p>
                    <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-buttom">
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
              <p>${getCartTotalAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-detiles">
              <b>Total</b>
              <b>${getCartTotalAmount()===0?0:getCartTotalAmount()+2}</b>
            </div>
          </div>
          <button onClick={()=>navigate("/order")}>PROCEED TO CECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>If you have promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
