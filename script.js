const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
const lineSizeSlider = document.getElementById("lineSize");
const lineColorPicker = document.getElementById("lineColor");
let img = new Image();
let lineSize = lineSizeSlider.value;
let lineColor = lineColorPicker.value;

lineSizeSlider.addEventListener("input", (event) => {
  lineSize = event.target.value;
});

lineColorPicker.addEventListener("input", (event) => {
  lineColor = event.target.value;
});

imageInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
};

canvas.addEventListener("click", (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineSize;
  ctx.stroke();
});
