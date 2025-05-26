async function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    if (
        !usernameInput.value.trim() ||
        !passwordInput.value.trim()
    ) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: usernameInput.value,
                password: passwordInput.value
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            errorMessage.textContent = errorData.message || 'Login failed. Please try again.';
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        window.location.href = '/OTBEditor';
    } catch(err) {
        errorMessage.textContent = 'An error occurred while logging in. Please try again later.';
        console.error('Login error:', err);
        return;
    }
}