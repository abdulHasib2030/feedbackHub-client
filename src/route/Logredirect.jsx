import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const Logredirect = ({children}) => {
 const {user} = useContext(AuthContext)
    const location = useLocation()
    if (user){
        location?.state ? <Navigate to={location.state} /> : <Navigate to='/' />
    }

    return children;
}
export default Logredirect;