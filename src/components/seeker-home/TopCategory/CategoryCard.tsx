import React from 'react'
import Image from 'next/image';
import { IoIosArrowForward } from 'react-icons/io';

interface CategoryType {
    icon: string;
    name: string


}

interface CType {
    category: CategoryType

}


export default function CategoryCard({ category }: CType) {


    const bgColors = [
        'bg-red-600', 'bg-green-600', 'bg-blue-600',
        'bg-yellow-600', 'bg-purple-600', 'bg-pink-600',
        'bg-orange-600', 'bg-teal-600'
    ];
    const randomColor = bgColors[Math.floor(Math.random() * bgColors.length)];


    return (
        <div className='p-[20px] flex gap-4 border border-gray-300 rounded-md shadow-md '>
            <div className={`${randomColor} p-[9px] rounded-full `}>
                <Image
                    src={category.icon}
                    alt='icon'
                    width={24}
                    height={24}
                />

            </div>
            <div className='flex justify-center items-center '>
                <p className='text-lg text-scheer-primary-dark flex '>{category.name}<IoIosArrowForward className='my-auto' /></p>

            </div>
        </div>
    )
}
