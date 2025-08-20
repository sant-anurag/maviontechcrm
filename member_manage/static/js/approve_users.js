document.addEventListener('DOMContentLoaded', function() {
    function handleAction(id, action) {
        fetch('/member/approve_user_action/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${id}&action=${action}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.getElementById('row-' + id).remove();
            } else {
                alert(data.message || 'Action failed');
            }
        });
    }
    document.querySelectorAll('.approve-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Approve this user?')) {
                handleAction(this.dataset.id, 'approve');
            }
        });
    });
    document.querySelectorAll('.reject-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Reject this user?')) {
                handleAction(this.dataset.id, 'reject');
            }
        });
    });
    // CSRF helper
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});