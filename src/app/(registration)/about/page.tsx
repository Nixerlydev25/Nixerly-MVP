"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Users, Building2, Award, Briefcase, ChevronDown, Phone, Mail, MapPin } from "lucide-react"



const faqs = [
  {
    question: "1. What types of construction services do you offer?",
    answer: "We offer residential, commercial, and industrial construction, including renovation and remodeling services.",
  },
  {
    question: "2. How long does a typical construction project take?",
    answer: "The duration depends on the project scope, but we provide a timeline after reviewing your requirements.",
  },
  {
    question: "3. Are your construction projects insured and licensed?",
    answer: "Yes, all our projects are fully insured and carried out by licensed professionals.",
  },
  {
    question: "4. Do you provide a warranty on your work?",
    answer: "Yes, we provide a warranty depending on the type of service. Details are included in the contract.",
  },
  {
    question: "5. Can you help with design and planning?",
    answer: "Absolutely! We offer complete design and planning services tailored to your needs.",
  },
]

const benefitCards = [
  {
    title: "For Construction Professional",
    image: "/frame17.png",
    buttonLabel: "Join as Professional",
    href: "/register",
    points: [
      "Showcase your skills and experience to potential employers",
      "Find consistent work with quality businesses",
      "Build a professional portfolio with verified credentials",
      "Manage your availability and job preferences",
    ],
  },
  {
    title: "For Construction Businesses",
    image: "/frame18.png",
    buttonLabel: "Join as Business",
    href: "/register",
    points: [
      "Find verified construction talent quickly and efficiently",
      "Reduce hiring risks with pre-verified professionals",
      "Post jobs and receive applications from qualified candidates",
      "Access a database of construction professionals with specific skills",
    ],
  },
]


export default function LandingPage() {

    const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className=" relative overflow-hidden py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid  lg:grid-cols-2 items-center">
            
            <div className="space-y-8 ">
               {/* <Image
          src="/boxes.svg"
                  alt="Construction site w and buildings"
                  width={221}
                  height={196}
                  className=""
                /> */}
              <Image
          src="/Layer1.png"
                  alt="Construction site w and buildings"
                  width={125}
                  height={42}
                  className=""
                />
              <h1 className=" md:text-5xl font-plus-jakarta font-medium leading-10 text-primary">About Us</h1>
              <p className="text-[#303236] font-inter text-xl font-normal leading-5 max-w-[600px]">
                Building the future of construction recruitment in Ireland.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 ">
                <Button size="lg" className="text-white font-inter text-sm font-medium leading-normal bg-primary rounded-full" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
        
                  className="text-black border-white hover:bg-primary hover:text-white bg-transparent font-inter text-sm font-medium leading-normal rounded-full"
                  asChild
                >
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/About1.png"
                  alt="Construction site with cranes and buildings"
                  width={600}
                  height={400}
                  className="rounded-lg "
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
        <section className="bg-primary  py-16">
      <div className="container mx-auto px-40">
        <div className="grid gap-8 md:grid-cols-4 items-center justify-center">
          <div className="flex flex-col items-center p-8 bg-white rounded-xl  ">
            <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-primary mb-8 ">500+</h3>
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
            <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-primary mb-8">1000+</h3>
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
            <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-primary mb-8">2500+</h3>
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
              <p className="text-black font-inter text-xl font-medium leading-5">Jobs Filled</p>
            </div>
          </div>

          <div className="flex flex-col items-center p-8 bg-white rounded-xl ">
            <h3 className="text-center font-inter text-5xl font-bold leading-[25.407px] uppercase text-primary mb-8">100+</h3>
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

      {/* Our Story Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/plant.png"
                  alt="Modern construction buildings"
                  width={570}
                  height={355}
                  className=""
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-900">Our Story</h2>
              <p className="text-gray-600 font-poppins text-lg font-medium leading-[30px]">
               <span className="text-primary">Nixerly</span>  was founded to address the critical labor shortage in the Irish construction industry. With 73%
                of construction companies citing access to skilled labor as their #1 challenge, we recognized the need
                for a specialized platform that connects construction professionals with businesses efficiently and
                effectively.
              </p>
              <p className="text-gray-600 font-poppins text-lg font-medium leading-[30px]">
                Our mission is to bridge the gap between talented construction professionals and the businesses that
                need them, helping to address Ireland's housing and infrastructure challenges through better workforce
                connections. 
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full  text-white font-medium text-[15.598px] leading-[15.598px] font-inter mt-6" asChild>
                <Link href="/register" className="flex items-center gap-2 ">
                  Learn More 
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-primary  py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex px-3 py-1 gap-2 text-white  mb-4 text-center font-inter text-[20px] font-normal leading-[20px] tracking-[2.4px]">
              Why Choose    <span className="text-white font-inter text-[20px] font-bold leading-[20px] tracking-[2.4px]">Nixerly</span>
            </div>
            <h2 className="text-3xl  tracking-normal sm:text-4xl md:text-5xl  text-white font-inter font-semibold leading-[48px] mb-4">
              Our <span  className="text-white font-inter text-[48px] font-semibold leading-[48px]">Benefits
                </span>
            </h2>
            <p className="mx-auto max-w-[600px]   text-white text-center font-inter text-[18px] font-normal leading-[24px]">
              How Nixerly benefits both construction professionals and businesses.
            </p>
          </div>
<div className="grid gap-8 md:grid-cols-2 mx-auto">
  {benefitCards.map((card, index) => (
    <div
      key={index}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center mb-6">
        <Image
          src={card.image}
          alt={card.title}
          width={580}
          height={258}
          className="rounded-lg w-full"
        />
      </div>
      <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1  inline-block mb-4 font-poppins leading-[18px]">
        Construction
      </div>
      <h3 className="font-montserrat text-[28px] font-semibold leading-[28px] capitalize text-primary mb-6">{card.title}</h3>
      <ul className="space-y-3">
        {card.points.map((point, i) => (
          <li key={i} className="flex items-start">
            <Image
              src="/arrow.svg"
              alt="arrow"
              width={25}
              height={25}
              className="mr-3 h-5 w-5 text-blue-600 shrink-0 mt-0.5"
            />
            <span className="text-gray-600 font-montserrat text-base font-medium leading-[16px]">{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full text-white font-inter text-sm font-medium leading-normal" asChild>
          <Link href={card.href}>{card.buttonLabel}</Link>
        </Button>
      </div>
    </div>
  ))}
</div>

         
        </div>
      </section>

      {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            
            <div className="grid gap-60 lg:grid-cols-2">
              
               

              <div className=" ">
                 <p className="text-xl flex gap-6 leading-5 font-medium text-primary tracking-tighter ">Contact Us <span> <Image
                  src="/line.png"
                  alt="Construction professionals"
                  width={30}
                  height={2}
                  className="mt-[10px] h-1 w-15 text-blue-600 shrink-0"
                /></span> </p>
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

      {/* FAQ Section */}
     <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex gap-3 font-medium mb-4">
             <Image
                  src="/updown.svg"
                  alt="Construction professionals"
                  width={32}
                  height={32}
                  className="mt-[10px]  text-blue-600 shrink-0"
                />
                <span className="text-xl mt-1  text-[#0011B7]">FAQ</span>
          </div> 

          <h2 className=" text-gray-900 text-center font-plusjakarta text-[44px] font-semibold leading-[52px] tracking-[-1.76px]">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className=" text-gray-900 font-plusjakarta text-[20px] font-semibold leading-normal">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>

              {openIndex === index && (
                <p className="text-gray-600 mt-4 font-plusjakarta text-base font-normal leading-[26px]">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}
