import { PropsWithChildren, createContext, useEffect, useState, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../utilities/auth-store';

type Context = {
  isAuthenticated: boolean;
};

export const AuthenticationContext = createContext<Context>({
  isAuthenticated: false,
});

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const authResult = useSyncExternalStore(subscribe, getSnapshot);

    useEffect(() => {
        setIsAuthenticated(!!authResult);
      }, [authResult]);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthenticationContext.Provider>
    );
};