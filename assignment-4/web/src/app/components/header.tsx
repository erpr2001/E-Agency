import Image from 'next/image';

const Header = () => (
  <header className="relative h-screen max-h-[800px] overflow-hidden">
    <Image src="/images/home_bg.jpg" alt="A serene landscape" layout="fill" objectFit="cover" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className="text-4xl md:text-6xl text-white px-4 py-2">
        <span className="bg-black bg-opacity-50 px-3">E</span> Agency
      </h1>
    </div>
  </header>
);

export default Header;