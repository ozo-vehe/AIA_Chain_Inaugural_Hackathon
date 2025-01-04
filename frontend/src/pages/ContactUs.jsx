const ContactUs = () => {
  return (
    <section>
      <div className="mt-8 px-4 md:px-5 lg:px-10">
        <h1 className="text-center text-3xl font-bold capitalize">
          Get in touch
        </h1>
        <p className="text-center text-gray-600">
          Our friendly team would love to hear from you!
        </p>

        <form className="max-w-[600px] mx-auto my-8 flex flex-col gap-4">
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
              className="focus:border-[#ff450d] h-12 w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none"
              placeholder="John Doe"
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
              className="focus:border-[#ff450d] h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-2 text-sm text-gray-900 outline-none"
              placeholder="johndoe@gmail.com"
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
            <textarea name="message" id="message" className="focus:border-[#ff450d] block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 outline-none h-[100px]" placeholder="Message" required></textarea>
          </div>

          <div className="send-button">
            <button aria-label="send message button" type="submit" className="w-full border py-3 hover:bg-[#ff450d] border-[#ff450d] text-[#ff450d] hover:text-gray-50 rounded-[10px] capitalize transition-all duration-300">Send message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
