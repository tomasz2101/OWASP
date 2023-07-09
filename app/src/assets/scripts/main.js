// Make submit button clickable when input changes to non-empty
document.getElementsByTagName("textarea")[0].addEventListener('input', function() {
    var pe = document.getElementById("btnSubmit").style.pointerEvents;
    if (this.value !== '' && pe == '') {
        document.getElementById("btnSubmit").style.pointerEvents = "all";
    }
});

document.getElementById("btnSubmit").addEventListener("click", function() {
    this.style.pointerEvents = "none";
    document.getElementsByTagName('textarea')[0].value = "Thank you for your feedback!";
});