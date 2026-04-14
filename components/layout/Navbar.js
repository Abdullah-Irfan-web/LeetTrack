import { Code2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import githublogo from '../../public/github.png';
export default function Navbar() {
    return (
  
     
     
     <div className="flex items-center justify-between px-2 py-1 ">

        <div className='flex items-center justify-center gap-2 '>

        <div className="text-3xl font-semibold ">LeetTrack </div>
        <Code2 size={38} className=' text-orange-400'/>
       
        </div>
        <div className='mr-10 ml-1'>
            <p className="text-white/40 ">100% Free & Open Source</p>
        </div>

      
            <Link href="github.com">

            <Image src={githublogo}
            height={70}
            width={70}
            alt='Github'
            />
            
           </Link>
            
       
     </div>
    
        );
  }
  