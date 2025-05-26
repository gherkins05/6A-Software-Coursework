async function register() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const errorMessage = document.getElementById('error-message');

    if (
        !usernameInput.value.trim() ||
        !passwordInput.value.trim() ||
        !confirmPasswordInput.value.trim()
    ) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
    }

    try {
        const response = await fetch('/register', {
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
            errorMessage.textContent = errorData.message || 'Registration failed. Please try again.';
            return;
        }

        window.location.href = '/login';
    } catch(err) {
        errorMessage.textContent = 'An error occurred while registering. Please try again later.';
        console.error('Registration error:', err);
        return;
    }
}