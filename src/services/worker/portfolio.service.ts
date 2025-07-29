import instance from '../api';
import { API_ROUTES } from '@/constants/routes';
import type {
  Portfolio,
  CreatePortfolioPayload,
  UploadPortfolioAssetPayload,
  SavePortfolioAssetsPayload,
} from '@/types/worker.types';

interface CreatePortfoliosResponse {
  message: string;
  portfolio: Portfolio[];
}

interface PresignedUrlResponse {
  urls: Array<{
    fileName: string;
    presignedUrl: string;
    s3Key: string;
  }>;
}

class PortfolioService {
  static async createPortfolios(portfolios: CreatePortfolioPayload[]): Promise<CreatePortfoliosResponse> {
    try {
      const response = await instance.post(API_ROUTES.WORKER.CREATE_PORTFOLIOS, {
        portfolios,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating portfolios:', error);
      throw error;
    }
  }

  static async deletePortfolios(portfolioIds: string[]): Promise<void> {
    try {
      await instance.delete(API_ROUTES.WORKER.DELETE_PORTFOLIOS, {
        data: { portfolioIds },
      });
    } catch (error) {
      console.error('Error deleting portfolios:', error);
      throw error;
    }
  }

  static async getAssetUploadUrl(payload: UploadPortfolioAssetPayload): Promise<PresignedUrlResponse> {
    try {
      const response = await instance.post(
        API_ROUTES.WORKER.GET_PORTFOLIO_UPLOAD_URL,
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
    contentType: string,
    onProgress?: (percent: number) => void
  ): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedUrl, true);
        xhr.setRequestHeader('Content-Type', contentType);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = Math.round((event.loaded / event.total) * 100);
            onProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve();
          } else {
            reject(new Error('Failed to upload asset'));
          }
        };

        xhr.onerror = () => reject(new Error('Failed to upload asset'));
        xhr.send(file);
      });
    } catch (error) {
      console.error('Error uploading asset:', error);
      throw error;
    }
  }

  static async saveAssets(payload: SavePortfolioAssetsPayload): Promise<Portfolio> {
    try {
      const response = await instance.post(
        API_ROUTES.WORKER.SAVE_PORTFOLIO_ASSETS,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error saving assets:', error);
      throw error;
    }
  }
}

export default PortfolioService; 