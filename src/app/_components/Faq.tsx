"use client"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "1. How do I create a professional profile that stands out?",
    answer: "Start by uploading high-quality photos of your best work - before, during, and after shots that show your attention to detail. Write a brief description of your expertise and what sets your work apart. Include any certifications or specializations you have. The key is showing potential clients the quality and craftsmanship they can expect.",
  },
  {
    question: "2. Is Nixerly really free for tradespeople?",
    answer: "Yes, completely free. You can create your profile, upload unlimited project photos, connect with clients, and build your reputation at no cost. We believe skilled professionals shouldn't have to pay to showcase their expertise. Businesses pay subscription fees to access our network of quality tradespeople",
  },
  {
    question: "3. How do I get noticed by quality clients?",
    answer: "Focus on showcasing your best work with clear, well-lit photos. Write detailed descriptions of challenging projects you've completed. Respond promptly to client inquiries and maintain a professional profile. Quality clients are looking for professionals who take pride in their work and communicate clearly.",
  },
  {
    question: "4.What types of projects can I find on Nixerly?",
    answer: "Our platform connects you with businesses looking for skilled professionals across all construction trades - from small repairs and renovations to large commercial projects. The focus is on connecting you with clients who value quality workmanship over the lowest price",
  },
  {
    question: "5. How does Nixerly work?",
    answer: "Nixerly is a platform where skilled tradespeople create professional profiles showcasing their work, and clients search for professionals in their area. It's like a professional portfolio that helps quality clients find quality tradespeople. Think of it as LinkedIn for the construction trades.",
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