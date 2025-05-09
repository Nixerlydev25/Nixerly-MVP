import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const GOOGLE_PLACES_API_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

interface GooglePlacePrediction {
  place_id: string;
  description: string;
}

interface GooglePlacesResponse {
  predictions: GooglePlacePrediction[];
  status: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = searchParams.get("input");

    if (!input) {
      return NextResponse.json(
        { error: "Search input is required" },
        { status: 400 }
      );
    }

    const response = await axios.get<GooglePlacesResponse>(GOOGLE_PLACES_API_URL, {
      params: {
        input,
        types: "(cities)",
        key: GOOGLE_MAPS_API_KEY,
      },
    });

    console.log(response.data, 'data')

    if (response.data.status !== "OK") {
      return NextResponse.json(
        { error: "Failed to get location suggestions" },
        { status: 400 }
      );
    }

    const suggestions = response.data.predictions.map((prediction) => ({
      placeId: prediction.place_id,
      description: prediction.description,
    }));

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Location suggestions error:", error);
    return NextResponse.json(
      { error: "Failed to process location suggestions" },
      { status: 500 }
    );
  }
} 