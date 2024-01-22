// Get api overview.
const getOverView = (req, res) => {
    res.status(200).render('base', {
        title: 'Overview'
    })
}

// Login form.
const getLoginForm = (req, res) => {
    res.status(200).render('auth/login', {
        title: 'Login'
    })
}

// Sign up form.
const createAccount = (req, res) => {
    res.status(200).render('auth/signup', {
        title: 'Sign Up'
    })
}

// Token create form.
const getTokenForm = (req, res) => {
    res.status(200).render('auth/token', {
        title: 'Token'
    })
}

// Refresh token form.
const refreshToken = (req, res) => {
    res.status(200).render('auth/tokenRefresh', {
        title: 'Refresh token'
    })
}

module.exports = {
    getOverView,
    getLoginForm,
    createAccount,
    getTokenForm,
    refreshToken,
}