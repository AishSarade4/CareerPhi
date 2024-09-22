let investments = [
  { name: "Samsung", invested: 100, current: 120 },
  { name: "Google", invested: 700, current: 900 },
];

function calculateTotalValue() {
  return investments.reduce(
    (total, investment) => total + investment.current,
    0
  );
}

function calculatePercentageChange(invested, current) {
  return (((current - invested) / invested) * 100).toFixed(2);
}

function renderInvestments() {
  const investmentsTable = document.getElementById("investments");
  investmentsTable.innerHTML = "";
  investments.forEach((investment, index) => {
    const row = `
            <tr>
                <td>${investment.name}</td>
                <td>$${investment.invested.toFixed(2)}</td>
                <td>$${investment.current.toFixed(2)}</td>
                <td>${calculatePercentageChange(
                  investment.invested,
                  investment.current
                )}%</td>
                <td>
                    <button id="btn1" onclick="updateInvestment(${index})">Update</button>
                    <button id="btn2" onclick="removeInvestment(${index})">Remove</button>
                </td>
            </tr>
        `;
    investmentsTable.insertAdjacentHTML("beforeend", row);
  });

  document.getElementById("total").textContent =
    calculateTotalValue().toFixed(2);
  renderChart();
}

function addInvestment() {
  const name = prompt("Enter Asset Name:");
  const invested = parseFloat(prompt("Enter Invested Amount:"));
  const current = parseFloat(prompt("Enter Current Value:"));

  if (name && !isNaN(invested) && !isNaN(current)) {
    investments.push({ name, invested, current });
    renderInvestments();
  } else {
    alert("Please enter valid investment details.");
  }
}

function updateInvestment(index) {
  const current = parseFloat(
    prompt("Enter Current Value:", investments[index].current)
  );

  if (!isNaN(current)) {
    investments[index].current = current;
    renderInvestments();
  } else {
    alert("Please enter a valid current value.");
  }
}

function removeInvestment(index) {
  investments.splice(index, 1);
  renderInvestments();
}

function renderChart() {
  const ctx = document.getElementById("portfolio-chart").getContext("2d");
  const assetNames = investments.map((investment) => investment.name);
  const currentValues = investments.map((investment) => investment.current);

  if (window.myPieChart) {
    window.myPieChart.destroy();
  }
  window.myPieChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: assetNames,
      datasets: [
        {
          data: currentValues,
          backgroundColor: [
            "#845ec2",
            "#d65db1",
            "#f9f871",
            "#ff6f91",
            "#ffc75f",
            "#ff9671",
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}

renderInvestments();
