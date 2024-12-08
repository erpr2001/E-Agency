import { ReactNode, useSyncExternalStore } from 'react';
import { getSnapshot, subscribe } from '../utilities/auth-store';
import { Redirect } from 'react-router-dom';

type Props = { children?: ReactNode };

export const PrivateRoute = ({ children }: Props) => {
  const session = useSyncExternalStore(subscribe, getSnapshot);
  if (!session) {
    return <Redirect to="/profile/login" />;
  }
  return <>{children}</>;
};