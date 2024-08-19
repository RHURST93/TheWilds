import React from 'react';
import paintedbunting from '../assets/paintedbunting.jpg';
import herron from '../assets/herron.jpg'
import scissortail from '../assets/scissortail.jpg';
import hawk from '../assets/hawk.jpg';

const photos = [
  {
    id: 1,
    title: 'Painted Bunting',
    description: 'A beautiful Painted Bunting perched on a branch.',
    image: paintedbunting, 
  },
  {
    id: 2,
    title: 'Herron',
    description: 'A Herron gliding gracefully over sunlit water with its wings spread.',
    image: herron, 
  },
  {
    id: 3,
    title: 'Scissortail Flycatcher',
    description: 'A Scissortail Flycatcher perched elegantly against a beautiful backdrop.',
    image: scissortail,
  },
  {
    id: 4,
    title: 'Redtail Hawk',
    description: 'This Redtail Hawk surveys the land, looking for a meal.',
    image: hawk, 
  },
];

const PhotoGallery = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Photo Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={photo.image} alt={photo.title} className="w-full   object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{photo.title}</h2>
              <p className="text-gray-700">{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;
