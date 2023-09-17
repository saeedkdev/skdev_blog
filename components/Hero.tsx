import Link from 'next/link'
import { FiGithub } from 'react-icons/fi'

function Hero() {
    return (
        <div className="flex justify-between items-center bg-gradient-to-r from-red-400 to-yellow-300 border-y border-black py-10 lg:py-0 "> 
            <div className='max-w-7xl flex mx-auto'>
                <div className="p-[130px] space-y-5 flex-col">
                    <h1 className="text-6xl max-w-xl font-serif">
                        Learn the <span className="underline decoration-black decoration-4">Craft</span> , Think Like a Pro, Connect with Me
                    </h1>
                    <h2 className="font-serif">
                        Grab a cup of coffee, find a comfortable seat, and let's embark on this exciting journey together.
                    </h2>
                </div>
                <div className="flex flex-col">
                    <img className="hidden md:inline-flex h-32 lg:h-full" src="/sk.png" alt="sk" />
                </div>
            </div>
        </div>
    )
}

export default Hero;
