document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    fetch(window.location.pathname, {
        method: 'POST',
        body: data,
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    .then(response => response.json())
    .then(result => {
        const msgDiv = document.getElementById('message');
        if (result.success) {
            msgDiv.style.color = '#2563eb';
            msgDiv.textContent = result.message;
            form.reset();
        } else {
            msgDiv.style.color = '#dc2626';
            msgDiv.textContent = result.message;
        }
    })
    .catch(() => {
        document.getElementById('message').textContent = 'Error submitting form.';
    });
});