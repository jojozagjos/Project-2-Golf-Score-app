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
        html += `<th>${i}</th>`;
    }
    html += `<th>Total</th>
        </tr>
        <tr>
            <th>Yardage</th>`;
    let totalYardage = 0;
    holes.forEach(hole => {
        html += `<td>${hole.teeBoxes[0].yards}</td>`;
        totalYardage += hole.teeBoxes[0].yards;
    });
    html += `<td class="total">${totalYardage}</td>
        </tr>
        <tr>
            <th>Par</th>`;
    let totalPar = 0;
    holes.forEach(hole => {
        html += `<td>${hole.teeBoxes[0].par}</td>`;
        totalPar += hole.teeBoxes[0].par;
    });
    html += `<td class="total">${totalPar}</td>
        </tr>
        <tr>
            <th>Player Score</th>`;
    for (let i = 0; i < 18; i++) {
        html += `<td><input type="number" onchange="updateTotal(this)"></td>`;
    }
    html += `<td class="total" id="total-score">0</td>
        </tr>
    </table>`;
    scorecardContainer.innerHTML = html;
}

function updateTotal(input) {
    const row = input.parentElement.parentElement;
    let total = 0;
    row.querySelectorAll('input').forEach(cell => {
        total += parseInt(cell.value) || 0;
    });
    document.getElementById('total-score').innerText = total;
}
