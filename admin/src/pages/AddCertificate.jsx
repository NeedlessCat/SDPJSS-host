import React, { useState, useRef, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Template2 from "../components/Template2";
import Template1 from "../components/Template1";

// --- Helper Arrays for Options (keeps the JSX cleaner) ---
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

// --- Main Component ---
const AddCertificate = () => {
  const certificateRef = useRef(null);
  const fullSizeCertificateRef = useRef(null);

  // --- State Management ---
  const [formData, setFormData] = useState({
    template: "template1",
    name: "",
    fatherName: "",
    role: "",
    workInvolved: [...workInvolvedOptions],
    keyFeatures: [...keyFeaturesOptions],
    workOthers: [""],
    keyOthers: [""],
    date: new Date().toLocaleDateString("en-GB"),
    certificateNumber: "SDPJSS-25AB001",
  });

  const [workInvolvedChecked, setWorkInvolvedChecked] = useState(
    workInvolvedOptions.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
  );

  const [keyFeaturesChecked, setKeyFeaturesChecked] = useState(
    keyFeaturesOptions.reduce((acc, curr) => ({ ...acc, [curr]: true }), {})
  );

  // --- Helper Functions ---
  const generateCertificateNumber = (name = "", fatherName = "") => {
    const lastTwoDigits = new Date().getFullYear().toString().slice(-2);
    const firstLetterName = name.charAt(0).toUpperCase() || "A";
    const firstLetterFather = fatherName.charAt(0).toUpperCase() || "B";
    const randomDigits = Math.floor(100 + Math.random() * 900);
    return `SDPJSS/2025/${randomDigits}`;
  };

  // --- Direct State Update Logic (Refactored) ---
  const updateListsInFormData = (newCheckedState, newOthersState) => {
    setFormData((prev) => {
      // Logic for workInvolved
      if (newCheckedState && newCheckedState.workInvolved) {
        const selectedWork = Object.keys(newCheckedState.workInvolved).filter(
          (key) => newCheckedState.workInvolved[key]
        );
        const additionalWork = (
          newOthersState?.workOthers || prev.workOthers
        ).filter((item) => item.trim() !== "");
        prev = { ...prev, workInvolved: [...selectedWork, ...additionalWork] };
      }

      // Logic for keyFeatures
      if (newCheckedState && newCheckedState.keyFeatures) {
        const selectedFeatures = Object.keys(
          newCheckedState.keyFeatures
        ).filter((key) => newCheckedState.keyFeatures[key]);
        const additionalFeatures = (
          newOthersState?.keyOthers || prev.keyOthers
        ).filter((item) => item.trim() !== "");
        prev = {
          ...prev,
          keyFeatures: [...selectedFeatures, ...additionalFeatures],
        };
      }
      return prev;
    });
  };

  // --- Event Handlers (Refactored) ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "name" || name === "fatherName") {
        updated.certificateNumber = generateCertificateNumber(
          name === "name" ? value : prev.name,
          name === "fatherName" ? value : prev.fatherName
        );
      }
      return updated;
    });
  };

  const handleWorkInvolvedChange = (e) => {
    const { value, checked } = e.target;
    const updatedChecked = { ...workInvolvedChecked, [value]: checked };
    setWorkInvolvedChecked(updatedChecked);
    updateListsInFormData({ workInvolved: updatedChecked }, null);
  };

  const handleKeyFeaturesChange = (e) => {
    const { value, checked } = e.target;
    const updatedChecked = { ...keyFeaturesChecked, [value]: checked };
    setKeyFeaturesChecked(updatedChecked);
    updateListsInFormData({ keyFeatures: updatedChecked }, null);
  };

  const handleDynamicListChange = (type, index, value) => {
    setFormData((prev) => {
      const newList = [...prev[type]];
      newList[index] = value;
      const updatedState = { ...prev, [type]: newList };

      if (type === "workOthers") {
        updateListsInFormData(
          { workInvolved: workInvolvedChecked },
          { workOthers: newList }
        );
      } else if (type === "keyOthers") {
        updateListsInFormData(
          { keyFeatures: keyFeaturesChecked },
          { keyOthers: newList }
        );
      }

      return updatedState;
    });
  };

  const addDynamicField = (type) => {
    setFormData((prev) => ({ ...prev, [type]: [...prev[type], ""] }));
  };

  const removeDynamicField = (type, index) => {
    setFormData((prev) => {
      const newList = prev[type].filter((_, i) => i !== index);
      const updatedState = { ...prev, [type]: newList };

      if (type === "workOthers") {
        updateListsInFormData(
          { workInvolved: workInvolvedChecked },
          { workOthers: newList }
        );
      } else if (type === "keyOthers") {
        updateListsInFormData(
          { keyFeatures: keyFeaturesChecked },
          { keyOthers: newList }
        );
      }

      return updatedState;
    });
  };

  // --- PDF Generation (Improved) ---
  const generatePDF = async () => {
    const element = certificateRef.current;
    if (!element) return;

    try {
      await document.fonts.ready;
      const canvas = await html2canvas(element, {
        scale: 3, // Increased scale for better quality
        useCORS: true,
        backgroundColor: null, // Let template background show through
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      const pdf = new jsPDF("portrait", "mm", "a4");
      const pdfWidth = 210;
      const pdfHeight = 297;

      const imgData = canvas.toDataURL("image/png", 1.0); // Use PNG for transparency

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(
        `Certificate_${formData.name}_${formData.certificateNumber}.pdf`
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please check the console for details.");
    }
  };

  // --- JSX ---
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
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
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
                  placeholder="e.g., Website Developer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Work Involved */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Work Involved
                </label>
                <div className="space-y-2">
                  {workInvolvedOptions.map((work) => (
                    <label key={work} className="flex items-center">
                      <input
                        type="checkbox"
                        value={work}
                        checked={!!workInvolvedChecked[work]}
                        onChange={handleWorkInvolvedChange}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{work}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  {formData.workOthers.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "workOthers",
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Additional work ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.workOthers.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeDynamicField("workOthers", index)
                          }
                          className="text-red-600 hover:text-red-800 px-2 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDynamicField("workOthers")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                  >
                    + Add More
                  </button>
                </div>
              </div>

              {/* Key Features */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Key Features Developed
                </label>
                <div className="space-y-2">
                  {keyFeaturesOptions.map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        value={feature}
                        checked={!!keyFeaturesChecked[feature]}
                        onChange={handleKeyFeaturesChange}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-4">
                  {formData.keyOthers.map((item, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) =>
                          handleDynamicListChange(
                            "keyOthers",
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Additional feature ${index + 1}`}
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                      />
                      {formData.keyOthers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeDynamicField("keyOthers", index)}
                          className="text-red-600 hover:text-red-800 px-2 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDynamicField("keyOthers")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                  >
                    + Add More
                  </button>
                </div>
              </div>

              {/* Certificate Number & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificate Number
                  </label>
                  <input
                    type="text"
                    name="certificateNumber"
                    value={formData.certificateNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

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
          <div className="bg-white p-6 rounded-lg shadow-lg max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 text-gray-700">
              Live Preview
            </h2>
            <div
              className="w-[210mm] h-[297mm] border"
              style={{ aspectRatio: "210/297" }}
            >
              {/* The certificateRef div now correctly fills its parent without any problematic scaling */}
              <div ref={certificateRef} className="w-full h-full">
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
