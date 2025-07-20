
import React from 'react'
import CompaniesList from './CompaniesList'
import Link from 'next/link'
import { IoMdArrowForward } from 'react-icons/io'
import Container from '@/components/ui/Container'

export default function PopularCompany() {
  return (
    <div>
      <Container>
               <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'>Top Popular Companies</h1>
               <CompaniesList/>
                 <div className='flex justify-center items-center mt-9 md:mt-14'>
                    <Link href={"/viewalljobs"}>
                        <button className='border border-gray-400 text-scheer-primary-dark rounded font-medium py-[11px] px-6 flex'>View all Companies <IoMdArrowForward className='ml-2 my-auto'/></button>
                    </Link>
                </div>

      </Container>
        
    </div>
  )
}
