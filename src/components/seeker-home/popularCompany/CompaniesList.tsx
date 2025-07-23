'use client'
import React, { useEffect, useState } from 'react'
import PopularCompanyCard from './PopularCompanyCard'
import { useGetAllCompaniesQuery } from '@/redux/features/company/companySlice'
import { Company } from '@/types/AllTypes'

export default function CompaniesList() {

  const [company,setCompany]=useState<Company[]>([])
  const {data:res} =useGetAllCompaniesQuery();

  useEffect(()=>{
         if(res?.data){
          setCompany(res.data)
         }
  },[res?.data])

  console.log(company)



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6  '>
        {
            [5,6,1,2].map((p, index) => <PopularCompanyCard key={index}/>)
        }
    </div>
  )
}
