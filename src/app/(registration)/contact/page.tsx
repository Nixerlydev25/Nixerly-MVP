"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, HelpCircle, ChevronRight } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would send this data to your backend
    console.log("Form submitted:", formData)

    // toast({
    //   title: "Message Sent",
    //   description: "Thank you for your message. We'll get back to you soon.",
    // })

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const faqs = [
    {
      question: "When will Nixerly launch?",
      answer:
        "Nixerly is currently in active development. We expect to launch our MVP in Q3 2025, with a full platform launch by the end of 2025.",
    },
    {
      question: "How much does it cost to use Nixerly?",
      answer:
        "Nixerly will offer different subscription plans for businesses, while professionals can create basic profiles for free. Detailed pricing will be announced closer to launch.",
    },
    {
      question: "How does the verification process work?",
      answer:
        "Our verification process includes checking professional credentials, certifications, and work history. For businesses, we verify company registration details and other relevant information.",
    },
    {
      question: "Can I join the platform before the official launch?",
      answer:
        "Yes! We're looking for early adopters to test and provide feedback on our platform. Register your interest and we'll contact you about early access opportunities.",
    },
    {
      question: "Is Nixerly only for Irish construction professionals and businesses?",
      answer:
        "Initially, we're focusing on the Irish construction market to address the specific challenges here. We may expand to other regions in the future.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-nixerly-gradient relative container mx-auto overflow-hidden md:py-14 my-14 rounded-2xl">
        {/* <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div> */}
        <div className="container mx-auto max-w-7xl md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto animate-fade-in rounded-2xl">
            <h1 className="text-2xl font-normal tracking-tighter sm:text-3xl md:text-5xl text-white">
            Let’s Talk With Us
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6 mt-12">
            {/* Phone */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">(000) 012 345 678</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">youremail@gmail.com</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/90">
              <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-lg font-medium">Seddon Park, Auckland, New Zealand</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-nixerly-light-gradient py-20 md:py-28 relative">
        {/* <div className="absolute top-0 inset-x-0 h-20 bg-nixerly-gradient opacity-10"></div> */}
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium mb-2">
              Reach Out
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-nixerly-darkblue">
                We&apos;d Love to Hear From You
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed">
                Whether you have questions about our platform or want to join as an early adopter, 
                our team is ready to assist you.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in">
              <CardHeader className="bg-nixerly-ultralightblue border-b border-nixerly-lightblue/30 p-6">
                <CardTitle className="text-2xl font-bold text-nixerly-darkblue flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-nixerly-blue" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-nixerly-darkgray mt-2">
                  Fill out the form and our team will get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-nixerly-darkblue">Your Name</label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-nixerly-lightblue/50 focus:border-nixerly-blue focus:ring-nixerly-blue rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-nixerly-darkblue">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-nixerly-lightblue/50 focus:border-nixerly-blue focus:ring-nixerly-blue rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-nixerly-darkblue">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-nixerly-lightblue/50 focus:border-nixerly-blue focus:ring-nixerly-blue rounded-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-nixerly-darkblue">Your Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please describe how we can help you"
                      value={formData.message}
                      onChange={handleChange}
                      className="min-h-[180px] border-nixerly-lightblue/50 focus:border-nixerly-blue focus:ring-nixerly-blue rounded-lg"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px] rounded-lg h-12 mt-2"
                  >
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 animate-slide-up">
              <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                <CardHeader className="bg-nixerly-ultralightblue border-b border-nixerly-lightblue/30 p-6">
                  <CardTitle className="text-2xl font-bold text-nixerly-darkblue flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-nixerly-coral" />
                    Contact Information
                  </CardTitle>
                  <CardDescription className="text-nixerly-darkgray mt-2">
                    Reach out to us through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-start p-4 rounded-lg bg-nixerly-ultralightblue/50 transition-all duration-300 hover:bg-nixerly-ultralightblue">
                    <Mail className="mr-4 h-6 w-6 text-nixerly-coral" />
                    <div>
                      <h3 className="font-medium text-nixerly-darkblue">Email Address</h3>
                      <a href="mailto:info@nixerly.com" className="text-nixerly-blue hover:text-nixerly-coral transition-colors duration-300">info@nixerly.com</a>
                    </div>
                  </div>
                  <div className="flex items-start p-4 rounded-lg bg-nixerly-ultralightblue/50 transition-all duration-300 hover:bg-nixerly-ultralightblue">
                    <Phone className="mr-4 h-6 w-6 text-nixerly-coral" />
                    <div>
                      <h3 className="font-medium text-nixerly-darkblue">Phone Number</h3>
                      <a href="tel:+35312345678" className="text-nixerly-darkgray">+353 (0) 1 234 5678</a>
                    </div>
                  </div>
                  <div className="flex items-start p-4 rounded-lg bg-nixerly-ultralightblue/50 transition-all duration-300 hover:bg-nixerly-ultralightblue">
                    <MapPin className="mr-4 h-6 w-6 text-nixerly-coral" />
                    <div>
                      <h3 className="font-medium text-nixerly-darkblue">Office Address</h3>
                      <p className="text-nixerly-darkgray">
                        Nixerly Ltd<br />
                        123 Business Park<br />
                        Dublin, Ireland
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-nixerly-darkblue mb-4">Follow Us</h3>
                  <div className="flex gap-4">
                    <a href="#" className="bg-nixerly-ultralightblue text-nixerly-blue hover:bg-nixerly-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </a>
                    <a href="#" className="bg-nixerly-ultralightblue text-nixerly-blue hover:bg-nixerly-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <a href="#" className="bg-nixerly-ultralightblue text-nixerly-blue hover:bg-nixerly-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href="#" className="bg-nixerly-ultralightblue text-nixerly-blue hover:bg-nixerly-blue hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-nixerly-ultralightblue py-20 md:py-28">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-white text-nixerly-darkblue text-sm font-medium mb-2">
              Quick Answers
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-nixerly-darkblue flex items-center justify-center gap-3">
                <HelpCircle className="h-8 w-8 text-nixerly-coral" />
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed">
                Find answers to common questions about the Nixerly platform.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl">
            <Card className="border border-nixerly-lightblue/30 shadow-nixerly-card rounded-xl bg-white hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`item-${index}`} 
                      className="border-nixerly-lightblue/30 px-2"
                    >
                      <AccordionTrigger className="text-lg font-medium text-nixerly-darkblue hover:text-nixerly-coral transition-colors duration-300 py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-nixerly-darkgray pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            <div className="mt-12 text-center">
              <p className="text-nixerly-darkgray mb-6">Still have questions? Feel free to reach out to our team.</p>
              <Button className="bg-nixerly-coral hover:bg-nixerly-darkcoral shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                <Link href="/register" className="flex items-center gap-2">
                  Join Nixerly Today <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-white py-20">
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
      </section>
    </div>
  )
}
