"use client";

import { EditProfileModal } from "@/components/modals/edit-profile-modal";
import { EditSkillsModal } from "@/components/modals/edit-skills-modal";
import { EditExperienceModal } from "@/components/modals/edit-experience-modal";
import { EditEducationModal } from "@/components/modals/edit-education-modal";
import { EditLanguagesModal } from "./edit-languages-modal";
import { ChangeWorkerProfilePictureModal } from "./change-worker-profile-picture";
import { EditBusinessProfileModal } from "./edit-business-profile-modal";
import { EditAboutModal } from "./edit-business-about-modal";
import { ImageUploadModal } from "./edit-profile-image-upload";
import { EditServicesModal } from "./edit-business-service-modal";
import { ReportWorkerModal } from "./report-worker";
import { ReportBusinessModal } from "./report-business";
import { ReportJobModal } from "./report-job";
import { EditCertificatesModal } from "./edit-certificates-modal";
import { ManageCompanyImagesModal } from "./manage-company-images-modal";
import { ImageCarouselModal } from "./image-carousel-modal";
import { ShareModal } from "./share-modal";
import { useModalStore } from "@/store/modal.store";
import { ModalType } from "@/types/model";
import ContactModal from "./contact-modal";
import { EditPortfolioModal } from "./edit-portfolio-modal";
import { EditBusinessOwnerModal } from './edit-business-owner-modal';

const modalComponents = {
  [ModalType.EDIT_PROFILE]: EditProfileModal,
  [ModalType.EDIT_SKILLS]: EditSkillsModal,
  [ModalType.EDIT_EXPERIENCE]: EditExperienceModal,
  [ModalType.EDIT_EDUCATION]: EditEducationModal,
  [ModalType.EDIT_LANGUAGES]: EditLanguagesModal,
  [ModalType.CHANGE_PROFILE_PICTURE]: ChangeWorkerProfilePictureModal,
  [ModalType.EDIT_BUSINESS_PROFILE]: EditBusinessProfileModal,
  [ModalType.EDIT_BUSINESS_ABOUT]: EditAboutModal,
  [ModalType.EDIT_PROFILE_IMAGE]: ImageUploadModal,
  [ModalType.EDIT_BUSINESS_SERVICES]: EditServicesModal,
  [ModalType.REPORT_WORKER_MODAL]: ReportWorkerModal,
  [ModalType.REPORT_BUSINESS_MODAL]: ReportBusinessModal,
  [ModalType.REPORT_JOB_MODAL]: ReportJobModal,
  [ModalType.EDIT_CERTIFICATES]: EditCertificatesModal,
  [ModalType.MANAGE_COMPANY_IMAGES]: ManageCompanyImagesModal,
  [ModalType.IMAGE_CAROUSEL]: ImageCarouselModal,
  [ModalType.SHARE_MODAL]: ShareModal,
  [ModalType.CONTACT_MODAL]: ContactModal,
  [ModalType.EDIT_PORTFOLIO]: EditPortfolioModal,
  [ModalType.EDIT_BUSINESS_OWNER]: EditBusinessOwnerModal,
} as const;

export function Modals() {
  const { activeModal } = useModalStore();
  const ModalComponent =
    activeModal !== ModalType.NONE && activeModal in modalComponents
      ? modalComponents[activeModal as keyof typeof modalComponents]
      : null;

  return ModalComponent ? <ModalComponent /> : null;
}
