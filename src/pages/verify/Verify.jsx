import React from 'react';
import "./verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { useEffect } from 'react';

const Verify = () => {
    const [searchParmams ] = useSearchParams();
    const seccess = searchParmams.get("seccess");
    const OrderId = searchParmams.get("orderId");
    
    const {url} = useContext(StoreContext);

    const navigate = useNavigate();
 
    const verifyPayment =async()=>{
        
        const response = await axios.post(`${url}/api/order/verify`,{success:seccess,orderId:OrderId})
        
        if(response.data.success){
            navigate("/myorders");
        }else{
            navigate("/")
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])


  return (
    <div className='verify'>
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify
