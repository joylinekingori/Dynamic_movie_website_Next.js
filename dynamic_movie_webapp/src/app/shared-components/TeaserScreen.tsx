'use client';

export default function TeaserScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-purple-600 rounded-lg animate-ping"></div>
          <div className="absolute inset-2 bg-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white text-2xl font-bold">M</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">Moovie</h1>
        <p className="text-gray-400">Your ultimate movie experience</p>
      </div>
    </div>
  );
}