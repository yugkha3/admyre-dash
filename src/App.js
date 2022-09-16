import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {Home, UnderConstruction, Dashboard} from './pages';
import Insights from './components/Insights';


function App() {

  return (
    <div>
      <Router>
        <Routes>

          {/* Dashboard Home */}
          <Route path='/' element={<Dashboard/>}>
            <Route path='/' element={<Navigate to='dashboard' />}/>
            <Route path='dashboard' element={<Insights />}  />
            <Route path='fake-follower-checker' element={<UnderConstruction />} exact/> 
            {/* User Settings And pricing */}
            <Route path='settings' element={<UnderConstruction />} />
            <Route path='pricing' element={<UnderConstruction />} />
            {/* Tools */} 

          </Route>

        </Routes>        
      </Router>
    </div>
  );
}

export default App;
