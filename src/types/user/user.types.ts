export interface currentUserData {
    id: string;
    email: string;
    name: string;
    isSuspended: boolean;
    isVerified: boolean;
    role: string;
    isTemporaryPasswordReset: boolean;
    isDeleted: boolean;
    restrictions: string[];
    created_at: Date;
    onboardingCompleted: boolean;
    organization: string;
    profession: string;
    howDidYouHearAboutUs: string;
    schoolName: string;
    yearsOfExperience: number;
    subjectsTaught: string;
    gradeLevel: string;
    educationalQualification: string;
    teacherLicenseNumber: string;
  }