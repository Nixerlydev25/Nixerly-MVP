"use client"

import type React from "react"

import Faq from "@/app/_components/Faq"
import Contact from "@/app/_components/Contact"
import Image from 'next/image'

export default function ContactPage() {

  return (
    <div className="flex min-h-screen flex-col py-10">
      {/* Hero Section */}
            <section className="px-4 lg:px-0 pb-10">
              <div className="bg-primary relative container mx-auto py-14 rounded-2xl">
        {/* <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div> */}
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto animate-fade-in rounded-2xl">
            <h1 className="text-2xl font-semibold tracking-wide sm:text-3xl md:text-4xl text-white">
            Let’s Talk With Us
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mt-12">
            {/* Phone */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Image src="/phones.svg" alt="Phone" width={20} height={20} className="w-5 h-5" />
              </div>
              <span className="text-base lg:text-lg font-medium">+353 (0) 1 234 5678</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Image src="/mail.svg" alt="Mail" width={20} height={20} className="w-5 h-5" />
              </div>
              <span className="text-base lg:text-lg font-medium">mailto:info@nixerly.com</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Image src="/mapPin.svg" alt="Map Pin" width={20} height={20} className="w-5 h-5" />
              </div>
              <span className="text-base lg:text-lg font-medium">Nixerly Ltd,
                        123 Business Park,
                        Dublin, Ireland</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Contact Form Section */}
     <Contact/>

      {/* FAQ Section */}
     <Faq/>

      {/* Map Section */}
      {/* <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-xl overflow-hidden shadow-nixerly-card border border-nixerly-lightblue/30 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d152515.98633727495!2d-6.385786675548627!3d53.32444313828915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e80ea27ac2f%3A0xa00c7a9973171a0!2sDublin%2C%20Ireland!5e0!3m2!1sen!2sus!4v1659701026088!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nixerly Office Location"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section> */}
    </div>
  )
}
