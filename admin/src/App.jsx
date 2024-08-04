import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RegisterForm from './components/RegisterForm';
import DatabaseTable from './components/DatabaseTable';
import UsersTable from './components/UsersTable';
import Home from './components/Home';

import './index.css';

export default function App() {
    return (
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/registerUsers' element={<RegisterForm/>}/>
        <Route path='/viewDatabase' element={<DatabaseTable/>}/>
        <Route path='/viewUsers' element={<UsersTable/>}/>
      </Routes>
    );
}