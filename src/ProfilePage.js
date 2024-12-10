import React, { useState } from 'react';

function ProfilePage() {
  const [userInfo] = useState({
    username: 'admin',
    email: 'admin@example.com',
  });

  const handleLogout = () => {
    alert('Çıkış yapılıyor...');
    window.location.href = '/login'; // Basit bir çıkış yönlendirmesi
  };

  return (
    <div className="profile-container">
      <h2>Profil</h2>
      <p>Kullanıcı Adı: {userInfo.username}</p>
      <p>E-posta: {userInfo.email}</p>

      <button onClick={handleLogout}>Çıkış Yap</button>
    </div>
  );
}

export default ProfilePage;
