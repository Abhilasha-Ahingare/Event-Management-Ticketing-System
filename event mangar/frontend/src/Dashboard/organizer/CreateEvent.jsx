import React, { useState } from "react";

const CreateEvent = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <section className="w-full p-4 bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800 uppercase">
          Create Event
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Event Title
            </label>
            <input
              type="text"
              placeholder="Write title"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 uppercase text-sm">
              Event Description
            </label>
            <textarea
              placeholder="Description"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Location / Address
            </label>
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Category
            </label>
            <input
              type="text"
              placeholder="Category"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Tickets */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Max Tickets
            </label>
            <input
              type="number"
              placeholder="Max tickets"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tickets Sold */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Tickets Sold
            </label>
            <input
              type="number"
              placeholder="Tickets sold"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2 uppercase text-sm">
              Details
            </label>
            <textarea
              placeholder="Event details"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Organizer Name */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Organizer Name
            </label>
            <input
              type="text"
              placeholder="Organizer name"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold mb-2 uppercase text-sm">
              Event Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={imagePreview}
                alt="Event Preview"
                className="mt-4 rounded-lg max-h-64 object-cover shadow-xl"
              />
            </div>
          )}
          <button className="bg-gradient-to-r from-gray-700 to-neutral-800 text-white font-semibold py-4 px-4 rounded-xl shadow hover:scale-90 transition-transform duration-300 flex items-center gap-2 w-40 text-center uppercase justify-center">
            {" "}
            event create
          </button>
          <button className="bg-gradient-to-r from-gray-700 to-neutral-800 text-white font-semibold py-3 px-5 rounded-xl shadow hover:scale-90 transition-transform duration-300 flex items-center justify-center gap-2 w-40 text-center uppercase">
            {" "}
            event update
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
