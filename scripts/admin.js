const btnVinhos = document.getElementById("btn-vinhos");
const btnEmail = document.getElementById("btn-email");

btnVinhos.addEventListener("click", function() {
    window.location.href = "./pages/vinhos.html";
});

btnEmail.addEventListener("click", function() {
    window.location.href = "./pages/email.html";
});