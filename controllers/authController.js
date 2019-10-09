exports.home = (req, res) => {
  res.redirect("/");
};

exports.logOut = (req, res) => {
  req.logout();
  res.redirect("/");
};
