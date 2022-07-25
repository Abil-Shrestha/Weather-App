import React from 'react'

const TopButton = ({setQuery}) => {
  
  const cities = [
    {
        id:1,
        title:'Manhattan'
    },
    {
        id:2,
        title:'Sydney'
    },
    {
        id:3,
        title:'Tokyo'
    },
    {
        id:4,
        title:'Toronto'
    },
    {
        id:5,
        title:'Paris'
    },
    {
        id:6,
        title:'London'
    },
  ]
  
    return (
    <div className="flex items-center justify-around my-6">
        {cities.map((city) => (
            <button className="text-white text-lg font-medium" key={city.id} 
            onClick={ () => setQuery({q:city.title})}>
                {city.title} 
            </button>
        ))}
    </div>
  )
}

export default TopButton