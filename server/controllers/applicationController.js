import db from "../db/db.js";

export const getApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const [applications] = await db.query(
      `SELECT * FROM applications
       WHERE user_id = ?
       ORDER BY applied_date DESC`,
      [userId]
    );

    res.status(200).json(applications);

  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};

export const createApplication = async (req, res) => {
  try {
    const {
      company,
      role,
      location,
      status,
      applied_date,
    } = req.body;

    // Check required fields
    if (!company || !role || !location || !applied_date) {
      return res.status(400).json({
        message: "Company, role, location and applied date are required",
      });
    }

    // User ID comes from JWT
    const userId = req.user.id;

    const [result] = await db.query(
      `INSERT INTO applications
      (user_id, company, role, location, status, applied_date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        company,
        role,
        location,
        status || "Applied",
        applied_date,
      ]
    );

    return res.status(201).json({
      message: "Application added successfully",
      applicationId: result.insertId,
    });
  } catch (error) {
    console.error("Create application error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userId = req.user.id;

    const {
      company,
      role,
      location,
      status,
      applied_date,
    } = req.body;

    if (!company || !role || !location || !applied_date) {
      return res.status(400).json({
        message: "Company, role, location and applied date are required",
      });
    }

    const [result] = await db.query(
      `UPDATE applications
       SET company = ?,
           role = ?,
           location = ?,
           status = ?,
           applied_date = ?
       WHERE id = ? AND user_id = ?`,
      [
        company,
        role,
        location,
        status || "Applied",
        applied_date,
        applicationId,
        userId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application updated successfully",
    });

  } catch (error) {
    console.error("Update application error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const userId = req.user.id;

    const [result] = await db.query(
      "DELETE FROM applications WHERE id = ? AND user_id = ?",
      [applicationId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    return res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};