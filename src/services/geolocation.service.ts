import axios from "axios";

interface LocationResponse {
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
}

interface LocationSuggestion {
  placeId: string;
  description: string;
}

export const geolocationService = {
  getLocationFromCoordinates: async (lat: number, lng: number): Promise<LocationResponse> => {
    const response = await axios.post<LocationResponse>("/api/geolocation", {
      lat,
      lng,
    });
    return response.data;
  },

  getLocationFromPlaceId: async (placeId: string): Promise<LocationResponse> => {
    const response = await axios.post<LocationResponse>("/api/geolocation", {
      placeId,
    });
    return response.data;
  },

  getLocationSuggestions: async (input: string): Promise<LocationSuggestion[]> => {
    const response = await axios.get<LocationSuggestion[]>(`/api/geolocation/suggestions`, {
      params: { input },
    });
    return response.data;
  },
}; 