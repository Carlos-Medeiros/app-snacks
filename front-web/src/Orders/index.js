import React, { useEffect, useState } from 'react'; 


function Orders({onClose = () => {}, amount}) {

    console.log(amount)
    return(
        <>
            <button onClick={onClose}>voltar</button>
            
        </>
    )
}

export default Orders;