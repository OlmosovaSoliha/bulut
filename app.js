document.getElementById("generateInputs").addEventListener("click", function () {
    const count = parseInt(document.getElementById("circleCount").value);
    const inputFields = document.getElementById("inputFields");
    inputFields.innerHTML = "";

    if (count >= 3) {
        for (let i = 0; i < count; i++) {
            inputFields.innerHTML += `
                <div>
                    <label>Aylana ${i + 1} uchun:</label><br>
                    <input type="number" placeholder="x koordinatasi" id="x${i}" required>
                    <input type="number" placeholder="y koordinatasi" id="y${i}" required>
                    <input type="number" placeholder="radius" id="r${i}" required>
                </div>
            `;
        }
    } else {
        alert("Kamida 3 ta aylana kiritishingiz kerak!");
    }
});

document.getElementById("calculateA").addEventListener("click", function () {
    const count = parseInt(document.getElementById("circleCount").value);
    const circles = [];
    for (let i = 0; i < count; i++) {
        const x = parseFloat(document.getElementById(`x${i}`).value);
        const y = parseFloat(document.getElementById(`y${i}`).value);
        const r = parseFloat(document.getElementById(`r${i}`).value);
        circles.push({ x, y, r });
    }

    let hasThreeIntersecting = false;
    for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
            for (let k = j + 1; k < count; k++) {
                if (
                    doCirclesIntersect(circles[i], circles[j]) &&
                    doCirclesIntersect(circles[j], circles[k]) &&
                    doCirclesIntersect(circles[k], circles[i])
                ) {
                    hasThreeIntersecting = true;
                }
            }
        }
    }

    const results = document.getElementById("results");
    results.innerHTML = `
        <p>Uchta kesishuvchi aylanalar bormi? <b>${hasThreeIntersecting ? "Ha" : "Yo'q"}</b></p>
    `;
});

document.getElementById("calculateB").addEventListener("click", function () {
    const count = parseInt(document.getElementById("circleCount").value);
    const circles = [];
    for (let i = 0; i < count; i++) {
        const x = parseFloat(document.getElementById(x${i}).value);
        const y = parseFloat(document.getElementById(y${i}).value);
        const r = parseFloat(document.getElementById(r${i}).value);
        circles.push({ x, y, r });
    }

    let separateCircles = [];
    for (let i = 0; i < count; i++) {
        let isSeparate = true;
        for (let j = 0; j < count; j++) {
            if (i !== j && (doCirclesIntersect(circles[i], circles[j]) || isCircleInside(circles[i], circles[j]))) {
                isSeparate = false;
            }
        }
        if (isSeparate) {
            separateCircles.push(Aylana ${i + 1});
        }
    }

    const results = document.getElementById("results");
    results.innerHTML = `
        <p>Alohida turgan aylanalar: <b>${separateCircles.length > 0 ? separateCircles.join(", ") : "Yo'q"}</b></p>
    `;
});

function doCirclesIntersect(circle1, circle2) {
    const distance = Math.sqrt(
        Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)
    );
    return distance <= circle1.r + circle2.r && distance >= Math.abs(circle1.r - circle2.r);
}