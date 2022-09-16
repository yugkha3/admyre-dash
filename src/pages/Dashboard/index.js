import React, {useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import './Dashboard.css'



const Dashboard = () => {
    const {activeMenu} = useStateContext();

    useEffect(() => {
        document.title = "Dashboard"
     }, []);

  return (
    <>
        <div className='flex relative dark:bg-main-dark-bg' style={{zIndex: '10'}}>
            {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg
                bg-white
                '>
                    <Sidebar />
                </div>
            ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
                <Sidebar />
            </div>
            )}
            <div className={
                `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 
                'md:ml-72' : 'flex-2'}`
            }>
                <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
                    <Navbar />
                </div>
                <Outlet /> 
            </div>
        </div>
        
    </>
  )
}

export default Dashboard