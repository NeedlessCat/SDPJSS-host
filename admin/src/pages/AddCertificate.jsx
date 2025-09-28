import React, { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Template1 from "./Template1";
import Template2 from "./Template2";

const AddCertificate = () => {
  const certificateRef = useRef(null);

  // Generate certificate number
  const generateCertificateNumber = (name, fatherName) => {
    const currentYear = new Date().getFullYear();
    const lastTwoDigits = currentYear.toString().slice(-2);
    const firstLetterName = name.charAt(0).toUpperCase() || "A";
    const firstLetterFather = fatherName.charAt(0).toUpperCase() || "B";
    const randomDigits = Math.floor(100 + Math.random() * 900);

    return `SDPJSS-${lastTwoDigits}${firstLetterName}${firstLetterFather}${randomDigits}`;
  };

  const [formData, setFormData] = useState({
    template: "template1",
    name: "",
    fatherName: "",
    role: "",
    workInvolved: [
      "Requirement Analysis",
      "Architecture Design",
      "Development",
      "Testing",
      "Deployment",
      "Maintenance of the website",
    ],
    workOthers: [""], // Array to hold multiple additional work items
    keyFeatures: [
      "Authentication based registration",
      "Secured login page",
      "Donation portal",
      "Dynamic notification board",
      "Mobile responsiveness",
      "Content & branding page – aligned with community values",
    ],
    keyOthers: [""], // Array to hold multiple additional feature items
    date: new Date().toLocaleDateString("en-GB"),
    certificateNumber: "SDPJSS-25AB001",
    backgroundColor: "white",
  });

  const [workInvolvedChecked, setWorkInvolvedChecked] = useState({
    "Requirement Analysis": true,
    "Architecture Design": true,
    Development: true,
    Testing: true,
    Deployment: true,
    "Maintenance of the website": true,
  });

  const [keyFeaturesChecked, setKeyFeaturesChecked] = useState({
    "Authentication based registration": true,
    "Secured login page": true,
    "Donation portal": true,
    "Dynamic notification board": true,
    "Mobile responsiveness": true,
    "Content & branding page – aligned with community values": true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Auto-generate certificate number when name or father name changes
      if (name === "name" || name === "fatherName") {
        updated.certificateNumber = generateCertificateNumber(
          name === "name" ? value : prev.name,
          name === "fatherName" ? value : prev.fatherName
        );
      }

      return updated;
    });
  };

  const updateWorkInvolvedList = () => {
    const selectedWork = Object.keys(workInvolvedChecked).filter(
      (key) => workInvolvedChecked[key]
    );
    const additionalWork = formData.workOthers.filter(
      (item) => item.trim() !== ""
    );

    setFormData((prev) => ({
      ...prev,
      workInvolved: [...selectedWork, ...additionalWork],
    }));
  };

  const updateKeyFeaturesList = () => {
    const selectedFeatures = Object.keys(keyFeaturesChecked).filter(
      (key) => keyFeaturesChecked[key]
    );
    const additionalFeatures = formData.keyOthers.filter(
      (item) => item.trim() !== ""
    );

    setFormData((prev) => ({
      ...prev,
      keyFeatures: [...selectedFeatures, ...additionalFeatures],
    }));
  };

  const handleWorkInvolvedChange = (e) => {
    const { value, checked } = e.target;
    setWorkInvolvedChecked((prev) => {
      const updated = { ...prev, [value]: checked };
      return updated;
    });

    // Update after state change
    setTimeout(updateWorkInvolvedList, 0);
  };

  const handleKeyFeaturesChange = (e) => {
    const { value, checked } = e.target;
    setKeyFeaturesChecked((prev) => {
      const updated = { ...prev, [value]: checked };
      return updated;
    });

    // Update after state change
    setTimeout(updateKeyFeaturesList, 0);
  };

  // Handle additional work items
  const handleWorkOthersChange = (index, value) => {
    setFormData((prev) => {
      const newWorkOthers = [...prev.workOthers];
      newWorkOthers[index] = value;
      return { ...prev, workOthers: newWorkOthers };
    });

    setTimeout(updateWorkInvolvedList, 0);
  };

  const addWorkOthersField = () => {
    setFormData((prev) => ({
      ...prev,
      workOthers: [...prev.workOthers, ""],
    }));
  };

  const removeWorkOthersField = (index) => {
    setFormData((prev) => ({
      ...prev,
      workOthers: prev.workOthers.filter((_, i) => i !== index),
    }));

    setTimeout(updateWorkInvolvedList, 0);
  };

  // Handle additional feature items
  const handleKeyOthersChange = (index, value) => {
    setFormData((prev) => {
      const newKeyOthers = [...prev.keyOthers];
      newKeyOthers[index] = value;
      return { ...prev, keyOthers: newKeyOthers };
    });

    setTimeout(updateKeyFeaturesList, 0);
  };

  const addKeyOthersField = () => {
    setFormData((prev) => ({
      ...prev,
      keyOthers: [...prev.keyOthers, ""],
    }));
  };

  const removeKeyOthersField = (index) => {
    setFormData((prev) => ({
      ...prev,
      keyOthers: prev.keyOthers.filter((_, i) => i !== index),
    }));

    setTimeout(updateKeyFeaturesList, 0);
  };

  const generatePDF = async () => {
    const element = certificateRef.current;

    try {
      // Create canvas from the certificate element
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      // Create PDF with A4 dimensions (210 x 297 mm)
      const pdf = new jsPDF("portrait", "mm", "a4");

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Canvas dimensions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate scaling to fit A4 page while maintaining aspect ratio
      const ratio = Math.min(
        pdfWidth / (canvasWidth * 0.264583),
        pdfHeight / (canvasHeight * 0.264583)
      );

      const scaledWidth = canvasWidth * 0.264583 * ratio;
      const scaledHeight = canvasHeight * 0.264583 * ratio;

      // Center the certificate on the page
      const offsetX = (pdfWidth - scaledWidth) / 2;
      const offsetY = (pdfHeight - scaledHeight) / 2;

      // Add image to PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(
        imgData,
        "JPEG",
        offsetX,
        offsetY,
        scaledWidth,
        scaledHeight
      );

      // Save the PDF
      pdf.save(
        `Certificate_${formData.name}_${formData.certificateNumber}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const workInvolvedOptions = [
    "Requirement Analysis",
    "Architecture Design",
    "Development",
    "Testing",
    "Deployment",
    "Maintenance of the website",
  ];

  const keyFeaturesOptions = [
    "Authentication based registration",
    "Secured login page",
    "Donation portal",
    "Dynamic notification board",
    "Mobile responsiveness",
    "Content & branding page – aligned with community values",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Certificate Generator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Certificate Details
            </h2>

            <form className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="template1">Template 1 (Dashed Border)</option>
                  <option value="template2">Template 2 (Golden Border)</option>
                </select>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name
                  </label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleInputChange}
                    placeholder="Enter father's name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="Enter role (e.g., Website Developer)"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Work Involved */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Work Involved
                </label>
                <div className="space-y-2">
                  {workInvolvedOptions.map((work) => (
                    <label key={work} className="flex items-center">
                      <input
                        type="checkbox"
                        value={work}
                        checked={workInvolvedChecked[work]}
                        onChange={handleWorkInvolvedChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{work}</span>
                    </label>
                  ))}
                </div>

                {/* Additional Work Items */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Additional Work:
                    </span>
                    <button
                      type="button"
                      onClick={addWorkOthersField}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add More
                    </button>
                  </div>
                  {formData.workOthers.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleWorkOthersChange(index, e.target.value)
                        }
                        placeholder={`Additional work ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.workOthers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeWorkOthersField(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Key Features Developed
                </label>
                <div className="space-y-2">
                  {keyFeaturesOptions.map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        value={feature}
                        checked={keyFeaturesChecked[feature]}
                        onChange={handleKeyFeaturesChange}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>

                {/* Additional Feature Items */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Additional Features:
                    </span>
                    <button
                      type="button"
                      onClick={addKeyOthersField}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      + Add More
                    </button>
                  </div>
                  {formData.keyOthers.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleKeyOthersChange(index, e.target.value)
                        }
                        placeholder={`Additional feature ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {formData.keyOthers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeKeyOthersField(index)}
                          className="text-red-600 hover:text-red-800 px-2"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Date and Background */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="DD/MM/YYYY"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <select
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {formData.template === "template1" ? (
                      <>
                        <option value="white">White</option>
                        <option value="blue">Blue</option>
                      </>
                    ) : (
                      <>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Certificate Number Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate Number (Auto-generated)
                </label>
                <input
                  type="text"
                  name="certificateNumber"
                  value={formData.certificateNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Generate PDF Button */}
              <button
                type="button"
                onClick={generatePDF}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Generate PDF Certificate
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Live Preview
            </h2>
            <div
              className="w-full max-w-full overflow-hidden"
              style={{ aspectRatio: "210/297" }}
            >
              <div
                ref={certificateRef}
                className="w-full h-full"
                style={{
                  transform: "scale(0.35)",
                  transformOrigin: "top left",
                  width: "285.7%",
                  height: "285.7%",
                }}
              >
                {formData.template === "template1" ? (
                  <Template1 formData={formData} />
                ) : (
                  <Template2 formData={formData} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
