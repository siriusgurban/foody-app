import React from 'react'
import CheckoutPart from '../CheckoutPart'
import CheckoutYourOrder from '../CheckoutYourOrder'
import { useSelector } from 'react-redux';
import CheckouSuccess from '../CheckoutSuccess';

function UserCheckout() {
  const { checkOrder } = useSelector(state => state);
  const istrue = checkOrder.checkOrderState
  return <div className='flex w-full md:flex-nowrap flex-wrap-reverse'>
    {istrue ? <CheckouSuccess /> : (
      <>
        <CheckoutPart />
        <CheckoutYourOrder />

      </>
    )}

  </div>
}

export default UserCheckout
