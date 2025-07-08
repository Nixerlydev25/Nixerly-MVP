import Image from "next/image"
import { Button } from "@/components/ui/button"
export default function (){
    return(
        <section className="bg-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="grid gap-60 lg:grid-cols-2">
            
             

            <div className=" ">
               <p className="text-xl flex gap-6 leading-5 font-medium text-primary tracking-tighter ">Contact Us <span className="w-12 h-1 rounded-full bg-primary mt-2"></span> </p>
                <h1 className="text-4xl font-bold leading-12 text-primary mt-6">Get In Touch</h1>
              <form className="mt-10 text-black">
                <div className=" ">
                  <div>
                
            
                    <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-3 font-normal text-[18px] leading-[22.84px] font-poppins w-full " />
                  </div>
                  <div>
                    <input type="email" placeholder="Your Email" className="border border-gray-300 font-normal text-[18px] leading-[22.84px] font-poppins rounded-md p-3 w-full mt-4" />
                  </div>
                </div>
                <div>


                  <textarea placeholder="Message" rows={4} className="border border-gray-300 rounded-md p-4 font-normal text-[18px] leading-[22.84px] font-poppins  w-full mt-4"></textarea>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full  text-white font-medium text-[15.598px] leading-[15.598px] font-inter  mt-6 ">Contact Us</Button>
              </form>
            </div>

{/* right part of form */}
            <div className="space-y-6">
              
              <h1 className="text-3xl  tracking-tighter text-gray-900 font-inter text-[28px] font-semibold leading-[28px]">Contact Us </h1>
              <p className="text-gray-600 max-w-[400px] font-inter text-base font-normal leading-7">
                Our reports will help you better understand your audience and target the right message to the right person. Send your email marketing campaign in a fast and simple way.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <Image
                src="/location.svg"
                alt="location icon"
                width={13}
                height={20}
                className="mr-1 h-5 w-5 text-blue-600 shrink-0 mt-0.5"
              />

                
                  <span className="text-gray-600 font-inter text-base font-normal leading-6">123 Street Name, City Name Here, United States</span>
                </div>
                <div className="flex items-center gap-4 font-inter text-base font-normal leading-6">
                    <Image
                src="/phone.svg"
                alt="phone icon"
                width={13}
                height={20}
                className="mr-1 h-5 w-5 text-blue-600 shrink-0 mt-0.5"
              />
                  <span className="text-gray-600 font-inter text-base font-normal leading-6">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                      <Image
                src="/textmessage.svg"
                alt="message  icon"
                width={13}
                height={20}
                className="mr-1 h-5 w-5 text-blue-600 shrink-0 mt-0.5"
              />
                  <span className="text-gray-600">info@example.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}