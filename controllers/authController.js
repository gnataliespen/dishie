exports.home = (req, res) => {
  res.redirect("/");
};

exports.verify = (req, res) => {
  if (req.user) {
    console.log("dope");
  } else {
    console.log("not dope");
  }
};

exports.logOut = (req, res) => {
  req.logout();
  res.redirect("/");
};
