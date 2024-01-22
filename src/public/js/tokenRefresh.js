const tokenRefresh = async (refresh) => {
    try {
        const res = await fetch('/api/auth/token/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify({
                refresh
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
    const refresh = document.getElementById('refresh').value;
    tokenRefresh(refresh);
})