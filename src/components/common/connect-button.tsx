import React from 'react';
import { useAppContext } from 'utils/context/AppContext';
import { Dropdown } from './dropdown';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './button';
import { ellipsisAddress } from 'utils';

export const ConnectButton = () => {
  const { user, signOut } = useAppContext();
  const connected = user?.address ? true : false;
  const address = user?.address;
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: 'Sign Out',
      onClick: () => {
        signOut();
      }
    }
  ];

  return (
    <>
      {connected && <Dropdown label={`${ellipsisAddress(address)}`} items={menuItems} />}
      {!connected && (
        <Button
          className="border-t border-l border-b border-r border-dark-pink"
          onClick={() => navigate('/connect', { state: { fromPath: location.pathname } })}
        >
          Connect
        </Button>
      )}
    </>
  );
};
