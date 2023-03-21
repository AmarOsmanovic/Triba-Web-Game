var modal = document.getElementById("uputeModal");
var btn = document.getElementById("upute");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
  modal.style.transitionDuration = "2s";
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


var modalPobjednik = document.getElementById("modalPobjednik");
var btn1 = document.getElementById("zavrsi");
var span1 = document.getElementsByClassName("close1")[0];
btn1.onclick = function () {
  modalPobjednik.style.transitionDuration = "2s";
  modalPobjednik.style.display = "block";
}
span1.onclick = function () {
  modalPobjednik.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modalPobjednik) {
    modalPobjednik.style.display = "none";
  }
}