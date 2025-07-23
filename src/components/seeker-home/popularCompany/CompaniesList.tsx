'use client'
import React, { useEffect, useState } from 'react'
import PopularCompanyCard from './PopularCompanyCard'
import { useGetAllCompaniesQuery } from '@/redux/features/company/companySlice'
import { Company } from '@/types/AllTypes'

export default function CompaniesList() {

  const [companies,setCompanies]=useState<Company[]>([])
  const {data:res,isLoading} =useGetAllCompaniesQuery();



  useEffect(()=>{
    
         if(res?.data){
          setCompanies(res.data)
         }
  },[res?.data]);
  
  if(isLoading) return <p>Loading...</p>
  console.log(companies)



  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6  '>
        {
            companies?.map((company, index) => <PopularCompanyCard company={company} key={index}/>)
        }
    </div>
  )
}
