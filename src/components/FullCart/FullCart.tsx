import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { tokenus } from '../../redux/features/auth';
import style from './fullcart.module.scss'
const FullCart: React.FC =  () => {
    const [cart, setCart] = React.useState<{
      img: string,
      nickName: string,
      brithDay: string
    }>();
    const params = useParams();

    
    const token = useSelector(tokenus)
    const navigate = useNavigate()
    const fetchCart = async () => {
      try {
        const  data: any = await axios.get( `http://localhost:5000/user/user/${params.id}`, {
            headers: {
              "Content-Type": "application/json",
              //@ts-ignore
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCart(data.data);

   
        
        
      } catch (e) {
        alert(e);
        navigate('/')
      }
    };
  
    React.useEffect(() => {
        fetchCart();
    }, []);
  if(!cart){
      return <>..loading.. </>
  }
    return (
  
      <div className={style.containterFull}>
        
     {//@ts-ignore
     cart?.map((item, i) => {
        return (
          <div key={i}>
          {item?.img ? (
                    <img
                      className={style.img}
                      src={`http://localhost:5000/${item?.img}`}
                      alt="logo"
                    />
                  ) : (
                    <img
                    className={style.img}
                      src={`https://upload.wikimedia.org/wikipedia/ru/thumb/c/ce/Aang.png/280px-Aang.png`}
                      alt="logo"
                    />
                  )}
          <h2 className={style.text}>{item.nickName}6512561</h2>
          <h4 className={style.text}>{item.brithDay}</h4>
        </div>
        )
     })}
      </div>
    );
  };

export default FullCart;