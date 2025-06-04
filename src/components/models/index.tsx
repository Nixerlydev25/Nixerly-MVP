import { EditProfileModal } from '@/components/modals/edit-profile-modal';
import { EditSkillsModal } from '@/components/modals/edit-skills-modal';
import { EditExperienceModal } from '@/components/modals/edit-experience-modal';
import { EditEducationModal } from '@/components/modals/edit-education-modal';
import { EditLanguagesModal } from '../modals/edit-languages-modal';
import { ChangeWorkerProfilePictureModal } from '../modals/change-worker-profile-picture';
import { EditBusinessProfileModal } from '../modals/edit-business-profile-modal';
import { EditAboutModal } from '../modals/edit-business-about-modal';
import { ImageUploadModal } from '../modals/edit-profile-image-upload';
import { EditServicesModal } from '../modals/edit-business-service-modal';
import { ReportWorkerModal } from '../modals/report-worker';
import { ReportBusinessModal } from '../modals/report-business';
import { ReportJobModal } from '../modals/report-job';

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
    </>
  );
}
