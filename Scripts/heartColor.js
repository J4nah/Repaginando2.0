function toggleHeart() {
    var heart = document.getElementById("heart");
    if (heart.style.color === "red") {
        heart.style.color = "grey";
    } else {
        heart.style.color = "red";
    }
}