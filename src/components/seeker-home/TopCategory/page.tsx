import React from 'react'
import AllCategory from './AllCategory'
import Container from '@/components/ui/Container'


export default function TopCategory() {
    return (
        <div>
            <Container>
                 <h1 className='text-2xl md:text-5xl font-semibold text-center mb-12'> Top Seaching Category  </h1>
                <AllCategory />

            </Container>

        </div>
    )
}
