import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './InfiniteScroll.css';

const mockPosts = [
  {
    id: 1,
    images: ['https://placebear.com/300/200', 'https://placebear.com/500/400'],
    agencyName: 'Creative Studio',
    projectDescription: 'Modern design.',
  },
  {
    id: 2,
    images: ['https://placecats.com/700/700', 'https://placebear.com/600/600'],
    agencyName: 'BuildMasters',
    projectDescription: 'Luxury apartments.',
  },
];

const InfiniteScroll: React.FC = () => {
  const [posts, setPosts] = useState(mockPosts.slice(0, 2));
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    const currentLength = posts.length;
    const newPosts = mockPosts.slice(currentLength, currentLength + 2);
    setPosts([...posts, ...newPosts]);
    if (currentLength + newPosts.length >= mockPosts.length) {
      setHasMore(false);
    }
  };

  return (
    <>
      <IonGrid>
        <IonRow>
          {posts.map((post) => (
            <IonCol size="12" sizeSm="6" sizeLg="4" key={post.id}>
              <IonCard>
                {/* Swiper Carousel */}
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  style={{ height: 'auto', width: '100%' }}
                >
                  {post.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        style={{
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                          borderRadius: '8px',
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <IonCardHeader>
                  <IonCardTitle>{post.agencyName}</IonCardTitle>
                  <IonCardSubtitle>{post.projectDescription}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </IonGrid>

      {/* Infinite Scroll */}
      <IonInfiniteScroll
        threshold="100px"
        onIonInfinite={(e) => {
          loadMore();
          (e.target as HTMLIonInfiniteScrollElement).complete();
        }}
        disabled={!hasMore}
      >
        <IonInfiniteScrollContent
          loadingSpinner="bubbles"
          loadingText="Loading more projects..."
        />
      </IonInfiniteScroll>
    </>
  );
};

export default InfiniteScroll;