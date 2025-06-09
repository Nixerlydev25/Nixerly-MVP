import { TBusinessDetails } from "@/types/auth";
import instance from "../api";
import { API_ROUTES } from "@/constants/routes";

interface PresignedUrlResponse {
  presignedUrl: string;
  s3Key: string;
}

interface FileUploadRequest {
  fileName: string;
  contentType: string;
}

interface FileUploadResponse {
  fileName: string;
  presignedUrl: string;
  s3Key: string;
}

interface GetAssetsUploadUrlResponse {
  urls: FileUploadResponse[];
}

interface SaveAssetsPayload {
  assets: Array<{
    s3Key: string;
    mediaType: string;
  }>;
}

class BusinessService {
  static async getBusinessById(id: string): Promise<TBusinessDetails> {
    try {
      const response = await instance.get(
        API_ROUTES.BUSINESS.GET_BUSINESS_BY_ID(id)
      );
      return response.data;
    } catch (error) {
      console.error("Error getting business by id:", error);
      throw error;
    }
  }

  static async getProfilePictureUploadUrl(fileName: string, contentType: string): Promise<PresignedUrlResponse> {
    try {
      const response = await instance.post(
        API_ROUTES.BUSINESS.GET_PROFILE_PICTURE_UPLOAD_URL,
        { fileName, contentType }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting profile picture upload URL:", error);
      throw error;
    }
  }

  static async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
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

  static async saveProfilePicture(s3Key: string): Promise<void> {
    try {
      const response = await instance.put(
        API_ROUTES.BUSINESS.SAVE_PROFILE_PICTURE,
        { s3Key }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving profile picture:", error);
      throw error;
    }
  }

  static async getAssetsUploadUrl(files: FileUploadRequest[]): Promise<GetAssetsUploadUrlResponse> {
    try {
      const response = await instance.post(
        API_ROUTES.BUSINESS.GET_ASSETS_UPLOAD_URL,
        { files }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting assets upload URL:", error);
      throw error;
    }
  }

  static async saveAssets(assets: SaveAssetsPayload['assets']): Promise<void> {
    try {
      const response = await instance.post(
        API_ROUTES.BUSINESS.SAVE_ASSETS,
        { assets }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving assets:", error);
      throw error;
    }
  }

  static async deleteAssets(assetIds: string[]): Promise<{ message: string }> {
    try {
      const response = await instance.delete(
        API_ROUTES.BUSINESS.DELETE_ASSETS,
        { data: { assetIds } }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting assets:", error);
      throw error;
    }
  }
}

export default BusinessService;
