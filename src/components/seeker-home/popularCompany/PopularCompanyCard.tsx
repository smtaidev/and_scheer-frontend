import Image from 'next/image';

export default function PopularCompanyCard() {
    return (
        <div className="w-full md:max-w-[457px] mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-[18px]">
            <div className="relative ">
                <Image
                    src="/c1.jpg" // Add your actual image in the public folder
                    alt="Office Space"
                     className='rounded-lg'
                    objectFit="cover"
                    width={421} 
                    height={270}
                />

                <div className='bg-white rounded-tr-lg pt-2 pr-2 absolute bottom-0'>
                  
                    <div className=" bg-purple-600 text-white text-sm font-medium rounded-tr-lg p-3 w-[84px] h-[84px]  flex items-center justify-center ">
                        <div className=" text-white rounded-full font-bold text-3xl">
                            SMT
                        </div>
                    </div>
                </div>

            </div>

            <div className="p-4">
                <div className="flex items-center space-x-4">
                    <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                        SMT
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">SM Technology</h3>
                        <p className="text-sm text-gray-500">Software Company</p>
                    </div>
                </div>

                <div className="mt-4 flex items-center text-yellow-500 space-x-1">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.868 1.4-8.168-5.934-5.787 8.2-1.191z" />
                    </svg>
                    <span className="text-sm font-semibold">4.9</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-700">
                    <span className="bg-gray-100 px-3 py-1 rounded">Software Company</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">256 Employees</span>
                    <span className="bg-gray-100 px-3 py-1 rounded">Two slots left</span>
                </div>
            </div>
        </div>
    );
}