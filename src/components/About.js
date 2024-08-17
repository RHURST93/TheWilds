import React from 'react'
import lummi from '../assets/lummi.jpg'

const About = () => {
  return (
    <div className='bg-zinc-950'>
        <h1 className='text-white text-center'>About</h1>
        <div className='grid grid-cols-2 gap-4 items-center'>
            <img className='col-span-1 rounded-full' src={lummi} alt='portfolio photo' style={{width: 250}} />
            <p className='col-span-1 text-white text-center mr-5'>
            As a dedicated wildlife photographer, I have spent the past three years capturing the raw beauty of nature. Equipped with a Nikon Z-7 and a Nikkor 500mm lens, I immerse myself in the wilds, from dense forests to open plains, to document the incredible diversity of life. My portfolio ranges from the delicate grace of birds in flight to the majestic presence of bison roaming freely. Every shot I take is a testament to my passion for the natural world and my commitment to showcasing its splendor through my lens.
            </p>
        </div>
        
    </div>
  )
}

export default About