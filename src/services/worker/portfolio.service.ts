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