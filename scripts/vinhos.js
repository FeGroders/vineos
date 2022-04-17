const inputFile = document.getElementById("input-imagem");
const fileName = document.getElementById("file-name");

inputFile.addEventListener("change", function() {
    fileName.innerHTML = this.files[0].name;
});