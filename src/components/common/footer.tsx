import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-nixerly-blue text-white border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/logoWhite.svg" alt="logo" width={128} height={28} />
            </Link>
            <p className="text-base text-white w-3/5 font-normal leading-6">
              The digital platform connecting construction professionals with businesses in Ireland.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-base text-white hover:text-gray-900">
                <Image  src="facebook.svg" alt="facebook" width={34} height={34}/>
                <span className="sr-only">Facebook</span>
              </Link>
              {/* <Link href="#" className="text-base text-white hover:text-gray-900">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link> */}
              <Link href="#" className="text-base text-white hover:text-gray-900">
              <Image  src="insta.svg" alt="insta" width={34} height={34}/>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-base text-white hover:text-gray-900">
              <Image  src="linkedin.svg" alt="linkedin" width={34} height={34}/>
                <span className="sr-only">Linkedin</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold leading-7 mb-4">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-base text-white hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-base text-white hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-white hover:text-gray-900">
                  Contact
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  Careers
                </Link>
              </li> */}
            </ul>
          </div>
          {/* <div>
            <h3 className="text-xl font-bold leading-7 mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  Industry Insights
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div> */}
          <div>
            <h3 className="text-xl font-bold leading-7 mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-base text-white hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-white hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              {/* <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base text-white hover:text-gray-900">
                  GDPR Compliance
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold leading-7 mb-4">Conatct Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-base text-white hover:text-gray-900 cursor-pointer">
                support@nixerly.com
              </li>
              <li className="text-base text-white hover:text-gray-900 cursor-pointer">
                +1(555)123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-white">
          <p>&copy; {new Date().getFullYear()} Nixerly Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
