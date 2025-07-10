'use client';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        
        {/* Inner spinning ring */}
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin animate-reverse"></div>
        
        {/* Music note icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl">
          🎵
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white font-medium">Finding your perfect tracks...</p>
        <p className="text-gray-300 text-sm mt-1">This may take a few seconds</p>
      </div>
    </div>
  );
}