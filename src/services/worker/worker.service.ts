import instance from "../api";
import { API_ROUTES } from "@/constants/api";
import { FeedsFilter } from "@/types/feed/feed.types";
import { WorkerListResponse } from "@/types/worker.types";

class WorkerService {
  static async getWorkers(filters: FeedsFilter = {}): Promise<WorkerListResponse> {
    try {
      const params = new URLSearchParams();
      
      const filterConfig: {
        [key in keyof FeedsFilter]?: 'array' | 'number' | string
      } = {
        page: 'number',
        limit: 'number',
        skills: 'array',
        minHourlyRate: 'number',
        maxHourlyRate: 'number',
        minTotalEarnings: 'number',
        maxTotalEarnings: 'number',
        minAvgRating: 'number',
        maxAvgRating: 'number',
        sort: 'string'
      };

      (Object.keys(filterConfig) as Array<keyof FeedsFilter>).forEach((key) => {
        const value = filters[key];
        if (value === undefined || value === null) return;

        const configType = filterConfig[key];
        
        if (configType === 'array' && Array.isArray(value)) {
          value.forEach(item => params.append(key, item.toString()));
        } 
        else if (configType === 'number' && typeof value === 'number') {
          params.append(key, value.toString());
        }
        else if (configType === 'string' && typeof value === 'string') {
          console.log('string', value, key);
          params.append(key, value);
        }
      });

      console.log(params , 'params');

      const response = await instance.get(`${API_ROUTES.WORKER.LIST}?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching workers:", error);
      throw error;
    }
  }
}

export default WorkerService;