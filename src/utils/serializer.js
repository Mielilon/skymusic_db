module.exports = {
  userSerializer(user) {
    const { id, username, firstName, lastName, email } = user;
    return {
      id,
      username,
      firstName,
      lastName,
      email,
    };
  },
};
