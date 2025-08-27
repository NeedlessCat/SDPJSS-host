import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import {
  Calendar,
  Filter,
  Banknote,
  Package,
  Clock,
  CreditCard,
  Truck,
  Heart,
  User,
  Users,
  Download, // <-- ADDED
  Scissors, // <-- ADDED for template
} from "lucide-react";
import html2pdf from "html2pdf.js"; // <-- ADDED
import { AppContext } from "../../context/AppContext";

// ==============================================================================
// RECEIPT TEMPLATE & HELPERS (Copied from your provided code)
// ==============================================================================

// Helper function to convert numbers to words
const toWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  if (num === 0) return "Zero";
  let words = "";
  if (Math.floor(num / 10000000) > 0) {
    words += toWords(Math.floor(num / 10000000)) + " Crore ";
    num %= 10000000;
  }
  if (Math.floor(num / 100000) > 0) {
    words += toWords(Math.floor(num / 100000)) + " Lakh ";
    num %= 100000;
  }
  if (Math.floor(num / 1000) > 0) {
    words += toWords(Math.floor(num / 1000)) + " Thousand ";
    num %= 1000;
  }
  if (Math.floor(num / 100) > 0) {
    words += ones[Math.floor(num / 100)] + " Hundred ";
    num %= 100;
  }
  if (num >= 20) {
    words += tens[Math.floor(num / 10)] + " ";
    words += ones[num % 10] + " ";
  } else if (num >= 10) {
    words += teens[num - 10] + " ";
  } else if (num > 0) {
    words += ones[num] + " ";
  }
  return words.trim();
};

// Receipt Template Component
const ComplexReceiptTemplate = ({ receiptData }) => {
  if (!receiptData) return null;

  const { donation, user, childUser } = receiptData;
  const donorName = childUser ? childUser.fullname : user.fullname;
  const relationship = donation.relationName
    ? `W/o ${donation.relationName}`
    : `S/o ${childUser ? user.fullname : user.fatherName}`;
  const finalTotalAmount = donation.amount;

  return (
    <>
      <style>
        {`@media print { 
            body { -webkit-print-color-adjust: exact; } 
            .bill-container { box-shadow: none !important; border: none !important;} 
          }`}
      </style>
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          width: "60%",
          height: "60%",
          transform: "translate(-50%, -50%)",
          backgroundImage:
            "url(https://res.cloudinary.com/needlesscat/image/upload/v1754307740/logo_unr2rc.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "contain",
          opacity: 0.08,
          zIndex: 10,
          pointerEvents: "none",
        }}
      />
      <div
        className="bill-container"
        style={{
          maxWidth: "800px",
          margin: "auto",
          border: "1px solid #ccc",
          padding: "10px 20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#333",
          position: "relative",
          backgroundColor: "white",
        }}
      >
        <div
          className="header"
          style={{
            textAlign: "center",
            borderBottom: "2px solid #d32f2f",
            paddingBottom: "10px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <b>Estd. 1939</b>
            </span>
            <span>
              <b>Reg. No. 2020/272</b>
            </span>
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#d32f2f",
              marginBottom: "1px",
            }}
          >
            SHREE DURGAJI PATWAY JATI SUDHAR SAMITI
          </div>
          <div style={{ marginBottom: "1px", fontSize: "14px" }}>
            Shree Durga Sthan, Patwatoli, Manpur, P.O. Buniyadganj, Gaya Ji -
            823003
          </div>
          <div style={{ fontSize: "12px", color: "#444" }}>
            <strong>PAN:</strong> ABBTS1301C | <strong>Contact:</strong> 0631
            2952160, +91 9472030916 | <strong>Email:</strong>{" "}
            sdpjssmanpur@gmail.com
          </div>
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "center",
            margin: "10px 0",
            letterSpacing: "1px",
          }}
        >
          DONATION RECEIPT
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
            fontSize: "12px",
          }}
        >
          <div>
            <strong>Receipt No:</strong> {donation.receiptId}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(donation.createdAt || donation.date).toLocaleDateString(
              "en-IN",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "10px",
            border: "1px dashed #ddd",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#d32f2f",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Donor Details
          </h3>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Name:</strong> {donorName} {relationship}
          </p>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Mobile:</strong> {user.contact?.mobileno?.code}{" "}
            {user.contact?.mobileno?.number}
          </p>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Address:</strong>{" "}
            {donation.postalAddress === "Will collect from Durga Sthan" ||
            donation.postalAddress === "" ? (
              <>
                {user.address?.room ? `Room-${user.address.room}, ` : ""}
                {user.address?.floor ? `Floor-${user.address.floor}, ` : ""}
                {user.address?.apartment ? `${user.address.apartment}, ` : ""}
                {user.address?.landmark ? `${user.address.landmark}, ` : ""}
                {user.address?.street ? `${user.address.street}, ` : ""}
                {user.address?.postoffice
                  ? `PO: ${user.address.postoffice}, `
                  : ""}
                {user.address?.city ? `${user.address.city}, ` : ""}
                {user.address?.district ? `${user.address.district}, ` : ""}
                {user.address?.state ? `${user.address.state}, ` : ""}
                {user.address?.country ? `${user.address.country} ` : ""}
                {user.address?.pin ? `- ${user.address.pin}` : ""}
              </>
            ) : (
              donation.postalAddress
            )}
          </p>
        </div>
        <div
          style={{
            backgroundColor: "#f9f9f9",
            padding: "10px",
            border: "1px dashed #ddd",
            borderRadius: "8px",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#d32f2f",
              borderBottom: "1px solid #eee",
              paddingBottom: "5px",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Donation Details
          </h3>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Amount Donated:</strong> ₹
            {finalTotalAmount.toLocaleString("en-IN")} (
            {toWords(finalTotalAmount)} Rupees Only)
          </p>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Mode of Payment:</strong> {donation.method}
          </p>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Date of Donation:</strong>{" "}
            {new Date(donation.createdAt || donation.date).toLocaleDateString(
              "en-IN",
              { year: "numeric", month: "long", day: "numeric" }
            )}
          </p>
          <p style={{ fontSize: "12px", margin: "2px 0" }}>
            <strong>Purpose of Donation:</strong> Durga Puja celebrations and
            societal welfare
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            marginTop: "15px",
            fontSize: "12px",
          }}
        >
          <div>
            <h3
              style={{
                marginTop: 0,
                color: "#d32f2f",
                borderBottom: "1px solid #eee",
                paddingBottom: "5px",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Declaration
            </h3>
            <p style={{ margin: "0 0 5px 0" }}>
              This receipt acknowledges the above donation received by{" "}
              <strong>SDPJSS</strong>. We deeply appreciate your support towards
              our cultural and welfare initiatives.
            </p>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "1px",
            paddingTop: "1px",
            borderTop: "1px solid #ccc",
            fontSize: "10px",
            color: "#777",
          }}
        >
          <p>
            This is an electronically generated document, hence does not require
            signature.
          </p>
          <p style={{ fontStyle: "italic" }}>
            Generated on {new Date().toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </>
  );
};

// ==============================================================================
// DONATION SECTION COMPONENT
// ==============================================================================

const DonationSection = () => {
  const { donations, donationsLoading, userData } = useContext(AppContext);
  const receiptRef = useRef(null); // <-- ADDED for PDF generation
  const [receiptData, setReceiptData] = useState(null); // <-- ADDED state to hold data for PDF

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDonatedAs, setSelectedDonatedAs] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("completed");

  // <-- NEW: useEffect to trigger PDF download when receiptData is set -->
  useEffect(() => {
    if (receiptData && receiptRef.current) {
      const opt = {
        margin: 0.5,
        filename: `Receipt-${receiptData.donation.receiptId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf()
        .from(receiptRef.current)
        .set(opt)
        .save()
        .then(() => {
          setReceiptData(null); // Reset after saving
        });
    }
  }, [receiptData]);

  const validDonations = useMemo(() => {
    if (!donations || donations.length === 0) return [];
    return donations.filter(
      (donation) =>
        donation.paymentStatus === "completed" ||
        donation.paymentStatus === "failed" ||
        donation.paymentStatus === "pending"
    );
  }, [donations]);

  const availableYears = useMemo(() => {
    if (!validDonations || validDonations.length === 0) return [currentYear];
    const years = [
      ...new Set(
        validDonations.map((donation) => new Date(donation.date).getFullYear())
      ),
    ];
    return years.sort((a, b) => b - a);
  }, [validDonations]);

  const availableCategories = useMemo(() => {
    if (!validDonations || validDonations.length === 0) return ["All"];
    const categories = new Set(["All"]);
    validDonations.forEach((donation) => {
      donation.list.forEach((item) => categories.add(item.category));
    });
    return Array.from(categories);
  }, [validDonations]);

  const availableDonatedAs = useMemo(() => {
    if (!validDonations || validDonations.length === 0) return ["All"];
    const donatedAs = new Set(["All"]);
    validDonations.forEach((donation) => {
      if (donation.donatedAs) {
        donatedAs.add(donation.donatedAs);
      }
    });
    return Array.from(donatedAs);
  }, [validDonations]);

  const filteredDonations = useMemo(() => {
    if (!validDonations || validDonations.length === 0) return [];
    return validDonations.filter((donation) => {
      const donationYear = new Date(donation.date).getFullYear();
      const yearMatch = donationYear === selectedYear;
      const statusMatch = donation.paymentStatus === selectedStatus;
      const categoryMatch =
        selectedCategory === "All" ||
        donation.list.some((item) => item.category === selectedCategory);
      const donatedAsMatch =
        selectedDonatedAs === "All" || donation.donatedAs === selectedDonatedAs;
      return yearMatch && statusMatch && categoryMatch && donatedAsMatch;
    });
  }, [
    validDonations,
    selectedYear,
    selectedCategory,
    selectedDonatedAs,
    selectedStatus,
  ]);

  const yearlyTotals = useMemo(() => {
    if (!validDonations || validDonations.length === 0) return 0;
    const completedYearDonations = validDonations.filter(
      (donation) =>
        new Date(donation.date).getFullYear() === selectedYear &&
        donation.paymentStatus === "completed"
    );
    return completedYearDonations.reduce(
      (total, donation) =>
        total + donation.amount + (donation.courierCharge || 0),
      0
    );
  }, [validDonations, selectedYear]);

  const filteredTotals = useMemo(() => {
    if (!filteredDonations || filteredDonations.length === 0)
      return { totalAmount: 0, totalCourierCharges: 0, totalCount: 0 };
    return {
      totalAmount: filteredDonations.reduce(
        (total, donation) => total + donation.amount,
        0
      ),
      totalCourierCharges: filteredDonations.reduce(
        (total, donation) => total + (donation.courierCharge || 0),
        0
      ),
      totalCount: filteredDonations.length,
    };
  }, [filteredDonations]);

  const formatDate = (dateString) => {
    return (
      new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      }) + " IST"
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "failed":
        return "text-red-600 bg-red-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // <-- NEW: Handler to prepare data and trigger download -->
  const handleDownloadClick = (donation) => {
    const dataForReceipt = {
      donation: donation,
      user: userData,
      childUser: donation.donatedAs === "child" ? donation.childUser : null,
      weightAdjustmentMessage: 0, // Set default or get from donation if available
    };
    setReceiptData(dataForReceipt);
  };

  if (donationsLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Donation History
        </h1>
        <p className="text-gray-600">
          Track your contributions and make a difference in the world
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium opacity-90">
                Total Donations for {selectedYear}
              </h2>
              <p className="text-3xl font-bold mt-2">
                ₹{yearlyTotals.toLocaleString()}
              </p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-lg">
              <Banknote className="w-8 h-8" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-lg border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Filtered Results Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {filteredTotals.totalCount}
              </p>
              <p className="text-sm text-gray-600">Donations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-rose-600">
                ₹{filteredTotals.totalAmount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Amount</p>
            </div>
            <div className="text-center hidden sm:block">
              <p className="text-2xl font-bold text-red-700">
                ₹{filteredTotals.totalCourierCharges.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Courier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-1" />
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="w-4 h-4 inline mr-1" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 inline mr-1" />
              Donated As
            </label>
            <select
              value={selectedDonatedAs}
              onChange={(e) => setSelectedDonatedAs(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              {availableDonatedAs.map((donatedAs) => (
                <option key={donatedAs} value={donatedAs}>
                  {donatedAs === "All"
                    ? "All"
                    : donatedAs === "self"
                    ? "Self Donation"
                    : donatedAs === "child"
                    ? "Child Donation"
                    : donatedAs}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Package className="w-4 h-4 inline mr-1" />
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {filteredDonations.length === 0 ? (
          <div className="text-center py-12 bg-red-50 rounded-lg border-2 border-dashed border-red-200">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No donations found
            </h3>
            <p className="text-gray-500">
              {validDonations.length === 0
                ? "You haven't made any donations yet. Start your journey of giving today!"
                : "No donations match your current filters. Try adjusting your search criteria."}
            </p>
          </div>
        ) : (
          filteredDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-lg hover:border-red-200 transition-all duration-200"
            >
              <div className="p-4 sm:p-6 relative">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <div className="bg-red-100 p-2 rounded-lg">
                      <Banknote className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        ₹{donation.amount.toLocaleString()}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(donation.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        donation.paymentStatus
                      )}`}
                    >
                      {donation.paymentStatus.charAt(0).toUpperCase() +
                        donation.paymentStatus.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center">
                      <CreditCard className="w-4 h-4 mr-1" />
                      {donation.method}
                    </span>
                    {donation.donatedAs && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium flex items-center">
                        {donation.donatedAs === "self" ? (
                          <User className="w-4 h-4 mr-1" />
                        ) : (
                          <Users className="w-4 h-4 mr-1" />
                        )}
                        {donation.donatedAs === "self"
                          ? "Self"
                          : donation.donatedAs === "child"
                          ? "Child"
                          : donation.donatedAs}
                      </span>
                    )}
                  </div>
                </div>

                {/* Donation Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Donation Items:
                  </h4>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {donation.list.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">
                              {item.category}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.number}
                            </p>
                            {item.isPacket && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                                Packet
                              </span>
                            )}
                          </div>
                          <p className="font-semibold text-gray-900">
                            ₹{item.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and Download Button */}
                <div className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex-grow">
                    {donation.transactionId && (
                      <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                        Transaction ID:{" "}
                        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                          {donation.transactionId}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Truck className="w-4 h-4 mr-1" /> Courier Charge: ₹
                      {donation.courierCharge || 0}
                    </div>
                  </div>

                  {/* <-- THE NEW DOWNLOAD BUTTON --> */}
                  {donation.paymentStatus === "completed" && (
                    <button
                      onClick={() => handleDownloadClick(donation)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                    >
                      <Download size={16} />
                      Download Receipt
                    </button>
                  )}
                </div>

                {donation.remarks && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                    <p className="text-sm text-red-900">
                      <strong>Remarks:</strong> {donation.remarks}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* <-- ADDED: Hidden container for generating the receipt PDF --> */}
      {receiptData && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div ref={receiptRef}>
            <ComplexReceiptTemplate receiptData={receiptData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationSection;
