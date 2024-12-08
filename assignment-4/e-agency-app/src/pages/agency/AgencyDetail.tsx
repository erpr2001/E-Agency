import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import './AgencyDetail.css';

interface Agency {
  id: number;
  name: string;
  type: string;
  address: string;
  phone: string;
  contact: string;
}

const generatedAgencies: Agency[] = [
  {
    id: 1,
    name: 'Creative Studio',
    type: 'Summer House',
    address: '123 Greenway Blvd, New York, NY',
    phone: '(555) 123-4567',
    contact: 'info@creativestudio.com',
  },
  {
    id: 2,
    name: 'BuildMasters',
    type: 'Brick House',
    address: '456 Elm St, San Francisco, CA',
    phone: '(555) 987-6543',
    contact: 'contact@buildmasters.com',
  },
];

const AgencyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const agency = generatedAgencies.find((a) => a.id === parseInt(id, 10));

  if (!agency) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>Agency Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p>Sorry, the agency you are looking for does not exist.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{agency.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="agency-detail">
        <h2>Type: {agency.type}</h2>
        <h3>Address: {agency.address}</h3>
        <h3>Phone: {agency.phone}</h3>
        <h3>Contact: {agency.contact}</h3>
        <IonButton
          expand="block"
          onClick={() => history.push(`/booking-form/${agency.id}`)}
        >
          Book
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AgencyDetail;