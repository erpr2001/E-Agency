import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import ProtectedRoutes from '../ProtectedRoutes';
import { PrivateRoute } from '../../components/PrivateRoute';
import Login from '../Login';

const ProfileRoutes: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path="/profile/info">
          <PrivateRoute>
            <ProtectedRoutes />
          </PrivateRoute>
        </Route>
        <Route exact path='/profile/login' component={Login} />
        <Route exact path="/profile">
          <Redirect to="/profile/info" />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProfileRoutes;
