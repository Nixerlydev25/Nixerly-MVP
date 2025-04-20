import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { BookOpen, Calendar, User, ArrowRight, Clock } from "lucide-react"

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
      readTime: "8 min read",
      category: "Industry"
    },
    {
      id: 2,
      title: "The Future of Construction Recruitment",
      excerpt: "How technology is transforming how construction professionals and businesses connect in Ireland.",
      date: "April 10, 2025",
      author: "Sarah Murphy",
      image: "/connected-construction-site.png",
      readTime: "6 min read",
      category: "Technology"
    },
    {
      id: 3,
      title: "Building a Stronger Construction Workforce",
      excerpt: "Strategies for addressing the skills gap and building a sustainable construction workforce in Ireland.",
      date: "April 5, 2025",
      author: "Michael Kelly",
      image: "/construction-skills-future.png",
      readTime: "7 min read",
      category: "Skills"
    },
    {
      id: 4,
      title: "The Impact of Digital Transformation in Construction",
      excerpt: "How digital tools are changing the way construction projects are planned, executed, and staffed.",
      date: "March 28, 2025",
      author: "Emma Walsh",
      image: "/interconnected-construction-site.png",
      readTime: "5 min read",
      category: "Technology"
    },
    {
      id: 5,
      title: "Navigating the Construction Labor Market in 2025",
      excerpt: "Current trends, challenges, and opportunities in Ireland's construction labor market.",
      date: "March 20, 2025",
      author: "David O'Brien",
      image: "/construction-site-growth.png",
      readTime: "6 min read",
      category: "Market Trends"
    },
    {
      id: 6,
      title: "The Role of Verification in Construction Hiring",
      excerpt:
        "Why verification of skills and credentials is crucial for both professionals and businesses in construction.",
      date: "March 15, 2025",
      author: "Laura Doyle",
      image: "/construction-credentials-check.png",
      readTime: "4 min read",
      category: "Hiring"
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-nixerly-gradient relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-pattern bg-repeat opacity-10"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium mb-2">
              Industry Knowledge Hub
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Construction Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed">
              The latest news, trends, and insights from the Irish construction industry.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <BookOpen className="h-5 w-5 text-nixerly-coral" />
              <span className="text-white">Updated weekly with fresh content</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-nixerly-light-gradient py-16 md:py-20 relative">
        <div className="absolute top-0 inset-x-0 h-20 bg-nixerly-gradient opacity-10"></div>
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="flex items-center justify-center animate-fade-in order-2 lg:order-1">
              <div className="bg-white p-5 rounded-xl shadow-nixerly-card transform transition-transform duration-500 hover:translate-y-[-5px] relative overflow-hidden group">
                <Image
                  src="/busy-city-construction.png"
                  alt="Featured post"
                  width={600}
                  height={400}
                  className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-nixerly-coral-gradient text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
            </div>
            <div className="space-y-6 animate-slide-up order-1 lg:order-2">
              <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium">
                Industry
              </div>
              <h2 className="text-3xl font-bold tracking-tighter text-nixerly-darkblue">Addressing Ireland's Construction Labor Shortage</h2>
              <p className="text-nixerly-darkgray md:text-lg/relaxed">
                An in-depth look at the challenges facing the Irish construction industry and how digital solutions can help bridge the talent gap and improve workforce efficiency.
              </p>
              <div className="flex items-center gap-4 text-nixerly-darkgray">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-nixerly-coral" />
                  <span className="text-sm">April 15, 2025</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4 text-nixerly-coral" />
                  <span className="text-sm">John O'Connor</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-nixerly-coral" />
                  <span className="text-sm">8 min read</span>
                </div>
              </div>
              <div className="pt-2">
                <Button className="bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
                  <Link href="#" className="flex items-center gap-2">
                    Read Full Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-sm font-medium mb-2">
              Latest Articles
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-nixerly-darkblue">
                Our Recent Publications
              </h2>
              <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed">
                Discover the latest insights and trends in the construction industry.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="flex flex-col overflow-hidden rounded-xl border border-nixerly-lightblue/30 bg-white shadow-nixerly-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="space-y-4">
                    <div className="inline-flex px-2.5 py-0.5 rounded-full bg-nixerly-ultralightblue text-nixerly-darkblue text-xs font-medium">
                      {post.category}
                    </div>
                    <h3 className="text-xl font-bold text-nixerly-darkblue group-hover:text-nixerly-coral transition-colors duration-300">{post.title}</h3>
                    <p className="text-nixerly-darkgray">{post.excerpt}</p>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-nixerly-coral" />
                      <span className="text-nixerly-darkgray">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-nixerly-coral" />
                      <span className="text-nixerly-darkgray">{post.readTime}</span>
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-nixerly-lightblue/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-nixerly-ultralightblue h-8 w-8 flex items-center justify-center">
                          <span className="text-nixerly-darkblue font-bold text-xs">{post.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <span className="text-sm text-nixerly-darkgray">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-nixerly-blue hover:text-nixerly-coral transition-colors duration-300 p-0 h-auto" asChild>
                        <Link href="#" className="flex items-center gap-1">
                          Read <ArrowRight className="h-3 w-3" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Button className="bg-nixerly-blue hover:bg-nixerly-darkblue shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]" asChild>
              <Link href="#" className="flex items-center gap-2">
                View All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-nixerly-ultralightblue py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-slide-up">
            <div className="inline-flex px-3 py-1 rounded-full bg-white text-nixerly-darkblue text-sm font-medium mb-2">
              Stay Updated
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-nixerly-darkblue">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-nixerly-darkgray md:text-lg/relaxed">
              Get the latest construction industry insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border border-nixerly-lightblue bg-white px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-nixerly-blue"
              />
              <Button className="bg-nixerly-coral hover:bg-nixerly-darkcoral shadow-nixerly-button transition-all duration-300 hover:translate-y-[-2px]">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-nixerly-darkgray">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
