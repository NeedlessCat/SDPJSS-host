import React from "react";

const TermsOfUseModal = ({ isOpen, onClose }) => {
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
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col"
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
        <div className="p-6 overflow-y-auto text-gray-700 space-y-4 text-sm">
          <div className="space-y-4">
            <p className="font-medium">Welcome to SDPJSS!</p>

            <p>
              These terms and conditions outline the rules and regulations for
              the use of Shree Durgaji Patway Jati Sudhar Samiti's Website,
              located at https://www.sdpjss.org.
            </p>

            <p>
              By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use SDPJSS if you do not agree to
              take all of the terms and conditions stated on this page.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Cookies
            </h3>
            <p>
              The website uses cookies to help personalize your online
              experience. By accessing SDPJSS, you agreed to use the required
              cookies.
            </p>
            <p>
              A cookie is a text file that is placed on your hard disk by a web
              page server. Cookies cannot be used to run programs or deliver
              viruses to your computer. Cookies are uniquely assigned to you and
              can only be read by a web server in the domain that issued the
              cookie to you.
            </p>
            <p>
              We may use cookies to collect, store, and track information for
              statistical or marketing purposes to operate our website. You have
              the ability to accept or decline optional Cookies. There are some
              required Cookies that are necessary for the operation of our
              website. These cookies do not require your consent as they always
              work. Please keep in mind that by accepting required Cookies, you
              also accept third-party Cookies, which might be used via
              third-party provided services if you use such services on our
              website, for example, a video display window provided by third
              parties and integrated into our website.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              License
            </h3>
            <p>
              Unless otherwise stated, Shree Durgaji Patway Jati Sudhar Samiti
              and/or its licensors own the intellectual property rights for all
              material on SDPJSS. All intellectual property rights are reserved.
              You may access this from SDPJSS for your own personal use
              subjected to restrictions set in these terms and conditions.
            </p>

            <p className="font-medium">You must not:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Copy or republish material from SDPJSS</li>
              <li>Sell, rent, or sub-license material from SDPJSS</li>
              <li>Reproduce, duplicate or copy material from SDPJSS</li>
              <li>Redistribute content from SDPJSS</li>
            </ul>

            <p>This Agreement shall begin on the date hereof.</p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              User Comments
            </h3>
            <p>
              Parts of this website offer users an opportunity to post and
              exchange opinions and information in certain areas of the website.
              Shree Durgaji Patway Jati Sudhar Samiti does not filter, edit,
              publish or review Comments before their presence on the website.
              Comments do not reflect the views and opinions of Shree Durgaji
              Patway Jati Sudhar Samiti, its agents, and/or affiliates. Comments
              reflect the views and opinions of the person who posts their views
              and opinions. To the extent permitted by applicable laws, Shree
              Durgaji Patway Jati Sudhar Samiti shall not be liable for the
              Comments or any liability, damages, or expenses caused and/or
              suffered as a result of any use of and/or posting of and/or
              appearance of the Comments on this website.
            </p>

            <p>
              Shree Durgaji Patway Jati Sudhar Samiti reserves the right to
              monitor all Comments and remove any Comments that can be
              considered inappropriate, offensive, or causes breach of these
              Terms and Conditions.
            </p>

            <p className="font-medium">You warrant and represent that:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                You are entitled to post the Comments on our website and have
                all necessary licenses and consents to do so;
              </li>
              <li>
                The Comments do not invade any intellectual property right,
                including without limitation copyright, patent, or trademark of
                any third party;
              </li>
              <li>
                The Comments do not contain any defamatory, libelous, offensive,
                indecent, or otherwise unlawful material, which is an invasion
                of privacy;
              </li>
              <li>
                The Comments will not be used to solicit or promote business or
                custom or present commercial activities or unlawful activity.
              </li>
            </ul>

            <p>
              You hereby grant Shree Durgaji Patway Jati Sudhar Samiti a
              non-exclusive license to use, reproduce, edit and authorize others
              to use, reproduce and edit any of your Comments in any and all
              forms, formats, or media.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Hyperlinking to our Content
            </h3>
            <p className="font-medium">
              The following organizations may link to our Website without prior
              written approval:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Government agencies;</li>
              <li>Search engines;</li>
              <li>News organizations;</li>
              <li>
                Online directory distributors may link to our Website in the
                same manner as they hyperlink to the Websites of other listed
                businesses; and
              </li>
              <li>
                System-wide Accredited Businesses except soliciting non-profit
                organizations, charity shopping malls, and charity fundraising
                groups which may not hyperlink to our Web site.
              </li>
            </ul>

            <p>
              These organizations may link to our home page, to publications, or
              to other Website information so long as the link: (a) is not in
              any way deceptive; (b) does not falsely imply sponsorship,
              endorsement, or approval of the linking party and its products
              and/or services; and (c) fits within the context of the linking
              party's site.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Content Liability
            </h3>
            <p>
              We shall not be held responsible for any content that appears on
              your Website. You agree to protect and defend us against all
              claims that are raised on your Website. No link(s) should appear
              on any Website that may be interpreted as libelous, obscene, or
              criminal, or which infringes, otherwise violates, or advocates the
              infringement or other violation of, any third party rights.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Reservation of Rights
            </h3>
            <p>
              We reserve the right to request that you remove all links or any
              particular link to our Website. You approve to immediately remove
              all links to our Website upon request. We also reserve the right
              to amend these terms and conditions and its linking policy at any
              time. By continuously linking to our Website, you agree to be
              bound to and follow these linking terms and conditions.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Removal of Links
            </h3>
            <p>
              If you find any link on our Website that is offensive for any
              reason, you are free to contact and inform us at any moment. We
              will consider requests to remove links, but we are not obligated
              to or so or to respond to you directly.
            </p>

            <p>
              We do not ensure that the information on this website is correct.
              We do not warrant its completeness or accuracy, nor do we promise
              to ensure that the website remains available or that the material
              on the website is kept up to date.
            </p>

            <h3 className="font-semibold text-lg text-gray-800 mt-6">
              Disclaimer
            </h3>
            <p>
              To the maximum extent permitted by applicable law, we exclude all
              representations, warranties, and conditions relating to our
              website and the use of this website. Nothing in this disclaimer
              will:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                Limit or exclude our or your liability for death or personal
                injury;
              </li>
              <li>
                Limit or exclude our or your liability for fraud or fraudulent
                misrepresentation;
              </li>
              <li>
                Limit any of our or your liabilities in any way that is not
                permitted under applicable law; or
              </li>
              <li>
                Exclude any of our or your liabilities that may not be excluded
                under applicable law.
              </li>
            </ul>

            <p>
              The limitations and prohibitions of liability set in this Section
              and elsewhere in this disclaimer: (a) are subject to the preceding
              paragraph; and (b) govern all liabilities arising under the
              disclaimer, including liabilities arising in contract, in tort,
              and for breach of statutory duty.
            </p>

            <p>
              As long as the website and the information and services on the
              website are provided free of charge, we will not be liable for any
              loss or damage of any nature.
            </p>
          </div>
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

export default TermsOfUseModal;
