import React from "react";
import { assets } from "../assets/assets";

const Template2 = ({ formData = {} }) => {
  const {
    name = "Mr. Jay Kumar",
    fatherName = "Manoj Kumar",
    role = "Website Developer",
    workInvolved = [
      "Requirement Analysis",
      "UI/UX Architecture Design",
      "Development",
      "Testing",
      "Deployment",
      "Maintenance of the website",
    ],
    keyFeatures = [
      "Authentication based registration",
      "Secured login system",
      "Donation portal",
      "Dynamic notification board",
      "Mobile responsiveness",
      "Content & branding – aligned with community values",
    ],
    date = "30/09/2025",
    certificateNumber = "SDPJSS-25JM001",
  } = formData;

  // Template background - replace this URL with your actual template2bg asset
  const template2bg = assets.template2bg;
  return (
    <div
      className="w-[210mm] h-[297mm] mx-auto relative certificate-container"
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        backgroundImage: `url(${template2bg})`,
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Inner content with padding for the decorative border */}
      <div className="absolute inset-[32px] flex flex-col">
        {/* Header Section with Blue Background - Taller */}
        <div className="bg-blue-900 text-yellow-400 text-center py-4 pb-16 px-4 ml-2.5 mr-2 my-0.5">
          <div className="flex justify-between text-[10px] mb-1 px-6">
            <span>Estd. 1939</span>
            <span className="text-yellow-300">|| ॐ श्री दुर्गायै नमः ||</span>
            <span>Reg. No.: 272/2020</span>
          </div>
          <h1 className="text-2xl font-bold pt-5">
            SHREE DURGA JI PATWAY JATI SUDHAR SAMITI
          </h1>
        </div>

        {/* Logo Section - Overlapping Header */}
        <div className="relative flex justify-center -mt-12 z-10">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white border-2 border-yellow-700 shadow-lg">
            <img
              src="https://res.cloudinary.com/needlesscat/image/upload/v1754307740/logo_unr2rc.jpg"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Registration Info */}
        <div className="bg-black/25 text-center pt-1 pb-3 px-6 ml-2.5 mr-2 mt-8">
          <div className="text-xs font-semibold text-gray-800">
            Registered under Indian Trusts Act, 1882
          </div>
          <div className="text-xs text-gray-700">
            Patwatoli, Manpur, P.O. Buniyadganj, Gaya Ji – 823003, Bihar, India
          </div>
        </div>

        {/* Certificate Title with Gradient */}
        <div
          className="text-center pt-1 pb-5 mt-7 ml-2.5 mr-2"
          style={{
            background:
              "linear-gradient(to right, rgba(252, 211, 77, 0), rgba(252, 211, 77, 1), rgba(252, 211, 77, 0))",
          }}
        >
          <h2 className="text-blue-900 text-2xl font-bold tracking-wide">
            CERTIFICATE OF APPRECIATION
          </h2>
        </div>

        {/* Main Content - Transparent Background */}
        <div className="flex-1 bg-transparent px-12 py-4">
          <p className="text-sm text-gray-800 mb-4 leading-relaxed">
            <em>This is to formally certify that</em>{" "}
            <strong className="text-blue-800">{name}</strong> <em>S/O</em>{" "}
            <strong className="text-blue-800">{fatherName}</strong>{" "}
            <em>has successfully served as</em>{" "}
            <strong className="text-blue-800">{role}</strong>{" "}
            <em>for the official website of our registered Trust,</em>{" "}
            <strong>Shree Durga Ji Patway Jati Sudhar Samiti</strong>{" "}
            <em>accessible at</em>{" "}
            <span className="text-blue-600 font-semibold underline">
              www.sdpjss.org
            </span>
          </p>

          <div className="grid grid-cols-2 gap-6 mb-4">
            {/* Work Involved */}
            <div>
              <h3 className="text-green-700 font-bold text-sm mb-2">
                Work involved:
              </h3>
              <ol className="text-xs text-gray-800 space-y-1 leading-relaxed">
                {workInvolved.map((work, index) => (
                  <li key={index}>
                    {index + 1}. {work}
                  </li>
                ))}
              </ol>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-green-700 font-bold text-sm mb-2">
                Key features developed:
              </h3>
              <ol className="text-xs text-gray-800 space-y-1 leading-relaxed">
                {keyFeatures.map((feature, index) => (
                  <li key={index}>
                    {index + 1}. {feature}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <p className="text-sm text-gray-800 text-left mb-4 italic leading-relaxed">
            This certificate is issued in recognition of their outstanding
            contribution, technical excellence, and dedication to the community
            service.
          </p>

          {/* Certificate Details */}
          <div className="space-y-1 mb-4">
            <div className="flex text-sm">
              <span className="text-blue-800 font-bold w-32">Issued on</span>
              <span className="text-red-700">: {date}</span>
            </div>
            <div className="flex text-sm">
              <span className="text-blue-800 font-bold w-32">Place</span>
              <span className="text-red-700">: Manpur, Gaya, Bihar</span>
            </div>
            <div className="flex text-sm">
              <span className="text-blue-800 font-bold w-32">
                Certificate S.No.
              </span>
              <span className="text-red-700">: {certificateNumber}</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end mt-16 px-8">
            {/* President on the left */}
            <div className="text-center">
              <div className="text-green-700 font-bold text-sm mb-[62px]">
                President
              </div>
            </div>

            {/* Container for Secretary and Samiti Name on the right */}
            <div className="text-center">
              <div className="text-green-700 font-bold text-sm">Secretary</div>
              <div className="text-red-700 font-bold text-base mt-2">
                Shree Durga Ji Patway Jati Sudhar Samiti
              </div>
              <div className="text-red-700 font-bold text-base mt-1">
                Patwatoli, Manpur, Gaya Ji - 823003
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Contact Info */}
        <div className="bg-blue-900 text-white text-xs pt-1 pb-3 px-6 ml-2.5 mr-2 mb-0.5">
          <div className="flex justify-between items-center">
            <span>📞 +91 9472030916</span>
            <span>✉ sdpjssmanpur@gmail.com</span>
            <span>🌐 www.sdpjss.org</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template2;
