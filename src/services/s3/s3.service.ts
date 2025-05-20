import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

interface PresignedUrlResponse {
  presignedUrl: string;
  s3Key: string;
}

class S3Service {
  static async getPresignedUrl(fileName: string, contentType: string): Promise<PresignedUrlResponse> {
    try {
      const response = await instance.post(API_ROUTES.WORKER.PROFILE_PICTURE_UPLOAD_URL, {
        fileName,
        contentType,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting presigned URL:", error);
      throw error;
    }
  }

  static async uploadToS3(presignedUrl: string, file: File, contentType: string): Promise<void> {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload to S3");
      }
    } catch (error) {
      console.error("Error uploading to S3:", error);
      throw error;
    }
  }
}

export default S3Service; 