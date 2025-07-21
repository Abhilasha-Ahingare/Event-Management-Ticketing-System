import React, { useState } from "react";
import api from "../../context/utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const CreateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // console.log("ID from URL:", id);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: 0,
    maxTickets: 0,
    ticketsSold: 0,
    category: "",
    details: "",
    organizerName: "",
  });

  const [image, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const res = await api.get(`/event/event-detail/${id}`);
          const data = res.data.singleEvent;

          setEventData({
            title: data.title || "",
            description: data.description || "",
            date: data.date?.split("T")[0] || "",
            location: data.location || "",
            price: data.price || 0,
            maxTickets: data.maxTickets || 0,
            ticketsSold: data.ticketsSold || 0,
            category: data.category || "",
            details: data.details || "",
            organizerName: data.organizerName || "",
          });

          if (data.image) {
            setImagePreview(
              data.image.startsWith("http")
                ? data.image
                : `${import.meta.env.VITE_API_URL || ""}/${data.image}`
            );
          }
        } catch (err) {
          console.error("Error fetching event:", err);
        }
      };

      fetchEvent();
    }
  }, [id]);

  // Input change
  const onchnageHandler = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  // Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 🎯 Handle CREATE
  const handleCreate = async () => {
    try {
      const formData = new FormData();
      for (let key in eventData) {
        formData.append(key, eventData[key]);
      }
      if (image) formData.append("image", image);

      const response = await api.post("/event/create-Event", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Event created successfully!");
        navigate(`/event`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    }
  };

  // 🎯 Handle UPDATE
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      for (let key in eventData) {
        formData.append(key, eventData[key]);
      }
      if (image) formData.append("image", image);

      const response = await api.put(`/event/update-event/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("Event updated successfully!");
        navigate(`/event`);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (id) {
  //     updateEvent();
  //   } else {
  //     createEvent();
  //   }
  // };
  return (
    <section className="w-full p-4 bg-gray-200 min-h-screen flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6 text-gray-800 uppercase">
          Create Event
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={onchnageHandler}
              placeholder="Write title"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label
              htmlFor="Description"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Event Description
            </label>
            <textarea
              placeholder="Description"
              name="description"
              value={eventData.description}
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Location / Address
            </label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={eventData.location}
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={eventData.price}
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Category
            </label>
            <input
              type="text"
              placeholder="Category"
              value={eventData.category}
              name="category"
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Date
            </label>
            <input
              type="date"
              value={eventData.date}
              name="date"
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Max Tickets */}
          <div>
            <label
              htmlFor="maxTickets"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Max Tickets
            </label>
            <input
              type="number"
              value={eventData.maxTickets}
              name="maxTickets"
              placeholder="Max tickets"
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Tickets Sold */}
          <div>
            <label
              htmlFor="ticketsSold"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Tickets Sold
            </label>
            <input
              type="number"
              value={eventData.ticketsSold}
              name="ticketsSold"
              onChange={onchnageHandler}
              placeholder="Tickets sold"
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <label
              htmlFor="details"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Details
            </label>
            <textarea
              placeholder="Event details"
              value={eventData.details}
              name="details"
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          {/* Organizer Name */}
          <div>
            <label
              htmlFor="organizerName"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Organizer Name
            </label>
            <input
              type="text"
              value={eventData.organizerName}
              name="organizerName"
              placeholder="Organizer name"
              onChange={onchnageHandler}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block font-semibold mb-2 uppercase text-sm"
            >
              Event Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="md:col-span-2 flex justify-center">
              <img
                key={eventData.image}
                src={imagePreview}
                alt="event banner"
                className="mt-4 rounded-lg max-h-64 object-cover shadow-xl"
              />
            </div>
          )}
          <button
            type="button"
            className="bg-gradient-to-r from-gray-700 to-neutral-800 text-white font-semibold py-4 px-4 rounded-xl shadow hover:scale-90 transition-transform duration-300 flex items-center gap-2 w-40 text-center uppercase justify-center"
            onClick={handleCreate}
          >
            {" "}
            event create
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-gray-700 to-neutral-800 text-white font-semibold py-3 px-5 rounded-xl shadow hover:scale-90 transition-transform duration-300 flex items-center justify-center gap-2 w-40 text-center uppercase"
            onClick={handleUpdate}
          >
            {" "}
            event update
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateEvent;
