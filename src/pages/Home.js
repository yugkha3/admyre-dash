import React, {useState, useEffect} from 'react'
import {DisplaySection, HomeNavBar, HomeSideBar, InfoSection} from '../components';
import { homeObjOne, homeObjThree, homeObjTwo } from '../components/InfoSection/HomeCardTemplate';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      document.title = "Admyre Tools Landing Page"
   }, []);
    const toggle = () => {
        setIsOpen(!isOpen)
    }

  return (
    <>
        <HomeSideBar isOpen={isOpen} toggle={toggle} />
        <HomeNavBar toggle={toggle}/>
        <DisplaySection />
        <InfoSection {...homeObjOne}/>
        <InfoSection {...homeObjTwo}/>
        <InfoSection {...homeObjThree}/>
    </>
  )
}

export default Home