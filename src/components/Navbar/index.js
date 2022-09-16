import React, {useEffect} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import avatar from '../../assets/images/avatar.jpeg'
import { useStateContext } from '../../context/ContextProvider';
import { Tooltip } from '@mui/material';
import NotificationBox from './NotificationBox'
import UserProfileBox from './UserProfileBox'

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
  <Tooltip title={title} placement="bottom" arrow>
    <button type='button' onClick={customFunc} style={{color}}
    className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span style={{background: dotColor}}
      className="absolute inline-flex rounded-full h-2 w-2 right-3.5 top-3.25" />
        {icon}
    </button>
  </Tooltip>
)

const handleClick = () => {
  console.log('bruh');
}
const Navbar = () => {
  const {activeMenu, setActiveMenu, isClicked, setIsClicked, handleClick,
  screenSize, setScreenSize} = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if(screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className='flex justify-between p-2 md:mx-6 relative'>
      <NavButton title="Menu" 
      customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} 
        color="purple" 
        icon={<MenuIcon />}/>

        <div className='flex'>

          <NavButton title="Notifications" 
          customFunc={() => handleClick('notification')} 
          color="purple" 
          dotColor="orange"
          icon={<NotificationsNoneIcon />}/>

          <Tooltip title="Profile"
          placement='bottom' arrow>
            <div className='flex ml-3 items-center gap-2 cursor-pointer
            p-1 hover:bg-light-gray rounded-lg'
            onClick={() => handleClick('userProfile')}>
              <img className='rounded-full w-8 h-8' src={avatar} />
              <p>
                <span className='text-gray-400 text-14'>Hi, </span> {' '}
                <span className='text-gray-400 font-bold ml-1 text-14'>AdmyreChad</span>
              </p>
              <KeyboardArrowDownIcon className='text-gray-400 text-14'/>
            </div>
          </Tooltip>

          {isClicked.notification && <NotificationBox />}
          {isClicked.userProfile && <UserProfileBox />}
        </div>
    </div>
  )
}

export default Navbar