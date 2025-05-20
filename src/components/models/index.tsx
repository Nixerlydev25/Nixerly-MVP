import { EditLessonPlanModal } from "./EditLessonPlanModel"
import { EditProfileModal } from "@/components/modals/edit-profile-modal"
import { EditSkillsModal } from "@/components/modals/edit-skills-modal"
import { EditExperienceModal } from "@/components/modals/edit-experience-modal"
import { EditEducationModal } from "@/components/modals/edit-education-modal"
import { EditLanguagesModal } from "../modals/edit-languages-modal"
import { EditBusinessProfileModal } from "../modals/edit-business-profile-modal"
import { EditAboutModal } from "../modals/edit-business-about-modal"
import { ImageUploadModal } from "../modals/edit-profile-image-upload"
import { EditServicesModal } from "../modals/edit-business-service-modal"

export function Modals() {
  return (
    <>
      <EditLessonPlanModal />
      <EditProfileModal />
      <EditSkillsModal />
      <EditExperienceModal />
      <EditEducationModal />
      <EditLanguagesModal/>
      <EditBusinessProfileModal />
      <EditAboutModal />
      <ImageUploadModal />
      <EditServicesModal />
    </>
  )
} 