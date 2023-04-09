
(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "block";
    setTimeout(() => preloader.style.display = "none", 1000);
})()


function createUser() {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;

    if (email && name) {
        document.getElementById("form").style.display = "none";
        document.getElementById("userName").innerText = name;
        document.getElementById("greeting").style.display = "block";
    } else {
        alert("Please, fill all fields");
    }
}