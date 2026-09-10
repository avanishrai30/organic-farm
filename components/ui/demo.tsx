import { PlaceCard } from '@/components/ui/card-22';

const demoPlaceData = {
  images: [
    'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?q=80&w=2940&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596622247990-84877175438a?q=80&w=2864&auto=format&fit=crop',
  ],
  tags: ['Best Seller'],
  rating: 4.8,
  title: 'Nike Airforce1 Premium',
  subtitle: 'Own the Airforce',
  description: 'Step back into classic hoops style with a durable leather.',
  price: '$111',
  logoSrc: './img/logo icon.png'
};

const PlaceCardDemo = () => {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-4">
      <PlaceCard
        images={demoPlaceData.images}
        tags={demoPlaceData.tags}
        rating={demoPlaceData.rating}
        title={demoPlaceData.title}
        subtitle={demoPlaceData.subtitle}
        description={demoPlaceData.description}
        price={demoPlaceData.price}
        logoSrc={demoPlaceData.logoSrc}
      />
    </div>
  );
};

export default PlaceCardDemo;
