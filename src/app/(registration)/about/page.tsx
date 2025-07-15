"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { CheckCircle2, Users, Building2, Award, Briefcase, ChevronDown, Phone, Mail, MapPin } from "lucide-react"
import Faq from "@/app/_components/Faq"
import Contact from "@/app/_components/Contact"
import Stats from "@/app/_components/Stats"



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
    image: "/Professional.png",
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
    image: "/Businesses.png",
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
      <section className="relative overflow-hidden py-20 md:py-11 container mx-auto">
        {/* Boxes image absolutely positioned at the top */}
        <div className="absolute top-5 left-0 z-10">
          <Image
            src="/boxes.svg"
            alt="Construction site and buildings"
            width={221}
            height={196}
            className=""
          />
        </div>
        <div className="px-4 md:pl-10 relative">
          <div className="grid  lg:grid-cols-2 items-center">
            
            <div className="space-y-8">
              <Image
          src="/Layer1.png"
                  alt="Construction site w and buildings"
                  width={100}
                  height={100}
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
                  className="w-[700px] h-[576px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
    <Stats/>

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
              <Button className="bg-nixerly-blue hover:bg-blue-700 rounded-full  text-white font-medium text-[15.598px] leading-[15.598px] font-inter mt-6" asChild>
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
      className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300"
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
              className="mr-3 h-5 w-5 text-nixerly-blue shrink-0 mt-0.5"
            />
            <span className="text-gray-600 font-montserrat text-base font-medium leading-[16px]">{point}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Button className="bg-nixerly-blue hover:bg-blue-700 rounded-full text-white font-inter text-sm font-medium leading-normal" asChild>
          <Link href={card.href}>{card.buttonLabel}</Link>
        </Button>
      </div>
    </div>
  ))}
</div>

         
        </div>
      </section>
    <Contact/>
   <Faq/>
    </div>
  )
}
