import React from "react";

const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    // Main modal container with a semi-transparent background
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // Close modal when clicking on the background
    >
      {/* Modal content box */}
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal Body with scrollable content */}
        <div className="p-6 overflow-y-auto text-gray-700 space-y-4">
          <p>
            Welcome to our application. By registering, you agree to comply with
            and be bound by the following terms and conditions of use. Please
            review the following terms carefully.
          </p>

          <h3 className="font-semibold text-lg">1. Acceptance of Agreement</h3>
          <p>
            You agree to the terms and conditions outlined in this Terms and
            Conditions Agreement ("Agreement") with respect to our application.
            This Agreement constitutes the entire and only agreement between us
            and you, and supersedes all prior or contemporaneous agreements.
          </p>

          <h3 className="font-semibold text-lg">2. User Conduct</h3>
          <p>
            You agree not to use the service for any unlawful purpose or any
            purpose prohibited under this clause. You agree not to use the
            service in any way that could damage the application, services, or
            general business of the community.
          </p>

          <h3 className="font-semibold text-lg">3. Account and Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password and for restricting access to your computer.
            You agree to accept responsibility for all activities that occur
            under your account or password.
          </p>

          <h3 className="font-semibold text-lg">4. Privacy Policy</h3>
          <p>
            Our Privacy Policy, as it may change from time to time, is a part of
            this Agreement. You may review our Privacy Policy on our website.
          </p>

          <h3 className="font-semibold text-lg">5. Termination</h3>
          <p>
            We may terminate your access to the application, without cause or
            notice, which may result in the forfeiture and destruction of all
            information associated with your account.
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsModal;
