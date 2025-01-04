const LoansAndGrants = () => {
  return (
    <section className="mt-8 px-4 md:px-5 lg:px-10">
      <h1 className="mb-2 text-xl font-bold uppercase md:text-3xl lg:text-5xl">
        About Our Loaning Services
      </h1>
      <p className="mb-8 text-gray-600">
        Our loaning services are designed to empower individuals, small
        businesses, and farmers by providing accessible microloans and grants.
        We understand that traditional banking systems often excludes those who
        need financial support the most due to high barriers, complex
        requirements, and lengthy processes. That’s why our platform offers an
        innovative, blockchain-based solution that connects borrowers directly
        with a diverse pool of funders, including local governments, NGOs,
        private investors, and community members.
      </p>

      <div className="what-we-offer">
        <h3 className="mb-2 text-[18px] font-bold uppercase md:text-xl lg:text-2xl">
          What We Offer
        </h3>
        <ul className="flex list-disc flex-col gap-2 pl-5 text-gray-600">
          <li>
            Microloans: Small, short-term loans that help individuals and
            businesses kickstart their projects, purchase equipment, or expand
            their operations. Our microloans come with low-interest rates and
            flexible repayment terms, making them an affordable option for those
            who need a financial boost.
          </li>
          <li>
            Grants: For those who need funding without the burden of repayment,
            our grants provide direct financial support to deserving projects,
            such as community initiatives, educational programs, and
            agricultural improvements.
          </li>
          <li>
            Accessible Application Process: With just a smartphone and internet
            access, borrowers can easily apply for funding through our
            user-friendly platform. Our streamlined process means no excessive
            paperwork, long waiting periods, or hidden fees—just quick access to
            the funds you need.
          </li>
          <li>
            Transparent and Secure: Every transaction on our platform is
            recorded on the blockchain, ensuring complete transparency and
            security. This means that both borrowers and funders can trust that
            funds are managed responsibly, with every penny accounted for.
          </li>
          <li>
            Community-Driven Impact: By pooling funds from various sources, our
            platform enables everyone to contribute to local economic growth.
            Whether you’re borrowing to start a new venture or investing to
            support your community, our loaning services create a positive
            impact for all involved.
          </li>
          <li>
            Our mission is to break down financial barriers and create
            opportunities for those often overlooked by traditional finance.
            With our innovative loaning services, we aim to build stronger, more
            resilient communities—one loan, one grant, and one success story at
            a time
          </li>
        </ul>
      </div>
    </section>
  );
};

export default LoansAndGrants;
