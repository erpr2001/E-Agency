import {
  useIonToast,
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { login } from '../utilities/authentication';
import { useHistory } from 'react-router';
import { getSnapshot, subscribe } from '../utilities/auth-store';
import { useSyncExternalStore } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css'; 

const Login: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const session = useSyncExternalStore(subscribe, getSnapshot);

  if (session) {
    return <Redirect to="/profile/info" />;
  }

  const presentToast = (message = '') => {
    present({
      message: message,
      duration: 5000,
      color: 'danger',
      position: 'top',
    });
  };

  async function loginUser() {
    try {
      await login('michaelw', 'michaelwpass');
      history.push('/profile');
    } catch (e) {
      if (e instanceof Error) {
        presentToast(e.message);
      }
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="login-content">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="login-container">
          <IonItem>
            <IonLabel>Username</IonLabel>
            <IonInput type="text" placeholder="Enter your username" />
          </IonItem>
          <IonItem>
            <IonLabel>Password</IonLabel>
            <IonInput type="password" placeholder="Enter your password" />
          </IonItem>
          <IonButton expand="block" onClick={loginUser} className="login-button">
            Login
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;