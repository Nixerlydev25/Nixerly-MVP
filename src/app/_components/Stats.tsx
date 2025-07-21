import Image from "next/image"
export default function Stats(){
    return(
        <section className="bg-nixerly-blue py-16">
        <div className="container mx-auto px-40">
          <div className="grid gap-8 md:grid-cols-4 items-center justify-center">
            <div className="flex flex-col items-center p-8 bg-white rounded-xl  ">
              <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-nixerly-blue mb-8 ">500+</h3>
              <div className="flex items-center gap-3 ">
                
                <div className=" bg-gray-200 border rounded-full p-2">
                <Image
                    src="/hotel.png"
                    alt="Construction site with cranes and buildings"
                    width={20}
                    height={20}
                    className=""
                  />
                </div>
         
     
  
                <p className="text-black font-inter text-xl font-medium leading-5">Companies</p>
              </div>
            </div>
  
            <div className="flex flex-col items-center p-8 bg-white rounded-xl ">
              <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-nixerly-blue mb-8">1000+</h3>
              <div className="flex items-center gap-3">
                         <div className=" bg-gray-200 border rounded-full p-2">
                      <Image
                    src="/checkhuman.png"
                    alt="Construction site with cranes and buildings"
                    width={20}
                    height={20}
                    className=""
                  />
  
                </div>
                <p className="text-black font-inter text-xl font-medium leading-5">Professional</p>
              </div>
            </div>
  
            <div className="flex flex-col items-center p-8 bg-white rounded-xl ">
              <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-nixerly-blue mb-8">2500+</h3>
              <div className="flex items-center gap-3">
                    <div className=" bg-gray-200 border rounded-full p-2">
                    <Image
                    src="/building.png"
                    alt="Construction site with cranes and buildings"
                    width={20}
                    height={20}
                    className=""
                  />
  
                </div>
                <p className="text-black font-inter text-xl font-medium leading-5">Cities</p>
              </div>
            </div>
  
            <div className="flex flex-col items-center p-8 bg-white rounded-xl ">
              <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-nixerly-blue mb-8">100+</h3>
              <div className="flex items-center gap-3">
                    <div className=" bg-gray-200 border rounded-full p-2">
                    <Image
                    src="/message.png"
                    alt="Construction site with cranes and buildings"
                    width={20}
                    height={20}
                    className=""
                  />
  
                </div>
                <p className="text-black font-inter text-xl font-medium leading-5">Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}