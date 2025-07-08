import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import Contact from "@/app/_components/Contact"

export default function Prices() {
  const plans = [
    {
      name: "Basic",
      price: 12,
      description: "To familiarize yourself with our tools",
      features: ["Profile Views", "Searches", "Job Post", "Own analytics platform", "Notes", "Connect with Experts"],
    },
    {
      name: "Standard",
      price: 52,
      description: "For most businesses that want to optimize web queries",
      features: ["Profile Views", "Searches", "Job Post", "Own analytics platform", "Notes", "Connect with Experts"],
    },
    {
      name: "Premium",
      price: 99,
      description: "For professionals who want to scale business globally",
      features: ["Profile Views", "Searches", "Job Post", "Own analytics platform", "Notes", "Connect with Experts"],
    },
  ]

  return (
    <section className="py-16 px-4 lg:px-0 bg-[#F4F6F8]">
      <div className="max-w-7xl mx-auto pb-10">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-gray-600 mb-2 tracking-wider">PRICING</p>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose <span className="text-primary">Your Plan</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            We help you in finding solutions to your problem
            <br />
            in your startup business
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-15 bg-white">
          {plans.map((plan, index) => (
            <Card key={plan.name} className="relative bg-white overflow-hidden border-0 shadow-md py-0">
              {/* Blue Header */}
              <div className="bg-primary text-white p-8 h-56 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold mb-6">
                    ${plan.price}
                    <span className="text-lg font-normal opacity-90">/month</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{plan.name}</h3>
                </div>
                <p className="text-base font-medium leading-relaxed pb-5">{plan.description}</p>
              </div>

              {/* Features List */}
              <CardContent className="p-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center">
                        <Image src="/checkbox.svg" alt="checkbox" width={24} height={24}/>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Buy Now Button */}
                <button
                  className="w-full py-3 rounded-full text-base font-medium border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  Buy Now
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Contact/>
    </section>
  )
}
