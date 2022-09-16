import React from 'react'
import {Link, NavLink} from 'react-router-dom' 
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Tooltip } from '@mui/material';
import { links } from './CategoryList';
import { useStateContext } from '../../context/ContextProvider';

const Sidebar = () => {
  const {activeMenu, setActiveMenu, screenSize} = useStateContext();
  
  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  }
  const activeLink = 'flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-purple-500 text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-3 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && <>
        <div className='flex justify-between items-center'>
          <Link to="/" onClick={handleCloseSideBar}
          className="items-center gap-3 ml-3 mt-4
          flex text-xl font-extrabold tracking-tight
          dark:text-white text-slate-900"><span>ADMYRE</span></Link>
          <Tooltip title="Close" style={{zIndex: '1000'}} arrow>
            <button type='button'
            onClick={() => setActiveMenu(
              (prevActiveMenu) => !prevActiveMenu
            )}
            className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block lg:hidden
            ">
              <HighlightOffIcon />
            </button>
          </Tooltip>
        </div>
        <div className='mt-10'>
            {links.map((item) => (
              <div key={item.title}>
                  <p className='text-gray-400 m-2 mt-4 uppercase'>{item.title}</p>
                  {item.links.map((link) => (
                    <NavLink
                    to={`/dashboard/${link.path}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({isActive}) => (isActive ? activeLink : normalLink)}>
                      <Tooltip title={link.tooltip} placement='right' arrow>
                        <div className='w-full'>
                          <span className='text-purple-700'>
                          {link.icon}
                          </span>
                        <span className='capitalize pl-4'>{link.name}</span>
                        </div>
                      </Tooltip>
                    </NavLink>
                  ))}
              </div>
            ))}
          </div>
      </>}
    </div>
  )
}

export default Sidebar