import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { apertureOutline, searchOutline, personCircleOutline } from 'ionicons/icons';
import Gallery from './pages/gallery/Gallery';
import Agency from './pages/agency/Agency';
import AgencyDetail from './pages/agency/AgencyDetail'; // Import the AgencyDetail component
import ProfileRoutes from './pages/profile/ProfileRoutes';
import { AuthenticationProvider } from './providers/AuthenticationProvider';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import BookingForm from './pages/agency/BookingForm';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <AuthenticationProvider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/gallery">
              <Gallery />
            </Route>
            <Route exact path="/agency">
              <Agency />
            </Route>
            <Route path="/agency-detail/:id"> {/* Add route for AgencyDetail */}
              <AgencyDetail />
            </Route>
            <Route path="/booking-form/:id">
              <BookingForm />
            </Route>
            <Route path="/profile">
              <ProfileRoutes />
            </Route>
            <Route exact path="/">
              <Redirect to="/gallery" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="gallery" href="/gallery">
              <IonIcon aria-hidden="true" icon={apertureOutline} />
              <IonLabel>Gallery</IonLabel>
            </IonTabButton>
            <IonTabButton tab="agency" href="/agency">
              <IonIcon aria-hidden="true" icon={searchOutline} />
              <IonLabel>Agency</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile/info">
              <IonIcon aria-hidden="true" icon={personCircleOutline} />
              <IonLabel>Profile</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthenticationProvider>
  </IonApp>
);

export default App;