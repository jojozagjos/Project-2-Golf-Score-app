document.addEventListener('DOMContentLoaded', function() {
    loadCourse();
});

function loadCourse() {
    const courseId = document.getElementById('course').value;
    fetch(`http://uxcobra.com/golfapi/course${courseId}.txt`)
        .then(response => response.json())
        .then(data => {
            generateScorecard(data.data.holes);
        });
}

function generateScorecard(holes) {
    const scorecardContainer = document.getElementById('scorecard-container');
    let html = `<table>
        <tr>
            <th>Hole</th>`;
    for (let i = 1; i <= 18; i++) {
        if (i === 10) html += `<th>Out</th>`;
        html += `<th>${i}</th>`;
        if (i === 18) html += `<th>In</th>`;
    }
    html += `<th>Total</th>
        </tr>
        <tr>
            <th>Yardage</th>`;
    let totalYardage = 0;
    let outYardage = 0;
    let inYardage = 0;
    holes.forEach((hole, index) => {
        const yardage = hole.teeBoxes[0].yards;
        html += `<td>${yardage}</td>`;
        totalYardage += yardage;
        if (index < 9) outYardage += yardage;
        else inYardage += yardage;
    });
    html += `<td class="total">${outYardage}</td><td class="total">${inYardage}</td><td class="total">${totalYardage}</td>
        </tr>
        <tr>
            <th>Par</th>`;
    let totalPar = 0;
    let outPar = 0;
    let inPar = 0;
    holes.forEach((hole, index) => {
        const par = hole.teeBoxes[0].par;
        html += `<td>${par}</td>`;
        totalPar += par;
        if (index < 9) outPar += par;
        else inPar += par;
    });
    html += `<td class="total">${outPar}</td><td class="total">${inPar}</td><td class="total">${totalPar}</td>
        </tr>
        <tr>
            <th>Player Score</th>`;
    for (let i = 0; i < 18; i++) {
        if (i === 9) html += `<td id="out-score">0</td>`;
        html += `<td><input type="number" onchange="updateTotal(this)"></td>`;
        if (i === 17) html += `<td id="in-score">0</td>`;
    }
    html += `<td class="total" id="total-score">0</td>
        </tr>
    </table>`;
    scorecardContainer.innerHTML = html;
}

function updateTotal(input) {
    const row = input.parentElement.parentElement;
    let outTotal = 0;
    let inTotal = 0;
    let total = 0;
    row.querySelectorAll('input').forEach((cell, index) => {
        const value = parseInt(cell.value) || 0;
        total += value;
        if (index < 9) outTotal += value;
        else inTotal += value;
    });
    document.getElementById('out-score').innerText = outTotal;
    document.getElementById('in-score').innerText = inTotal;
    document.getElementById('total-score').innerText = total;
}
