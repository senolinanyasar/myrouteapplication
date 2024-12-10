import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.removeItem('user');  // Kullanıcı verilerini temizle
        history.push('/login');  // Login sayfasına yönlendir
    };

    return (
        <button onClick={handleLogout}>Çıkış Yap</button>
    );
};

export default Logout;
