import { EditLessonPlanModal } from "./EditLessonPlanModel"
import { EditProfileModal } from "@/components/modals/edit-profile-modal"
import { EditSkillsModal } from "@/components/modals/edit-skills-modal"
import { EditExperienceModal } from "@/components/modals/edit-experience-modal"
import { EditEducationModal } from "@/components/modals/edit-education-modal"
import { EditLanguagesModal } from "../modals/edit-languages-modal"

export function Modals() {
  return (
    <>
      <EditLessonPlanModal />
      <EditProfileModal />
      <EditSkillsModal />
      <EditExperienceModal />
      <EditEducationModal />
      <EditLanguagesModal/>
    </>
  )
} 