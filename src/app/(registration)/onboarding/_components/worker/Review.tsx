import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useOnboardingNavigation } from "@/hook/onboarding/useOnboardingNavigation";
import { OnboardingSchema, onboardingOptions } from "@/schema/onboarding/onboarding.schema";

export const Review = () => {
  const { watch } = useFormContext<OnboardingSchema>();
  const { goToPreviousStep } = useOnboardingNavigation();
  const formData = watch();

  // Helper function to get label from value
  const getLabelFromValue = (
    options: { value: string; label: string }[],
    value: string
  ) => {
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // Get skill labels
  const getSkillLabels = () => {
    return formData.skills.map((skillValue) => {
      // Search all categories for this skill
      for (const [, skills] of Object.entries(onboardingOptions.skills)) {
        const skill = skills.find((s) => s.value === skillValue);
        if (skill) {
          return skill.label;
        }
      }
      return skillValue;
    });
  };

  // Format referral source
  const referralSource = getLabelFromValue(
    onboardingOptions.referralSources,
    formData.howDidYouHearAboutUs
  );

  // Format category
  const category = getLabelFromValue(
    onboardingOptions.professions,
    formData.categoryId
  );

  // Format experience level
  const experienceLevel = getLabelFromValue(
    onboardingOptions.experienceLevels,
    formData.experienceLevel
  );

  return (
    <Card className="p-8 shadow-nixerly-card border border-nixerly-lightblue bg-white rounded-lg animate-fade-in">
      <div className="space-y-7">
        <div>
          <h2 className="text-2xl font-semibold text-nixerly-darkblue">Review Your Information</h2>
          <p className="text-nixerly-darkgray mt-2">
            Please review your information before submitting
          </p>
        </div>

        <div className="space-y-6">
          <div className="border-b border-nixerly-lightblue pb-5">
            <h3 className="text-lg font-medium mb-4 text-nixerly-blue">Personal Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Name:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Location:</span>
                <span className="font-medium">{formData.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Referral Source:</span>
                <span className="font-medium">{referralSource}</span>
              </div>
            </div>
          </div>

          <div className="border-b border-nixerly-lightblue pb-5">
            <h3 className="text-lg font-medium mb-4 text-nixerly-blue">Professional Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Professional Title:</span>
                <span className="font-medium">{formData.title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Hourly Rate:</span>
                <span className="font-medium text-nixerly-blue">${formData.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Category:</span>
                <span className="font-medium">{category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Experience Level:</span>
                <span className="font-medium">{experienceLevel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-nixerly-darkgray mb-1">Skills:</span>
                <div className="flex flex-wrap gap-2">
                  {getSkillLabels().map((skill, index) => (
                    <span key={index} className="bg-nixerly-ultralightblue text-nixerly-darkblue px-3 py-1 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-nixerly-darkgray mb-1">Description:</span>
                <p className="text-sm p-3 bg-nixerly-ultralightblue/50 rounded-md">{formData.description}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-nixerly-lightblue pb-5">
            <h3 className="text-lg font-medium mb-4 text-nixerly-blue">Educational Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Education Level:</span>
                <span className="font-medium">{formData.educationLevel}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-nixerly-darkgray mb-1">Languages:</span>
                <div className="flex flex-wrap gap-2">
                  {formData.languages.map((lang, index) => {
                    const language = onboardingOptions.languages.find(l => l.value === lang.language);
                    const proficiency = onboardingOptions.proficiencyLevels.find(p => p.value === lang.proficiency);
                    return (
                      <span key={index} className="bg-nixerly-ultralightblue text-nixerly-darkblue px-3 py-1 rounded-md text-sm">
                        {language?.label || lang.language} ({proficiency?.label || lang.proficiency})
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-nixerly-darkgray">Available for Work:</span>
                <span className={`font-medium ${formData.availability ? "text-nixerly-blue" : "text-nixerly-coral"}`}>
                  {formData.availability ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={goToPreviousStep}
            className="border-nixerly-lightblue hover:bg-nixerly-ultralightblue text-nixerly-darkblue transition-colors"
          >
            Previous
          </Button>
          <Button 
            type="submit"
            className="bg-nixerly-blue hover:bg-nixerly-darkblue text-white px-8 py-2.5 shadow-nixerly-button transition-all duration-200"
          >
            Complete Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}; 