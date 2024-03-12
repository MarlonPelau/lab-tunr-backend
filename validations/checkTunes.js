const checkName = (req, res, next) => {
    if (req.body.name) {
      console.log('name is ok')
      return next()
    } else {
      res.status(400).json({ error: 'Name is required' })
    }
  }
// this code below is for two different error messages to help with easier error findings
// const checkName = (req, res, next) => {
//     if (!req.body.name) {
//       res.status(400).json({ error: "Name is required" });
//     } else if (!req.body.description) {
//       res.status(400).json({ error: "Description is required" });
//     } else {
//       return next();
//     }
//   };
  // validations/checkTunes/js
  const checkBoolean = (req, res, next) => {
    const { is_favorite } = req.body;
  
    if (
      is_favorite === "true" ||
      is_favorite === "false" ||
      is_favorite === "true" ||
      typeof is_favorite == "boolean"
    ) {
      console.log("received boolean");
      next();
    } else {
      res.status(400).json({ error: "is_favorite must be a boolean value" });
    }
  };
  
  module.exports = { checkBoolean, checkName }