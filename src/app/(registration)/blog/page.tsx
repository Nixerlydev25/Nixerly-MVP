import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function BlogPage() {
  // Popular blog posts
  const popularPosts = [
    {
      id: 1,
      title: "Addressing Ireland's Construction Labor Shortage",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.2K Views",
      image: "/blog1.png",
      excerpt:
        "An in-depth look at the challenges facing the Irish construction industry and how digital solutions can help bridge the talent gap and improve workforce efficiency.",
    },
    {
      id: 2,
      title: "Addressing Ireland's Construction Labor Shortage",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.2K Views",
      image: "/blog2.png",
      excerpt:
        "An in-depth look at the challenges facing the Irish construction industry and how digital solutions can help bridge the talent gap and improve workforce efficiency.",
    },
    {
      id: 3,
      title: "Addressing Ireland's Construction Labor Shortage",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.2K Views",
      image: "/blog3.png",
      excerpt:
        "An in-depth look at the challenges facing the Irish construction industry and how digital solutions can help bridge the talent gap and improve workforce efficiency.",
    },
  ];

  // Recent publications
  const recentPosts = [
    {
      id: 1,
      title: "The Future of Construction Recruitment",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.5K Views",
      category: "Technology",
      image: "/blog4.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nisl, volutpat nisl, tincidunt commodo. Viverra rutrum et molestie vitae accumsan eget mi nunc pretium. Odio sed",
    },
    {
      id: 2,
      title: "Building a Stronger Construction Workforce",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.5K Views",
      category: "Skill",
      image: "/blog5.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nisl, volutpat nisl, tincidunt commodo. Viverra rutrum et molestie vitae accumsan eget mi nunc pretium. Odio sed",
    },
    {
      id: 3,
      title: "The Impact of Digital Transformation in Construction",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.5K Views",
      category: "Technology",
      image: "/blog6.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nisl, volutpat nisl, tincidunt commodo. Viverra rutrum et molestie vitae accumsan eget mi nunc pretium. Odio sed",
    },
    {
      id: 4,
      title: "Navigating the Construction Labor Market in 2025",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.5K Views",
      category: "Market Trends",
      image: "/blog7.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nisl, volutpat nisl, tincidunt commodo. Viverra rutrum et molestie vitae accumsan eget mi nunc pretium. Odio sed",
    },
    {
      id: 5,
      title: "The Role of Verification in Construction Hiring",
      author: "Ali Salman",
      authorImage: "/salman.jpeg",
      date: "18 August 2024",
      views: "6.5K Views",
      category: "Hiring",
      image: "/blog8.png",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem nisl, volutpat nisl, tincidunt commodo. Viverra rutrum et molestie vitae accumsan eget mi nunc pretium. Odio sed",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F9FF] ">
      {/* Most Popular Blogs Section */}
      <section className="py-12 px-4 md:px-10 bg-[#F6F9FF]">
        <div className="container mx-auto ">
          <h2 className="text-[#26344E] font-inter text-4xl font-light mb-8  ">
            Most{" "}
            <span className=" text-nixerly-blue font-inter text-4xl font-semibold">
              Popular Blogs
            </span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3  ">
            {popularPosts.map((post) => (
              <div
                key={post.id}
                className="shadow-sm overflow-hidden hover:shadow-md transition-shadow rounded-xl border border-[#E1E4EA] bg-white"
              >
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className=" mb-3 line-clamp-2 text-[#141414] font-montserrat text-lg font-medium leading-7">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                      <Image
                        src={post.authorImage || "/placeholder.svg"}
                        alt={post.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="  font-poppins text-sm font-medium">
                        {post.author}
                      </div>
                      <div>{post.date}</div>
                    </div>
                    <div className="ml-auto mb-5 text-gray-500 font-poppins text-sm font-normal">
                      {post.views}
                    </div>
                  </div>
                  <p className=" mb-4 line-clamp-3 text-[#787676] font-poppins text-sm font-normal">
                    {post.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="text-[#1e64d3] text-sm  hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Recent Publications Section */}
      <section className="py-12 px-4 md:px-10 bg-white">
        <div className="container mx-auto">
          <h2 className="text-[#26344E] font-inter text-4xl font-light mb-8  ">
            Our{" "}
            <span className=" text-nixerly-blue font-inter text-4xl font-semibold">
              Recent Publications{" "}
            </span>
          </h2>

          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white  rounded-xl border border-[#E1E4EA] "
              >
                <div className="flex flex-col md:flex-row ">
                  <div className="md:w-64 aspect-video md:aspect-square overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={403}
                      height={308}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className=" text-gray-900 mb-2 font-urbanist text-xl font-medium">
                        {post.title}
                      </h3>
                      <span className="bg-blue-100 text-nixerly-blue text-xs px-2 py-1  whitespace-nowrap ml-4">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full relative overflow-hidden">
                          <Image
                            src={post.authorImage || "/placeholder.svg"}
                            alt={post.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium  font-poppins text-sm ">
                          {post.author}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{post.date}</span>
                      </div>
                      <div className="ml-auto  text-gray-500 font-poppins text-sm font-normal">
                        {post.views}
                      </div>
                    </div>

                    <p className=" mb-4 line-clamp-3  text-[#787676] font-poppins text-sm font-normal">
                      {post.excerpt}
                    </p>

                    <Button
                      variant="outline"
                      size="sm"
                      className="font-inter text-xl text-primary hover:text-black  border !border-blue-300  rounded-full "
                    >
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-6 my-10 ">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-nixerly-blue">Join Our</span>{" "}
                <span className="text-black">Newsletter</span>
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                Get the latest construction industry insights delivered straight
                to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 text-gray-600 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button className=" bg-nixerly-blue hover:bg-blue-700 text-white px-8 py-6 rounded-md font-medium">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Image
                  src="buildzor.svg"
                  alt="Construction equipment illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
