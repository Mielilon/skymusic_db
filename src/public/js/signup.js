const signup = async (firstName, lastName, username, email, password) => {
  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        username,
        email,
        password,
      }),
    }).then((response) => {
      return response.json();
    });

    document.querySelector(".res").innerHTML = JSON.stringify(res);
  } catch (err) {
    document.querySelector(".res").innerHTML = "Что-то пошло не так!";
  }
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signup(firstName, lastName, username, email, password);
});
