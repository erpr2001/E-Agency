import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Route } from 'react-router-dom';
import Profile from './profile/Profile';

const ProtectedRoutes: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route exact path='/profile/info' component={Profile} />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProtectedRoutes;
