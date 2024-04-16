import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthenticatedMenu from "./AuthenticatedMenu";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {setLayout} from '../../store/reducers/site'
import {useEffect} from 'react'
import { clearNotifications } from "@/store/reducers/notifications";
//LOGGED OUT HEADER
const Header = () => {
  const users = useSelector((state:RootState)=>state.users)
  const dispatch = useDispatch()
  const location = useLocation()
  const notifications = useSelector((state:RootState)=>state.notifications)
//This determines which window is going to be opened
  useEffect(()=>{
    let pathname = location.pathname.split('/')
    if(pathname[1] == "dashboard"){
      dispatch(setLayout('dash_layout'))
    }else{
      dispatch(setLayout(''))
     }
  },[location.pathname, dispatch])
  //this determines the notifications in the header 
  useEffect(()=>{
    let {global} = notifications
    if(notifications && global.error){
        //show message 
        const msg = global.msg ? global.msg : 'Error'
        console.log(msg)
        dispatch(clearNotifications())
    }
    if(notifications && global.success){
      const msg = global.msg ? global.msg : 'Good!'
      console.log(msg)
      dispatch(clearNotifications())
    }
  },[notifications])

  return (
    <div className="fixed-top flex flex-row px-5 m-4 justify-between border-x-4 border-foreground">
      <Link to="/">
        <h1 className="text-primary p-2 rounded-lg text-heavy text-4xl hover:bg-muted">
          NU FL<span className="text-foreground">I</span>CKS
        </h1>
      </Link>
      <AuthenticatedMenu users={users}/>
    </div>
  );
};

export default Header;
