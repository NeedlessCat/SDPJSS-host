import React from "react";

const Template2 = ({ formData }) => {
  const {
    name = "Mr. Jay Kumar",
    fatherName = "Manoj Kumar",
    role = "Website Developer",
    workInvolved = [],
    keyFeatures = [],
    date = new Date().toLocaleDateString("en-GB"),
    certificateNumber = "SDPJSS-25JM001",
    backgroundColor = "blue",
  } = formData;

  const bgClass =
    backgroundColor === "yellow" ? "bg-yellow-100" : "bg-blue-600";
  const textClass =
    backgroundColor === "yellow" ? "text-blue-600" : "text-white";

  return (
    <div
      className="w-[210mm] h-[297mm] mx-auto bg-white p-4 certificate-container"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Decorative Golden Border */}
      <div
        className="w-full h-full relative"
        style={{
          background: "linear-gradient(45deg, #d4af37, #ffd700, #d4af37)",
          padding: "8px",
        }}
      >
        <div className="w-full h-full bg-white relative">
          {/* Header Section */}
          <div className="text-center pt-4 px-8">
            <div className="text-xs text-gray-600 flex justify-between mb-2">
              <span>Estd. 1939</span>
              <span className="text-red-600">|| श्री दुर्गा जी देवी जी ||</span>
              <span>Reg. No.: 272/2020</span>
            </div>

            <div className={`${bgClass} ${textClass} py-3 mb-4`}>
              <h1 className="text-xl font-bold tracking-wider">
                SHREE DURGA JI PATWAY JATI SUDHAR SAMITI
              </h1>
            </div>

            {/* Circular Logo */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 border-4 border-red-600 rounded-full flex items-center justify-center bg-white">
                <div className="text-center">
                  <div className="text-red-600 text-lg font-bold">△</div>
                  <div className="text-xs text-red-600">LOGO</div>
                </div>
              </div>
            </div>

            <div className="text-xs text-blue-600 mb-2">
              <strong>Registered under Indian Trusts Act, 1882</strong>
            </div>
            <div className="text-xs text-gray-700 mb-6">
              Patwatoli, Manipur, P.O. Buniyadganj, Gaya JI – 823003, Bihar,
              India
            </div>

            <div className="bg-yellow-100 py-3 mb-6">
              <h2 className="text-blue-600 text-xl font-bold">
                CERTIFICATE OF APPRECIATION
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 mb-6">
            <p className="text-sm text-gray-700 mb-4 italic">
              This is to formally certify that{" "}
              <strong className="text-blue-600">{name}</strong> S/O{" "}
              <strong className="text-blue-600">{fatherName}</strong> has
              successfully served as <strong>{role}</strong> for the official
              website of our registered Trust,{" "}
              <strong>Shree Durga Ji Patway Jati Sudhar Samiti</strong>{" "}
              accessible at{" "}
              <span className="text-blue-600 underline">www.sdpjss.org</span>
            </p>

            <div className="grid grid-cols-2 gap-8 mb-6">
              {/* Work Involved */}
              <div>
                <h3 className="text-green-600 font-bold text-sm mb-3">
                  Work involved:
                </h3>
                <ol className="text-xs text-gray-700 space-y-1">
                  {workInvolved.map((work, index) => (
                    <li key={index}>
                      {index + 1}. {work}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-green-600 font-bold text-sm mb-3">
                  Key features developed:
                </h3>
                <ol className="text-xs text-gray-700 space-y-1">
                  {keyFeatures.map((feature, index) => (
                    <li key={index}>
                      {index + 1}. {feature}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="text-sm text-gray-700 text-center italic mb-8">
              This certificate is issued in recognition of their outstanding
              contribution, technical excellence, and dedication to the
              community service.
            </p>

            {/* Footer Info */}
            <div className="space-y-2 mb-6">
              <div className="flex">
                <span className="text-blue-600 font-bold text-sm w-24">
                  Issued on
                </span>
                <span className="text-red-600 text-sm">: {date}</span>
              </div>
              <div className="flex">
                <span className="text-blue-600 font-bold text-sm w-24">
                  Place:
                </span>
                <span className="text-red-600 text-sm">
                  : Manipur, Gaya, Bihar
                </span>
              </div>
              <div className="flex">
                <span className="text-blue-600 font-bold text-sm w-24">
                  Certificate S.No.
                </span>
                <span className="text-red-600 text-sm">
                  : {certificateNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="px-8 pb-6">
            <div className="flex justify-between items-end">
              <div className="text-center">
                <div className="text-green-600 font-bold text-sm mb-2">
                  President
                </div>
              </div>
              <div className="text-center">
                <div className="text-green-600 font-bold text-sm mb-2">
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

          {/* Bottom Contact */}
          <div className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs py-2">
            <div className="flex justify-between px-4">
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

export default Template2;
