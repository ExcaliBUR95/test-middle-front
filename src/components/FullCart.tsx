import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { tokenus, userId } from '../redux/features/auth';
// try {
//     const  data: any = await fetch( `http://localhost:5000/user/user/${user}`,
//     {
//         headers: {
//           "Content-Type": "application/json",
//           //@ts-ignore
//           Authorization: `Bearer ${data.token}`,
//         },
//       }
//     );
//     const res =  await data.json()
//     setCart( res);
//   } 
const FullCart: React.FC =  () => {
    const [cart, setCart] = React.useState<{
      img: string,
      email: string,
      brithDay: string
    }>();
    const user = useSelector(userId)
    const token = useSelector(tokenus)
    const navigate = useNavigate()
    const fetchCart = async () => {
      try {
        const  data: any = await axios.get( `http://localhost:5000/user/user/${user}`, {
            headers: {
              "Content-Type": "application/json",
              //@ts-ignore
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(data.data);
        console.log(data.data);
        console.log(cart);
        
        
      } catch (e) {
        alert(e);
        navigate('/')
      }
    };
  console.log(cart);
  
    React.useEffect(() => {
        fetchCart();
    }, []);
  if(!cart){
      return <>..loading.. </>
  }
    return (
  
      <div className="container">
        
        <div>
          <img src={cart?.img} />
          <h2>{cart.email}</h2>
          <h4>{cart.brithDay}</h4>
        </div>
      </div>
    );
  };

export default FullCart;