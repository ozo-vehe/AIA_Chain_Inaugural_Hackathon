import { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to a server)
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    // Reset the form after submission
    setFormData({ fullname: "", email: "", message: "" });
  };

  return (
    <section>
      <div className="mt-8 px-4 md:px-5 lg:px-10">
        <h1 className="text-center text-3xl font-bold capitalize">
          Get in touch
        </h1>
        <p className="text-center text-gray-600">
          Our friendly team would love to hear from you!
        </p>

        <form
          className="mx-auto my-8 flex max-w-[600px] flex-col gap-4 overflow-hidden"
          onSubmit={handleFormSubmit}
        >
          <div>
            <label
              htmlFor="fullname"
              className="mb-1 block font-medium text-gray-900"
            >
              Fullname:
            </label>
            <input
              type="text"
              id="fullname"
              value={formData.fullname}
              name="fullname"
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-[#ff450d]"
              placeholder="John Doe"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-medium text-gray-900"
            >
              Email address:
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              name="email"
              className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-2 text-sm text-gray-900 outline-none focus:border-[#ff450d]"
              placeholder="johndoe@gmail.com"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="mb-1 block font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              className="block h-[100px] w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none focus:border-[#ff450d]"
              placeholder="Message"
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="send-button">
            <button
              aria-label="send message button"
              type="submit"
              className="w-full rounded-[10px] border border-[#ff450d] py-3 capitalize text-[#ff450d] transition-all duration-300 hover:bg-[#ff450d] hover:text-gray-50"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
