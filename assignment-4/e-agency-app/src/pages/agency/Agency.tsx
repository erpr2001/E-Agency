import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AgencyList from '../../components/AgencyList';
import { useHistory } from 'react-router-dom';

const Agency: React.FC = () => {
  const history = useHistory();

  const handleAgencyClick = (id: number) => {
    history.push(`/agency-detail/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agency</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <AgencyList onAgencyClick={handleAgencyClick} />
      </IonContent>
    </IonPage>
  );
};

export default Agency;