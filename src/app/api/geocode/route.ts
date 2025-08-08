// app/api/geocode/route.ts
import { NextResponse } from 'next/server';
import NodeGeocoder from 'node-geocoder';

// Initialize geocoder outside the handler
const options = {
  provider: 'openstreetmap',
  // For other providers you might need:
  // fetch: customFetchImplementation,
  // apiKey: 'your_api_key' // if using Google, MapQuest, etc.
};

const geocoder = NodeGeocoder(options);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Missing latitude or longitude parameters' },
      { status: 400 }
    );
  }

  try {
    const res = await geocoder.reverse({ 
      lat: parseFloat(lat), 
      lon: parseFloat(lon) 
    });
    
    if (!res || res.length === 0) {
      return NextResponse.json(
        { error: 'No results found for these coordinates' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      formattedAddress: res[0].formattedAddress,
      city: res[0].city,
      country: res[0].country,
      raw: res[0] // Include all raw data
    });
  } catch (err) {
    console.error('Geocoding error:', err);
    return NextResponse.json(
      { error: 'Failed to geocode coordinates', details: err.message },
      { status: 500 }
    );
  }
}