
export default function HeroSection(){
    return(
        <div className="max-w-3xl mx-auto py-20 text-center">
            <h1 className="text-4xl font-semibold ">Track Your <span className="text-orange-400"> True </span> LeetCode Progress</h1>
            <h3 className="text-white/40 mt-2 text-lg ">Solving problems across multiple accounts? We combine them all and show you exactly how many unique problems you've actually solved.</h3>
           <div className="flex gap-6 justify-center mt-4">
            <p > <span className="text-green-400"> ✓ </span> No signup required</p>
            <p > <span className="text-green-400"> ✓ </span>Just enter your username</p>
            </div>
        </div>
    )
}