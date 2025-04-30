export default function TestimonialsSection() {
  return (
    <section className="bg-nixerly-ultralightblue py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="animate-slide-up flex flex-col items-center justify-center space-y-4 text-center">
          <div className="mb-2 inline-flex rounded-full bg-white px-3 py-1 text-sm font-medium text-nixerly-darkblue">
            Success Stories
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter text-nixerly-darkblue sm:text-4xl md:text-5xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-[700px] text-nixerly-darkgray md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Hear from professionals and businesses who found success on our platform.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-nixerly-lightblue/20 bg-white p-6 shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nixerly-lightblue">
                <span className="font-bold text-nixerly-darkblue">JD</span>
              </div>
              <div>
                <h4 className="font-bold text-nixerly-darkblue">John Donovan</h4>
                <p className="text-sm text-nixerly-darkgray">Master Electrician</p>
              </div>
            </div>
            <p className="italic text-nixerly-darkgray">&quot;Within a week of creating my profile, I was hired for a commercial project that lasted 6 months. The verification system gave my credentials credibility.&quot;</p>
          </div>
          <div className="rounded-xl border border-nixerly-lightblue/20 bg-white p-6 shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nixerly-lightcoral">
                <span className="font-bold text-white">SC</span>
              </div>
              <div>
                <h4 className="font-bold text-nixerly-darkblue">Sarah Chen</h4>
                <p className="text-sm text-nixerly-darkgray">Construction Manager</p>
              </div>
            </div>
            <p className="italic text-nixerly-darkgray">&quot;The skill matching feature saved our HR team countless hours. We found qualified candidates quickly and completed our project ahead of schedule.&quot;</p>
          </div>
          <div className="rounded-xl border border-nixerly-lightblue/20 bg-white p-6 shadow-nixerly-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nixerly-blue">
                <span className="font-bold text-white">MB</span>
              </div>
              <div>
                <h4 className="font-bold text-nixerly-darkblue">Michael Brown</h4>
                <p className="text-sm text-nixerly-darkgray">General Contractor</p>
              </div>
            </div>
            <p className="italic text-nixerly-darkgray">&quot;Our company&apos;s profile has attracted high-quality talent for our projects. The platform&apos;s verification system ensures we&apos;re getting qualified professionals every time.&quot;</p>
          </div>
        </div>
      </div>
    </section>
  )
} 