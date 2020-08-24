import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import WishListNavigator from './WishListNavigation';

const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useSelector((state) => { return !!state.auth.token; });

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' }),
      );
    }
  }, [isAuth]);

  return <WishListNavigator ref={navRef} />;
};

export default NavigationContainer;
