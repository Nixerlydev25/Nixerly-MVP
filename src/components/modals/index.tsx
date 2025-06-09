import { EditProfileModal } from '@/components/modals/edit-profile-modal';
import { EditSkillsModal } from '@/components/modals/edit-skills-modal';
import { EditExperienceModal } from '@/components/modals/edit-experience-modal';
import { EditEducationModal } from '@/components/modals/edit-education-modal';
import { EditLanguagesModal } from './edit-languages-modal';
import { ChangeWorkerProfilePictureModal } from './change-worker-profile-picture';
import { EditBusinessProfileModal } from './edit-business-profile-modal';
import { EditAboutModal } from './edit-business-about-modal';
import { ImageUploadModal } from './edit-profile-image-upload';
import { EditServicesModal } from './edit-business-service-modal';
import { ReportWorkerModal } from './report-worker';
import { ReportBusinessModal } from './report-business';
import { ReportJobModal } from './report-job';
import { EditCertificatesModal } from './edit-certificates-modal';
import { ManageCompanyImagesModal } from './manage-company-images-modal';
import { ImageCarouselModal } from './image-carousel-modal';

export function Modals() {
  return (
    <>
      <EditProfileModal />
      <EditSkillsModal />
      <EditExperienceModal />
      <EditEducationModal />
      <EditLanguagesModal />
      <ChangeWorkerProfilePictureModal />
      <EditBusinessProfileModal />
      <EditAboutModal />
      <ImageUploadModal />
      <EditServicesModal />
      <ReportWorkerModal />
      <ReportBusinessModal />
      <ReportJobModal />
      <EditCertificatesModal/>
      <ManageCompanyImagesModal />
      <ImageCarouselModal />
    </>
  );
}
