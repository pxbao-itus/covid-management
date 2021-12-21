document.getElementById('submit').addEventListener("click", (event) => {
    if($('#newpassword').val() !== $('#renewpassword').val()) {
        event.preventDefault();
        document.cookie = "changePassword=not match";
        window.location.href = "/change-password";
    }
})