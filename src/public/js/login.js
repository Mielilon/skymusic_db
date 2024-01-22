const login = async (email, password) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
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
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
