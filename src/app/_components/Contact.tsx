"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Contact form submitted:", form)
    setForm({ name: "", email: "", message: "" })
  }

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:gap-60 lg:grid-cols-2">
          <div className=" ">
            <p className="text-xl flex gap-6 leading-5 font-medium text-nixerly-blue tracking-tighter ">Contact Us <span className="w-12 h-1 rounded-full bg-nixerly-blue mt-2"></span> </p>
            <h1 className="text-4xl font-bold leading-12 text-nixerly-blue mt-6">Get In Touch</h1>
            <form className="mt-10 text-black" onSubmit={handleSubmit}>
              <div className=" ">
                <div>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="border border-gray-300 rounded-md p-3 font-normal text-[18px] leading-[22.84px] font-poppins w-full "
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="border border-gray-300 font-normal text-[18px] leading-[22.84px] font-poppins rounded-md p-3 w-full mt-4"
                  />
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows={4}
                  className="border border-gray-300 rounded-md p-4 font-normal text-[18px] leading-[22.84px] font-poppins w-full mt-4"
                  style={{ height: "180px", resize: "none" }}
                ></textarea>
              </div>
              <Button type="submit" className="bg-nixerly-blue hover:bg-blue-700 rounded-full  text-white font-medium text-[15.598px] leading-[15.598px] font-inter  mt-6 ">
                Contact Us
              </Button>
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
                  className="mr-1 h-5 w-5 text-nixerly-blue shrink-0 mt-0.5"
                />
                <span className="text-gray-600 font-inter text-base font-normal leading-6">34 Street Name, City Name Here, United States.</span>
              </div>
              <div className="flex items-center gap-4 font-inter text-base font-normal leading-6">
                <Image
                  src="/phone.svg"
                  alt="phone icon"
                  width={13}
                  height={20}
                  className="mr-1 h-5 w-5 text-nixerly-blue shrink-0 mt-0.5"
                />
                <span className="text-gray-600 font-inter text-base font-normal leading-6">+1 (222) 345 6789</span>
              </div>
              <div className="flex items-center gap-4">
                <Image
                  src="/textmessage.svg"
                  alt="message  icon"
                  width={13}
                  height={20}
                  className="mr-1 h-5 w-5 text-nixerly-blue shrink-0 mt-0.5"
                />
                <span className="text-gray-600">info@mywebsite.com </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}