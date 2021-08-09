import React, { useEffect, useState } from 'react'; 


function Orders({onClose = () => {}}) {

    return(
        <>
            <button onClick={onClose}>voltar</button>
            
        </>
    )
}

export default Orders;