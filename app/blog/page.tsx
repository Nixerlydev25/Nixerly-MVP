import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BlogPage() {
  // Sample blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Addressing Ireland's Construction Labor Shortage",
      excerpt:
        "An in-depth look at the challenges facing the Irish construction industry and how digital solutions can help.",
      date: "April 15, 2025",
      author: "John O'Connor",
      image: "/busy-city-construction.png",
    },
    {
      id: 2,
      title: "The Future of Construction Recruitment",
      excerpt: "How technology is transforming how construction professionals and businesses connect in Ireland.",
      date: "April 10, 2025",
      author: "Sarah Murphy",
      image: "/connected-construction-site.png",
    },
    {
      id: 3,
      title: "Building a Stronger Construction Workforce",
      excerpt: "Strategies for addressing the skills gap and building a sustainable construction workforce in Ireland.",
      date: "April 5, 2025",
      author: "Michael Kelly",
      image: "/construction-skills-future.png",
    },
    {
      id: 4,
      title: "The Impact of Digital Transformation in Construction",
      excerpt: "How digital tools are changing the way construction projects are planned, executed, and staffed.",
      date: "March 28, 2025",
      author: "Emma Walsh",
      image: "/interconnected-construction-site.png",
    },
    {
      id: 5,
      title: "Navigating the Construction Labor Market in 2025",
      excerpt: "Current trends, challenges, and opportunities in Ireland's construction labor market.",
      date: "March 20, 2025",
      author: "David O'Brien",
      image: "/construction-site-growth.png",
    },
    {
      id: 6,
      title: "The Role of Verification in Construction Hiring",
      excerpt:
        "Why verification of skills and credentials is crucial for both professionals and businesses in construction.",
      date: "March 15, 2025",
      author: "Laura Doyle",
      image: "/construction-credentials-check.png",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="nixerly-gradient-bg py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="nixerly-heading text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Construction Insights</h1>
              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                The latest news, trends, and insights from the Irish construction industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 md:py-24 bg-nixerly-lightblue/5">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col overflow-hidden rounded-lg border border-nixerly-lightblue bg-white shadow-md hover:shadow-lg transition-shadow">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="aspect-video object-cover"
                />
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-nixerly-blue">{post.title}</h3>
                    <p className="text-gray-600">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-nixerly-coral">By {post.author}</span>
                    </div>
                    <div className="text-gray-500">{post.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
