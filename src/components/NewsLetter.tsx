import React from 'react';

export default function Newsletter() {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <section className="bg-neutral-800 py-10 px-4 rounded-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          {/* Left - Heading */}
          <h2 className="text-white text-2xl font-semibold text-center md:text-left">
            Subscribe Newsletters
          </h2>

          {/* Right - Input + Button */}
          <form className="relative w-full md:max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 pr-40 rounded-md text-gray-800 bg-white"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-500 text-white     px-5 py-2 rounded-md hover:bg-green-600 transition"
            >
              SUBSCRIBE NOW
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
