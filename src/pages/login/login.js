const button = document.getElementById('login')

button.addEventListener('click', function (e) {
    e.preventDefault()
    window.location.href = 'chat'
})