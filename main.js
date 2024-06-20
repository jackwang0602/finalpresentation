let optionCount = 0;
let options = []; // Array to store user inputs
let angleOffset = 0; // Angle offset for spinning

function drawWheel(rotationAngle = 0) {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const segments = optionCount;
    const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#00C3FF', '#900C3F', '#F1C40F', '#27AE60', '#3498DB', '#8E44AD', '#D35400', '#154360'];
    const angle = (2 * Math.PI) / segments;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotationAngle);

    for (let i = 0; i < segments; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.fillStyle = colors[i % colors.length];
        ctx.arc(0, 0, canvas.width / 2, i * angle, (i + 1) * angle);
        ctx.lineTo(0, 0);
        ctx.fill();
        ctx.closePath();

        // Add text labels to each segment
        ctx.save();
        ctx.fillStyle = "black";
        ctx.font = "20px Arial"; // Increased font size
        ctx.translate((canvas.width / 2.5) * Math.cos((i + 0.5) * angle), (canvas.width / 2.5) * Math.sin((i + 0.5) * angle));
        ctx.rotate((i + 0.5) * angle - rotationAngle);
        ctx.textAlign = "center";
        ctx.fillText(options[i], 0, 0);
        ctx.restore();
    }

    ctx.rotate(-rotationAngle);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    // Draw the pointer
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(200, 40);
    ctx.lineTo(195, 0);
    ctx.lineTo(205, 0);
    ctx.lineTo(200, 40);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

// Function to add user input to history
function addInput() {
    var userInput = document.getElementById('userInput').value.trim(); // Get user input
    if (userInput !== '') { // Check if input is not empty
        var historyList = document.getElementById('inputHistory');
        var listItem = document.createElement('li');
        listItem.textContent = userInput;
        
        // Create delete icon
        var deleteIcon = document.createElement('span');
        deleteIcon.className = 'delete-icon';
        deleteIcon.textContent = 'X';
        deleteIcon.onclick = function() {
            historyList.removeChild(listItem);
            optionCount--; // Update option count
            options = options.filter(option => option !== userInput); // Remove from options array
            updateOptionCount(); // Update display
        };
        
        listItem.appendChild(deleteIcon);
        historyList.appendChild(listItem);
        
        options.push(userInput); // Add to options array
        optionCount++; // Update option count
        updateOptionCount(); // Update display
        
        document.getElementById('userInput').value = ''; // Clear input field after adding
    }
}

// Function to update the displayed option count
function updateOptionCount() {
    document.getElementById('optionCount').textContent = optionCount;
}

// Function to spin the wheel
function spinWheel() {
    let angle = 0;
    let speed = Math.random() * 10 + 1000; // Random initial speed
    const deceleration = 0.98; // Deceleration factor

    function animate() {
        angle += speed;
        speed *= deceleration; // Gradually slow down
        if (speed < 0.1) { // Stop animation when speed is low enough
            cancelAnimationFrame(animationId);
        } else {
            drawWheel(angle * Math.PI / 180);
            animationId = requestAnimationFrame(animate);
        }
    }
    let animationId = requestAnimationFrame(animate);
}