import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import InfiniteScroll from '../../components/InfiniteScroll';
import './Gallery.css';

const Gallery: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        <InfiniteScroll />
      </IonContent>
    </IonPage>
  );
};

export default Gallery;
