import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_GEOCODE_API_URL = "https://maps.googleapis.com/maps/api/geocode/json";

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleGeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
}

interface GoogleGeocodeResponse {
  results: GoogleGeocodeResult[];
  status: string;
}

interface LocationResponse {
  formattedAddress: string;
  city: string;
  state: string;
  country: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { lat, lng, placeId } = body;

    let response;
    if (placeId) {
      response = await axios.get<GoogleGeocodeResponse>(GOOGLE_MAPS_GEOCODE_API_URL, {
        params: {
          place_id: placeId,
          key: GOOGLE_MAPS_API_KEY,
        },
      });
    } else if (lat && lng) {
      response = await axios.get<GoogleGeocodeResponse>(GOOGLE_MAPS_GEOCODE_API_URL, {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_MAPS_API_KEY,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Either coordinates or placeId is required" },
        { status: 400 }
      );
    }

    if (response.data.status !== "OK") {
      return NextResponse.json(
        { error: "Failed to get location data" },
        { status: 400 }
      );
    }

    const result = response.data.results[0];
    const addressComponents = result.address_components;

    const location: LocationResponse = {
      formattedAddress: result.formatted_address,
      city: addressComponents.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      )?.long_name || "",
      state: addressComponents.find(
        (component) => component.types.includes("administrative_area_level_1")
      )?.long_name || "",
      country: addressComponents.find(
        (component) => component.types.includes("country")
      )?.long_name || "",
    };

    return NextResponse.json(location);
  } catch (error) {
    console.error("Geolocation error:", error);
    return NextResponse.json(
      { error: "Failed to process location" },
      { status: 500 }
    );
  }
} 