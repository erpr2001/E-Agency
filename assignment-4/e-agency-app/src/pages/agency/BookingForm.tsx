import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonInput,
  IonTextarea,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom';
import './BookingForm.css';

const BookingForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = () => {
    // Simulate API call
    const isSuccess = Math.random() > 0.5; // Random success/failure for demonstration
    if (isSuccess) {
      history.push('/profile/my-bookings');
    } else {
      setToastMessage('Booking submission failed. Returning to the agency list.');
      setShowToast(true);
      setTimeout(() => history.push('/agency'), 3000); // Redirect after showing toast
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Booking Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Contact Name</IonLabel>
          <IonInput
            value={contact}
            onIonChange={(e) => setContact(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Address</IonLabel>
          <IonInput
            value={address}
            onIonChange={(e) => setAddress(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Phone</IonLabel>
          <IonInput
            type="tel"
            value={phone}
            onIonChange={(e) => setPhone(e.detail.value!)}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Request Details</IonLabel>
          <IonTextarea
            value={details}
            onIonChange={(e) => setDetails(e.detail.value!)}
          />
        </IonItem>
        <IonButton expand="block" onClick={handleSubmit}>
          Submit Booking
        </IonButton>
        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default BookingForm;