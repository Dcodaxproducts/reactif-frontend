import { headers } from 'next/headers';

export default async function IpDetails() {
  const headerList = await headers();

  // Vercel-specific headers (Available on Pro and Hobby plans)
  // These are populated automatically by the Vercel Edge network
  const country = headerList.get('x-vercel-ip-country') || 'Unknown';
  const region = headerList.get('x-vercel-ip-country-region') || 'Unknown';
  const city = headerList.get('x-vercel-ip-city') || 'Unknown';
  const ip = headerList.get('x-real-ip') || headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
  
  // Note: ip-api.com/ipapi.co are still useful for ISP/Org info 
  // but for location, Vercel headers are 100% stable.

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 mt-10 font-sans">
      <div className="bg-black p-5 text-white">
        <h2 className="text-xl font-bold tracking-tight">Vercel Edge Identity</h2>
        <p className="opacity-70 text-xs uppercase font-semibold mt-1">Native Header Detection</p>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Your IP</label>
          <p className="text-2xl font-mono font-bold text-gray-900">{ip}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="text-gray-400 text-[10px] uppercase font-bold">City</label>
            <p className="text-gray-800 font-semibold">{decodeURIComponent(city)}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <label className="text-gray-400 text-[10px] uppercase font-bold">Region</label>
            <p className="text-gray-800 font-semibold">{region}</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg col-span-2">
            <label className="text-gray-400 text-[10px] uppercase font-bold">Country</label>
            <p className="text-gray-800 font-semibold">{country}</p>
          </div>
        </div>

        <div className="text-[10px] text-center text-gray-400 border-t pt-4">
          Powered by Vercel Edge Runtime • No External API Calls
        </div>
      </div>
    </div>
  );
}