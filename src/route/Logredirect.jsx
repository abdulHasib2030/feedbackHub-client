import React, { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../utlities/Loading';

const Logredirect = ({children}) => {
 const {user, loading} = useContext(AuthContext)
    const location = useLocation()
    // if(loading) return <Loading></Loading>
    if (user){
     return   location?.state ? <Navigate to={location.state} /> : <Navigate to='/' />
    }

    return children;
}
export default Logredirect;