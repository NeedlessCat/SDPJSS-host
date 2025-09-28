import React from "react";
import { assets } from "../assets/assets";

const Template1 = ({ formData }) => {
  const {
    name = "Mr. Jay Kumar",
    fatherName = "Manoj Kumar",
    role = "Website Developer",
    workInvolved = [
      "Requirement Analysis",
      "Architecture Design",
      "Development",
      "Testing",
      "Deployment",
      "Maintenance of the website",
    ],
    keyFeatures = [
      "Authentication based registration",
      "Secured login page",
      "Donation portal",
      "Dynamic notification board",
      "Mobile responsiveness",
      "Content & branding page – aligned with community values",
    ],
    date = "30/09/2025",
    certificateNumber = "SDPJSS-03WD524",
    backgroundColor = "white",
  } = formData;

  return (
    <div
      className="w-[210mm] h-[297mm] mx-auto bg-white p-4 certificate-container"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Main Border - Dashed Blue */}
      <div className="w-full h-full border-4 border-dashed border-blue-400 relative bg-white">
        {/* Inner Border - Solid Blue */}
        <div className="absolute inset-2 border-2 border-blue-500 bg-white">
          {/* Header Section */}
          <div className="text-center pt-3 px-6">
            {/* Top Header Info */}
            <div className="text-xs text-black flex justify-between items-center mb-3">
              <span className="font-semibold">Estd. 1939</span>
              <span className="text-red-600 font-bold text-sm">
                || श्री दुर्गा देवी जी ||
              </span>
              <span className="font-semibold">Reg. No.: 272/2020</span>
            </div>

            {/* Semi-Circular Organization Name with Logo and Registration Info */}
            <div className="flex justify-center mb-6 mx-8">
              <div className="relative w-full h-[330px]">
                {/* Semi-circular text path for organization name - matching certificate box width */}
                <svg className="w-full h-full" viewBox="0 0 600 95">
                  <defs>
                    <path
                      id="semicircle"
                      d="M 50, 180 A 250,250 0 0,1 550,180"
                    />
                  </defs>
                  <text
                    className="fill-red-600 font-bold"
                    style={{ fontSize: "35px" }}
                  >
                    <textPath href="#semicircle" startOffset="0%">
                      SHREE DURGA JI PATWAY JATI SUDHAR SAMITI
                    </textPath>
                  </text>
                </svg>

                {/* Center Logo */}
                <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                  <div className="w-40 h-40 border-2 border-red-600 rounded-full flex items-center justify-center bg-white">
                    <img
                      className="w-40 h-40 object-contain"
                      src="https://res.cloudinary.com/needlesscat/image/upload/v1754307740/logo_unr2rc.jpg"
                      alt="Logo"
                    />
                  </div>
                </div>

                {/* Registration Info inside the circle */}
                <div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                  style={{ width: "500px" }}
                >
                  <div className="text-md text-blue-600 font-semibold mb-1">
                    Registered under Indian Trusts Act, 1882
                  </div>
                  <div className="text-md text-black leading-tight">
                    Patwatoli, Manipur, P.O. Buniyadganj, Gaya Ji – 823003,
                    Bihar, India
                  </div>
                </div>
              </div>
            </div>

            {/* Certificate Title with Yellow Background */}
            <div className="bg-yellow-400 py-2 mb-4 mx-8">
              <h2 className="text-blue-700 text-xl font-bold tracking-wide">
                CERTIFICATE OF APPRECIATION
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 mb-4">
            {/* Certificate Text */}
            <p className="text-sm text-black mb-4 leading-relaxed text-justify">
              This is to formally certify that{" "}
              <strong className="text-blue-700">{name}</strong> S/O{" "}
              <strong className="text-blue-700">{fatherName}</strong> has
              successfully served as <strong>{role}</strong> for the official
              website of our registered Trust,{" "}
              <strong>Shree Durga Ji Patway Jati Sudhar Samiti</strong>{" "}
              accessible at{" "}
              <span className="text-blue-600 underline">www.sdpjss.org</span>
            </p>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8 mb-4">
              {/* Work Involved */}
              <div>
                <h3 className="text-green-600 font-bold text-sm mb-3 underline">
                  Work involved:
                </h3>
                <ol className="text-xs text-black space-y-1 leading-relaxed">
                  {workInvolved.map((work, index) => (
                    <li key={index} className="flex">
                      <span className="min-w-[20px]">{index + 1}.</span>
                      <span>{work}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-green-600 font-bold text-sm mb-3 underline">
                  Key features developed:
                </h3>
                <ol className="text-xs text-black space-y-1 leading-relaxed">
                  {keyFeatures.map((feature, index) => (
                    <li key={index} className="flex">
                      <span className="min-w-[20px]">{index + 1}.</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Recognition Statement */}
            <p className="text-sm text-black text-center mb-4 leading-relaxed italic">
              This certificate is issued in recognition of their outstanding
              contribution, technical excellence, and dedication to the
              community service.
            </p>

            {/* Certificate Details */}
            <div className="space-y-1 mb-6 text-sm">
              <div className="flex">
                <span className="text-blue-700 font-bold w-28">Issued on</span>
                <span className="text-black">: {date}</span>
              </div>
              <div className="flex">
                <span className="text-blue-700 font-bold w-28">Place:</span>
                <span className="text-black">: Manipur, Gaya, Bihar</span>
              </div>
              <div className="flex">
                <span className="text-blue-700 font-bold w-28">
                  Certificate S.No.
                </span>
                <span className="text-black">: {certificateNumber}</span>
              </div>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="px-8 mb-16">
            <div className="flex justify-between items-end mb-2">
              <div className="text-center">
                <div className="text-green-600 font-bold text-sm">
                  President
                </div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold text-sm">
                  Secretary
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <div className="text-red-600 font-bold text-sm">
                Shree Durga Ji Patway Jati Sudhar Samiti
              </div>
            </div>
          </div>

          {/* Bottom Contact Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs py-2">
            <div className="flex justify-between px-6 items-center">
              <span>📞 +91 9472030016</span>
              <span>✉ sdpjssmanipurl@gmail.com</span>
              <span>🌐 www.sdpjss.org</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template1;
