import Image from "next/image"

interface StatItem {
  value: string
  label: string
  icon: string
  iconAlt: string
}

const statsData: StatItem[] = [
  {
    value: "500+",
    label: "Companies",
    icon: "/hotel.png",
    iconAlt: "Hotel icon representing companies"
  },
  {
    value: "1000+",
    label: "Professional",
    icon: "/checkhuman.png",
    iconAlt: "Human check icon representing professionals"
  },
  {
    value: "2500+",
    label: "Cities",
    icon: "/building.png",
    iconAlt: "Building icon representing cities"
  },
  {
    value: "100+",
    label: "Reviews",
    icon: "/message.png",
    iconAlt: "Message icon representing reviews"
  }
]

export default function Stats() {
  return (
    <section className="bg-nixerly-blue py-16">
      <div className="container mx-auto px-4 lg:px-40">
        <div className="grid gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center p-4 lg:p-8 bg-white rounded-xl">
              <h3 className="text-center font-inter text-3xl lg:text-5xl font-bold leading-[25.407px] uppercase text-nixerly-blue mb-4 lg:mb-8">
                {stat.value}
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 border rounded-full p-2">
                  <Image
                    src={stat.icon}
                    alt={stat.iconAlt}
                    width={20}
                    height={20}
                    className="w-3 lg:w-5 h-3 lg:h-5"
                  />
                </div>
                <p className="text-black font-inter text-sm lg:text-xl font-medium leading-5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}