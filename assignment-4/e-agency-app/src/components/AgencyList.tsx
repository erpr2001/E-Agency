import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import './AgencyList.css';

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
  {
    id: 3,
    name: 'EcoVision',
    type: 'Renovated',
    address: '789 Oak Lane, Seattle, WA',
    phone: '(555) 246-8102',
    contact: 'support@ecovision.com',
  },
  {
    id: 4,
    name: 'GreenBuild',
    type: 'Barn House',
    address: '321 Maple Ave, Denver, CO',
    phone: '(555) 369-1212',
    contact: 'hello@greenbuild.com',
  },
];

const AgencyList: React.FC<{ onAgencyClick: (id: number) => void }> = ({ onAgencyClick }) => {
  const [agencies, setAgencies] = useState<Agency[]>(generatedAgencies);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>(generatedAgencies);
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const query = filterQuery.toLowerCase();
    const filtered = agencies.filter(
      (agency) =>
        agency.name.toLowerCase().includes(query) &&
        (selectedType ? agency.type === selectedType : true)
    );
    setFilteredAgencies(filtered);
  }, [filterQuery, selectedType, agencies]);

  return (
    <div>
      <IonSearchbar
        placeholder="Search by name"
        onIonInput={(e: any) => setFilterQuery(e.target.value)}
      />
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSelect
              placeholder="Filter by Type"
              onIonChange={(e) => setSelectedType(e.detail.value)}
            >
              <IonSelectOption value="">All Types</IonSelectOption>
              <IonSelectOption value="Summer House">Summer House</IonSelectOption>
              <IonSelectOption value="Brick House">Brick House</IonSelectOption>
              <IonSelectOption value="Renovated">Renovated</IonSelectOption>
              <IonSelectOption value="Barn House">Barn House</IonSelectOption>
            </IonSelect>
          </IonCol>
        </IonRow>
        <IonRow>
          {filteredAgencies.map((agency) => (
            <IonCol size="12" sizeSm="6" sizeLg="4" key={agency.id}>
              <IonCard button className="agency-card" onClick={() => onAgencyClick(agency.id)}>
                <img src={`https://via.placeholder.com/300?text=${agency.name}`} alt={agency.name} className="agency-image" />
                <IonCardHeader>
                  <IonCardTitle>{agency.name}</IonCardTitle>
                  <IonCardSubtitle>{agency.type}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default AgencyList;