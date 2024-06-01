document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let valid = true;

    
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    
    const username = document.getElementById('username').value;
    if (username.length < 3) {
        document.getElementById('usernameError').textContent = 'Username must be at least 3 characters long.';
        valid = false;
    }

    
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        valid = false;
    }

    
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        valid = false;
    }

    if (valid) {
        const formData = new FormData(this);
        fetch('/register', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registration successful!');
            } else {
                if (data.errors.username) {
                    document.getElementById('usernameError').textContent = data.errors.username;
                }
                if (data.errors.email) {
                    document.getElementById('emailError').textContent = data.errors.email;
                }
            }
        })
        .catch(error => console.error('Error:', error));
    }
});
