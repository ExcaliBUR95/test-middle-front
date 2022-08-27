import { useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from "../components/userblock/Skeleton";
import UserBlock from "../components/userblock/UserBlock";
import { selectUserItems, selectUserStatus, Status, userFetch } from "../redux/features/users";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
    const dispatch = useAppDispatch()
    const users = useSelector(selectUserItems)
    const userStatus = useSelector(selectUserStatus)
    
    useEffect(()=> {
     dispatch(userFetch())   
     window.scroll(0, 0);
    }, [dispatch])
    return (
        <div className="container">
        <div className="content__top">

        </div>
        <h2 className="content__title">Все карточки</h2>
  
        {userStatus === "rejected" ? (
          <div className="content__error-info">
            <h2>
              Ничего нет <span>😕</span>
            </h2>
            <p>Вероятней всего, произошла ошибка, попробуйте позже.</p>
          </div>
        ) : (
          <div className="content__items">
            {userStatus !== Status.LOADING
              ? users.map((item: any) => <UserBlock key={item.id} {...item} />)
              : [...new Array(6)].map((_, index) => (
                  <Skeleton props={index} key={index} />
                ))}
          </div>
        )}
      </div>
    );
};

export default Home;