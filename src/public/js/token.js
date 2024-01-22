const token = async (email, password) => {
    try {
        const res = await fetch('/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({
                email,
                password
            })
        }).then((response) => {
            return response.json();
        });

        document.querySelector('.res').innerHTML = JSON.stringify(res);
    } catch (err) {
        document.querySelector('.res').innerHTML = 'Something went wrong!'
    }

}

document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    token(email, password);
})