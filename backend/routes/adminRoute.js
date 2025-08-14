import express from "express";
import upload from "../middlewares/multer.js";
import {
  addAdmin,
  addCategory,
  addFeature,
  addNotice,
  createCourierCharge,
  deleteCategory,
  deleteCourierCharge,
  deleteNotice,
  editAdmin,
  editCategory,
  getAdvertisementList,
  getAllCategories,
  getAvailableYears,
  getCategory,
  getCourierCharges,
  getDonationCount,
  getDonationList,
  getFamilyCount,
  getFamilyList,
  getGuestDonationList,
  getJobOpeningList,
  getNoticeList,
  getOnlineCourierAddresses,
  getStaffRequirementList,
  getUserCount,
  getUserList,
  listAdmins,
  listFeatures,
  loginAdmin,
  removeAdmin,
  removeFeature,
  updateCourierCharge,
  updateFeature,
  updateNotice,
  updateUserStatus,
} from "../controllers/adminController.js";
import {
  createKhandan,
  deleteKhandan,
  getKhandanCount,
  getKhandanList,
  updateKhandan,
} from "../controllers/khandanController.js";
import {
  addTeamMember,
  deleteTeamMember,
  getAllTeamMembersForAdmin,
  toggleTeamMemberStatus,
  updateTeamMember,
} from "../controllers/teamController.js";

import authAdmin from "../middlewares/authAdmin.js";
import {
  createDonationOrder,
  getDonationStats,
  getUserDonations,
  registerUser,
  verifyDonationPayment,
} from "../controllers/userController.js";
const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/register", upload.none(), registerUser);

adminRouter.get("/family-count", authAdmin, getFamilyCount);
adminRouter.get("/user-count", authAdmin, getUserCount);

adminRouter.get("/available-years", authAdmin, getAvailableYears); // <--- Add this new route

adminRouter.get("/family-list", authAdmin, getFamilyList);
adminRouter.get("/user-list", authAdmin, getUserList);
adminRouter.get("/staff-requirement", authAdmin, getStaffRequirementList);
adminRouter.get("/job-opening", authAdmin, getJobOpeningList);
adminRouter.get("/advertisement", authAdmin, getAdvertisementList);

adminRouter.put("/update-user-status", authAdmin, updateUserStatus);

adminRouter.get("/notice-list", authAdmin, getNoticeList);
adminRouter.post("/add-notice", authAdmin, addNotice);
adminRouter.put("/update-notice/:id", authAdmin, updateNotice);
adminRouter.delete("/delete-notice/:id", authAdmin, deleteNotice);

adminRouter.get("/donation-list", authAdmin, getDonationList);
adminRouter.get("/donation-stats", authAdmin, getDonationStats);
adminRouter.get("/donation-count", authAdmin, getDonationCount); // <-- Add this new route

adminRouter.post(
  "/create-donation-order",
  upload.none(),
  authAdmin,
  createDonationOrder
);
adminRouter.post(
  "/verify-donation-payment",
  upload.none(),
  authAdmin,
  verifyDonationPayment
);
adminRouter.get("/all-team-members", authAdmin, getAllTeamMembersForAdmin);
adminRouter.post(
  "/add-team-member",
  authAdmin,
  upload.single("image"),
  addTeamMember
);
adminRouter.put(
  "/update-team-member/:id",
  authAdmin,
  upload.single("image"),
  updateTeamMember
);
adminRouter.delete("/delete-team-member/:id", authAdmin, deleteTeamMember);
adminRouter.put("/team-members/status", authAdmin, toggleTeamMemberStatus);

// Khandan (Family) management
adminRouter.get("/khandan-list", authAdmin, getKhandanList);
adminRouter.get("/khandan-count", authAdmin, getKhandanCount);
adminRouter.post("/add-khandan", authAdmin, createKhandan);
adminRouter.put("/update-khandan/:khandanId", authAdmin, updateKhandan);
adminRouter.delete("/delete-khandan/:khandanId", authAdmin, deleteKhandan);

// Category management
adminRouter.get("/categories", getAllCategories);
adminRouter.post("/categories", addCategory);
adminRouter.get("/categories/:id", getCategory);
adminRouter.put("/categories/:id", editCategory);
adminRouter.delete("/categories/:id", deleteCategory);
adminRouter.get("/user-donations", authAdmin, getUserDonations);

// COURIER CHARGE
adminRouter.get("/courier-charges", getCourierCharges);
adminRouter.post("/courier-charges", createCourierCharge);
adminRouter.put("/courier-charges/:id", updateCourierCharge);
adminRouter.delete("/courier-charges/:id", deleteCourierCharge);

//Feature Controller Routes
// Route to add a new feature
adminRouter.post("/add", authAdmin, addFeature);

// Route to get a list of all features
adminRouter.get("/list", authAdmin, listFeatures);

// Route to update a feature by its ID
// Example: PUT /api/feature/update/60d5ecf3e7b8f01b3c8f8b8e
adminRouter.put("/update/:id", authAdmin, updateFeature);

// Route to remove a feature
adminRouter.post("/remove", authAdmin, removeFeature);

// Middleware to check for Super Admin role
const isSuperAdmin = (req, res, next) => {
  if (req.admin.role !== "superadmin") {
    return res.status(403).json({
      success: false,
      message: "Access Denied: Super Admin role required.",
    });
  }
  next();
};

adminRouter.get("/guest-donation-list", authAdmin, getGuestDonationList);

// --- Protected Super Admin Routes ---
// Apply authMiddleware first, then the isSuperAdmin check
adminRouter.post("/add-admin", authAdmin, isSuperAdmin, addAdmin);

adminRouter.get("/admins", authAdmin, isSuperAdmin, listAdmins);
adminRouter.delete("/remove-admin/:id", authAdmin, isSuperAdmin, removeAdmin); // Using DELETE is more standard
adminRouter.post("/edit-admin", authAdmin, isSuperAdmin, editAdmin);

adminRouter.get("/courier-addresses", authAdmin, getOnlineCourierAddresses);

export default adminRouter;
