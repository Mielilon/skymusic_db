const loginForm = (req, res) => {
  res.status(200).render("auth/login", {
    title: "Login",
  });
};

const signupForm = (req, res) => {
  res.status(200).render("auth/signup", {
    title: "Sign Up",
  });
};

const tokenForm = (req, res) => {
  res.status(200).render("auth/token", {
    title: "Token",
  });
};

const refreshTokenForm = (req, res) => {
  res.status(200).render("auth/tokenRefresh", {
    title: "Refresh token",
  });
};

module.exports = {
  loginForm,
  signupForm,
  tokenForm,
  refreshTokenForm,
};
