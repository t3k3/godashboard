'use client';
import Image from 'next/image';
import { useState } from 'react';

function ImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div>
      <Image
        src={
          images[currentImageIndex]?.thumb ||
          'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
        }
        alt='product9'
        width={300}
        height={300}
        className='w-full'
      />
      <div
        className='grid grid-cols-5
     gap-4 mt-4'
      >
        {images && images.length > 1
          ? images?.map((image, index) => {
              return (
                <Image
                  key={image?.thumb}
                  src={image?.thumb}
                  alt='product9'
                  width={300}
                  height={300}
                  className='w-full cursor-pointer border border-primary'
                  onClick={() => setCurrentImageIndex(index)}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default ImageGallery;
