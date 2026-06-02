import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthModal } from '@/modules/auth/components/auth-modal';
import { PublicTopBar } from '@/modules/home/components';
import { EPublicPath } from '@/core/router/domain/enums/public-path.enum';

export function Public() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  
  // A busca só funciona na home
  const isHomePage = location.pathname === EPublicPath.HOME;
  
  const handleSearchChange = (value: string) => {
    if (isHomePage) {
      setSearch(value);
    }
  };
  
  return (
    <>
      <PublicTopBar 
        searchValue={isHomePage ? search : ''} 
        onSearchChange={handleSearchChange} 
      />
      <Outlet context={{ search, setSearch }} />
      <AuthModal />
    </>
  );
}
