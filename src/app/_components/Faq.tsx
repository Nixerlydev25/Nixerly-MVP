"use client"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
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
export default function Faq(){
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }
    return(
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
              <div key={index} className="bg-white rounded-lg border border-gray-200 py-6">
                <div
                  className="flex items-center justify-between cursor-pointer px-6"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className={`text-gray-900 font-plusjakarta text-xl leading-normal ${openIndex === index ? 'font-semibold' : 'font-normal'}`}>{faq.question}</h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <>
                    <div className="border-t border-gray-200 my-4"></div>
                    <p className="text-gray-600 font-plusjakarta text-base font-normal leading-[26px] px-6">{faq.answer}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}