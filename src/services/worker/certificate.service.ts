import instance from '../api';
import { API_ROUTES } from '@/constants/routes';
import type {
  Certificate,
  CreateCertificatePayload,
  UploadCertificateAssetPayload,
  SaveCertificateAssetsPayload,
} from '@/types/worker.types';

class CertificateService {
  static async createCertificates(certificates: CreateCertificatePayload[]): Promise<Certificate[]> {
    try {
      const response = await instance.post(API_ROUTES.WORKER.CREATE_CERTIFICATES, {
        certificates,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating certificates:', error);
      throw error;
    }
  }

  static async deleteCertificates(certificateIds: string[]): Promise<void> {
    try {
      await instance.delete(API_ROUTES.WORKER.DELETE_CERTIFICATES, {
        data: { certificateIds },
      });
    } catch (error) {
      console.error('Error deleting certificates:', error);
      throw error;
    }
  }

  static async getAssetUploadUrl(payload: UploadCertificateAssetPayload): Promise<{
    presignedUrls: Array<{ url: string; key: string }>;
  }> {
    try {
      const response = await instance.post(
        API_ROUTES.WORKER.GET_CERTIFICATE_UPLOAD_URL,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error getting asset upload URL:', error);
      throw error;
    }
  }

  static async uploadAsset(
    presignedUrl: string,
    file: File,
    contentType: string
  ): Promise<void> {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: file,
      });

      if (!response.ok) {
        throw new Error('Failed to upload asset');
      }
    } catch (error) {
      console.error('Error uploading asset:', error);
      throw error;
    }
  }

  static async saveAssets(payload: SaveCertificateAssetsPayload): Promise<Certificate> {
    try {
      const response = await instance.post(
        API_ROUTES.WORKER.SAVE_CERTIFICATE_ASSETS,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error saving assets:', error);
      throw error;
    }
  }
}

export default CertificateService; 