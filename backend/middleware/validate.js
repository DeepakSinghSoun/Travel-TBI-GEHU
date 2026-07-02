// export const validate = (schema) => (req, res, next) => {
//   console.log(req.body);
//   try {
//     schema.parse(req.body);
//     next();
//   } catch (err) {
//     console.log("🔥 ZOD ERROR FULL:", err);
//     return res.status(400).json({
//       success: false,
//       message: err?.issues?.[0]?.message || "Validation failed",
//       errors: err?.issues,
//     });
//   }
// };

export const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body); // IMPORTANT FIX

      return next();
    } catch (err) {
      console.log("🔥 ZOD ERROR FULL:", err);

      return res.status(400).json({
        success: false,
        message: err.errors?.[0]?.message || "Validation failed",
        errors: err.errors,
      });
    }
  };
};