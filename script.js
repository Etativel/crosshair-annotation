const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const imageInput = document.getElementById("imageInput");
const lineSizeSlider = document.getElementById("lineSize");
const lineColorPicker = document.getElementById("lineColor");
const toggleHelper = document.getElementById("toggleHelper");
let img = new Image();
let lineSize = lineSizeSlider.value;
let lineColor = lineColorPicker.value;
let clickCoords = null;

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

function drawCrosshairs(x, y) {
  ctx.setLineDash([]);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineSize;

  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, canvas.height);
  ctx.moveTo(0, y);
  ctx.lineTo(canvas.width, y);
  ctx.stroke();
}

canvas.addEventListener("mousemove", (e) => {
  if (!img.src) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);

  if (clickCoords) {
    drawCrosshairs(clickCoords.x, clickCoords.y);
  }

  if (toggleHelper.checked) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineSize;

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
});

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  clickCoords = { x, y };

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  drawCrosshairs(x, y);
});
