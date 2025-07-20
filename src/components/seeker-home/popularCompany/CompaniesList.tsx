import React from 'react'
import PopularCompanyCard from './PopularCompanyCard'

export default function CompaniesList() {



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6  '>
        {
            [5,6,1,2].map((p, index) => <PopularCompanyCard key={index}/>)
        }
    </div>
  )
}
