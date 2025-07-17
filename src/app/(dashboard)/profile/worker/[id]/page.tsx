"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  ChevronLeft,
  Eye,
  Flag,
  Globe,
  GraduationCap,
  MapPin,
  Share2,
  DollarSign,
  Pickaxe,
  User
} from "lucide-react";
import { useGetWorkerById } from "@/hook/worker/worker.hook";
import { useParams } from "next/navigation";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import { useRouter } from "next/navigation";
import { FreelancerProfileSkeleton } from "./components/worker-profile-skeleton";

export default function FreelancerProfile() {
  const { id } = useParams<{ id: string }>();
  const { data: worker, isLoading } = useGetWorkerById(id);
  const { openModal } = useModalStore();
  const router = useRouter();

  if (isLoading) {
    return <FreelancerProfileSkeleton />;
  }

  if (!worker) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Worker not found
      </div>
    );
  }

  // Format skills for display
  const formattedSkills =
    worker.skills?.map((skill: string) => {
      return skill
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (l: string) => l.toUpperCase());
    }) || [];

  // Format full name
  const fullName = `${worker.user?.firstName || ""} ${
    worker.user?.lastName || ""
  }`.trim();

  console.log(worker);


  let maindivision="felx space-y-3 border border-nixerly-bussinessborder rounded-3xl"
  let title="font-sans text-lg not-italic font-bold leading-4 tracking-tight capitalize text-nixerly-blue pt-4"
  
  

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Back to search results */}
        <div
          onClick={() => router.back()}
          className="mb-10 inline-flex cursor-pointer items-center text-sm font-medium py-1 px-3 border rounded-full font-sans text-nixerly-businesslabel leading-5 tracking-tight border--nixerly-bussinessborder "
        >
          <ChevronLeft className=" h-4 w-4" />
          Back
        </div>

        <div className="grid gap-8 ">
          <div className="space-y-8">

            {/* Profile header */}
            <div className="relative rounded-lg border border-nixerly-blue bg-[#E9F3FF] p-4 sm:p-6 shadow-sm overflow-hidden">
              {/* Main content container - responsive flex direction */}
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
                {/* Left side content */}
                <div className="relative flex-1">
                  <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row">
                    {/* Profile image */}
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <div
                        className="relative cursor-pointer group"
                        onClick={() =>
                          openModal(ModalType.IMAGE_CAROUSEL, {
                            images: [
                              {
                                url:
                                  worker.profilePicture || "/placeholder.svg",
                              },
                            ],
                            startIndex: 0,
                          })
                        }
                      >
                        <Image
                          src={worker.profilePicture || "/placeholder.svg"}
                          width={200}
                          height={200}
                          alt={fullName}
                          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-[200px] lg:h-[200px] object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Worker details */}
                    <div className="flex-1 sm:ml-4 lg:ml-8 sm:mt-4">
                      <div className="flex flex-col gap-4">
                        <div className="text-center sm:text-left">
                          <h1 className="text-[#312D2D] font-sans text-2xl sm:text-3xl lg:text-5xl not-italic font-medium leading-tight lg:leading-15 tracking-[-0.5px] lg:tracking-[-0.998px] font-Inter">
                            {fullName}
                          </h1>
                          <p className="text-[#312D2D] font-sans text-lg sm:text-xl not-italic font-medium leading-4 tracking-[-0.437px] mt-2">
                            {worker.title}
                          </p>

                          {/* Location and hourly rate */}
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mt-3">
                            <div className="flex gap-2 text-[#525866] font-sans text-sm  font-normal leading-5 tracking-tight justify-center sm:justify-start ">
                              {/* <MapPin className="h-4 w-4 mt-0.5" />
                               */}
                              <Image
                                src="/locationblack.svg"
                                alt="location icon"
                                width={16}
                                height={16}
                                className="mb-6 sm:mb-0"
                              ></Image>
                              <span>
                                {worker.city}, {worker.state}, {worker.country}
                              </span>
                            </div>
                            <div className="flex gap-2  justify-center items-center text-center sm:justify-center">
                              <Image
                                src="/dollar.svg"
                                alt="location icon"
                                width={16}
                                height={16}
                              ></Image>
                              <p className=" text-[#525866] font-sans text-sm not-italic font-normal leading-5 tracking-tight justify-center sm:justify-star">
                                {worker.hourlyRate}
                              </p>
                            </div>
                          </div>

                          {/* Availability */}
                          <div className="flex gap-2 mt-3 justify-center sm:justify-start">
                            <div className="h-2 w-2 rounded-full bg-green-500 mt-1"></div>
                            <p className="text-nixerly-businesslabel font-sans text-sm font-normal leading-none tracking-tight">
                              {worker.availability
                                ? "Available"
                                : "Not Available"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact button - responsive positioning */}
                <div className="flex-shrink-0 mt-4 lg:mt-0 lg:ml-4">
                  <Button
                    className="w-full lg:w-auto bg-nixerly-blue flex items-center gap-2 justify-center px-4 py-2 min-w-[140px]"
                    onClick={() => {
                      openModal(ModalType.CONTACT_MODAL, {
                        applicant: {
                          workerProfile: worker,
                          relevantExperience: worker.description,
                        },
                      });
                    }}
                  >
                    <Image
                      src="/emailwriting.svg"
                      alt="email icon"
                      width={20}
                      height={20}
                    />
                    Contact now
                  </Button>
                </div>
              </div>
            </div>

           

            {/* About section */}

            <div className={maindivision}>
              <div className="flex gap-3 border-b p-4 ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    {/* <Image
                      src="/tick.svg"
                      alt="email icon"
                      width={25}
                      height={25}
                    /> */}
                    <p className=" bg-nixerly-blue rounded-full p-[6px]"> <User className="h-4 w-4 text-white  "/></p>
                   
                  </div>
                </div>
                <h3 className={title}>
                  About Me
                </h3>
              </div>

              <div className="font-sans font-normal text-sm leading-[150%] tracking-[-1.1%] p-4">
                {worker.description}
              </div>
            </div>

            {/* Skills section */}

            <div className={maindivision}>
              <div className="flex gap-3  border-b p-4 ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    <Image
                      src="/tick.svg"
                      alt="email icon"
                      width={25}
                      height={25}
                      className=""
                    />
                  </div>
                </div>
                <h3 className={title}>
                  Skill & Expertise
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3 p-4  sm:grid-cols-3 max-w-lg lg:max-w-4xl">
                {formattedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-blue-50 text-nixerly-blue py-4 px-4 w-full font-sans font-medium text-sm leading-4"
                  >
                    <div className="text-left w-full ">{skill}</div>
                  </Badge>
                ))}
              </div>
            </div>


            {/* Education */}
            <div className={maindivision}>
              <div className="flex gap-3 p-4 border-b ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    <Image
                      src="/textmessage.svg"
                      alt="email icon"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
                <h3 className={title}>
                  Education
                </h3>
              </div>

              <div className="space-y-6 p-4">
                {worker.education?.length ? (
                  worker.education.map((edu) => (
                    <div key={edu.id} className=" pl-4  ">
                      <p className="font-medium text-base leading-6 font-san">
                        {edu.degree} in {edu.fieldOfStudy}
                      </p>
                         <h4 className="text-nixerly-businesslabel font-normal ">{edu.school}</h4>
                      <p className="text-[13px] text-nixerly-businesslabel py-1">
                        {new Date(edu.startDate).toLocaleDateString()} -
                        {edu.currentlyStudying
                          ? " Present"
                          : edu.endDate
                          ? ` ${new Date(edu.endDate).toLocaleDateString()}`
                          : ""}
                      </p>
                      <p className="font-sans font-normal text-sm leading-[150%] tracking-[-1.1%] py-3">{edu.description}</p>
                      <Separator className="my-3"></Separator>
                    </div>
                  ))
                ) : (
                  <p className="text-nixerly-businesslabel  p-4">No Education</p>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className={maindivision}>
              <div className="flex gap-3  border-b p-4 ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    <Image
                      src="/stareicon.svg"
                      alt="email icon"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                <h3 className="font-sans text-lg not-italic font-bold leading-4 tracking-tight capitalize text-nixerly-blue pt-4">
                  Certifications
                </h3>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10">
                {worker.certificates?.length ? (
                  worker.certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="rounded-lg shadow-sm border border-gray-200 bg-white overflow-hidden"
                    >
                      {/* certificate Image Section */}

                      <div className="w-full h-40 bg-gray-100 ">
                        {certificate.assets?.length > 0 ? (
                          <div
                            className="relative h-full cursor-pointer group"
                            onClick={() =>
                              openModal(ModalType.IMAGE_CAROUSEL, {
                                images: certificate.assets,
                                startIndex: 0,
                              })
                            }
                          >
                            <img
                              src={
                                certificate.assets[0].url ||
                                "/placeholder.svg?height=160&width=300"
                              }
                              alt={certificate.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                              <Eye className="h-6 w-6 text-white" />
                              {certificate.assets.length > 1 && (
                                <span className="text-white text-xs mt-1">
                                  1 more image
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                            <Award className="h-10 w-10 text-purple-500" />
                          </div>
                        )}
                      </div>

                      {/*  certificate Info Section */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-xl leading-6 capitalize font-sans text-nixerly-blue">
                            {certificate.name}
                          </h4>
                         <Badge variant="outline" className="p-1 hover:bg-blue-400 hover:text-white">
  {certificate.certificateType.replace(/_/g, " ")}
</Badge>
                        </div>
                        <p className="text-nixerly-businesslabel font-normal">
                          {certificate.issuingOrg}
                        </p>
                        <p className="text-[13px] text-nixerly-businesslabel ">
                          Issued:{" "}
                          {new Date(certificate.issueDate).toLocaleDateString()}
                          {certificate.expiryDate &&
                            ` _ Expires: ${new Date(
                              certificate.expiryDate
                            ).toLocaleDateString()}`}
                        </p>
                        {certificate.credentialUrl && (
                          <a
                            href={certificate.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:underline"
                          >
                            View Credential
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-nixerly-businesslabel ">No Certifications</p>
                )}
              </div>
            </div>

            {/* Portfolio */}
            <div className={maindivision}>
              <div className="flex gap-3  border-b p-4 ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    <Image
                      src="/bluesutecase.svg"
                      alt="email icon"
                      width={25}
                      height={25}
                    />
                  </div>
                </div>
                <h3 className="font-sans text-lg not-italic font-bold leading-4 tracking-tight capitalize text-nixerly-blue pt-4">
                  Portfolio
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-10 p-10">
                {worker.portfolio?.length ? (
                  worker.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-lg shadow-sm bordere overflow-hidden"
                    >
                      {/* Portfolio Image Section */}
                      {item.assets?.length > 0 ? (
                        <div
                          className="relative h-40 cursor-pointer group"
                          onClick={() =>
                            openModal(ModalType.IMAGE_CAROUSEL, {
                              images: item.assets.map((asset) => ({
                                url: asset.url,
                                key: asset.s3Key,
                              })),
                              startIndex: 0,
                            })
                          }
                        >
                          <img
                            src={item.assets[0].url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                            <Eye className="h-6 w-6 text-white" />
                            {item.assets.length > 1 && (
                              <span className="text-white text-xs mt-1">
                                +{item.assets.length - 1} more
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                          <Eye className="h-10 w-10 text-emerald-500" />
                        </div>
                      )}

                      {/*  Portfolio Details Section */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-medium text-xl leading-6 capitalize font-sans text-nixerly-blue">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-nixerly-businesslabel font-normal">{item.employerName}</p>

                        <p className="mt-2 font-sans font-normal text-sm leading-[150%] tracking-[-1.1%] ">
                          {item.description}
                        </p>

                        <p className="text-[13px] text-nixerly-businesslabel ">
                          {new Date(item.startDate).toLocaleDateString()}_{" "}
                          {item.endDate
                            ? new Date(item.endDate).toLocaleDateString()
                            : "Present"}
                        </p>
                        {item.employerWebsite && (
                          <a
                            href={item.employerWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:underline mr-4"
                          >
                            Employer Website
                          </a>
                        )}
                        {item.projectUrl && (
                          <a
                            href={item.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-400 hover:underline "
                          >
                            Project URL
                          </a>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-nixerly-businesslabel  ">
                    No Portfolio Items
                  </p>
                )}
              </div>
            </div>

            {/* Experience section */}
            <div className={maindivision}>
              <div className="flex gap-3  border-b p-4 ">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                    {/* <Image
                      src="/tick.svg"
                      alt="email icon"
                      width={25}
                      height={25}
                    /> */}
                    <p className=" bg-nixerly-blue rounded-full p-[6px]"> <Pickaxe className="h-4 w-4 text-white  "/></p>
                    
                  </div>
                </div>
                <h3 className="font-sans text-lg not-italic font-bold leading-4 tracking-tight capitalize text-nixerly-blue pt-4">
                  Work Experience
                </h3>
              </div>

              {/* expirence details */}
              <div className="space-y-6 p-4">
                {worker.experience?.length ? (
                  worker.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className=" pl-4 py-1"
                    >
                      <h4 className="font-sans font-medium text-xl leading-6 text-gray-800">{exp.title}</h4>

{/* company and city  */}
<div className=" block md:flex gap-4 my-2" >

  <div className=" flex gap-2 ">
     <Image src="/buildingBlack.svg" alt="building logo" width={16} height={16}></Image>
<p className="font-sans font-normal text-sm leading-4 text-nixerly-blue tracking-[-0.6%]"> {exp.company} </p>
  </div>
  

 <div className="flex gap-2 mt:1 md:mt-0">
       <Image src="/locationblack.svg" alt="building logo" width={16} height={16}></Image>
<p className="font-sans font-normal text-sm leading-4 text-nixerly-blue tracking-[-0.6%]">{exp.city}, {exp.state}, {exp.country} </p>
  </div>
</div>
                      


                      <p className="text-[13px] text-nixerly-businesslabel my-1">
                        {new Date(exp.startDate).toLocaleDateString()} _
                        {exp.currentlyWorking
                          ? " Present"
                          : exp.endDate
                          ? ` ${new Date(exp.endDate).toLocaleDateString()}`
                          : ""}
                      </p>

                      {/* <p className="text-sm text-gray-500 mt-1">
                        {exp.city}, {exp.state}, {exp.country}
                      </p> */}
                      <p className="mt-2 font-sans font-normal text-sm leading-[150%] tracking-[-1.1%]">{exp.description}</p>
                    
                      <Separator className="my-3"></Separator>
                    </div>
                  ))
                ) : (
                  <p className="text-nixerly-businesslabel  p-4">No Experience</p>
                )}
              </div>
            </div>
          </div>


          {/* Languages */}
          <div className={maindivision}>
            <div className="flex gap-3  border-b p-4 ">
              <div className="flex-shrink-0">
                <div className="w-12 h-12  border border-nixerly-bussinessborder rounded-full flex items-center justify-center">
                  {/* <Image
                    src="/.svg"
                    alt="email icon"
                    width={25}
                    height={25}
                  /> */}
<p className=" bg-nixerly-blue rounded-full p-[6px]"> <Globe className="h-4 w-4 text-white  "/></p>
                
                </div>
              </div>
              <h3 className="font-sans text-lg not-italic font-bold leading-4 tracking-tight capitalize text-nixerly-blue pt-4">
                {" "}
                Languages
              </h3>
            </div>

            <div className="p-4 w-full space-y-2">
              {worker.languages?.map((language) => (
                <div key={language.id} className="flex">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center rounded-lg bg-[rgba(30,100,211,0.10)] w-full px-4 py-3 gap-1">
                    <span className="font-medium text-gray-800">
                      {language.language.charAt(0) +
                        language.language.slice(1).toLowerCase()}
                    </span>
                    <span className="text-nixerly-businesslabel text-sm font-normal">
                      {language.proficiency.charAt(0) +
                        language.proficiency.slice(1).toLowerCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>



          {/* Sidebar */}
          {/* <div className="space-y-6">
            <div className="sticky top-24 rounded-lg border bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-t-lg"></div>
              <div className="mb-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {worker.hourlyRate}€
                </div>
                <div className="text-gray-600">per hour</div>
              </div>

              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">
                    {worker.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">
                    {worker.city}, {worker.state}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                onClick={() => {
                  openModal(ModalType.CONTACT_MODAL, {
                    applicant: {
                      workerProfile: worker,
                      relevantExperience: worker.description,
                    },
                  });
                }}
              >
                Contact {worker.user?.firstName || 'Worker'}
              </Button>
            </div>
          </div> */}



        </div>
      </div>
    </div>
  );
}
