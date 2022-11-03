document.getElementById("btnloan").addEventListener("click", loan);
document.getElementById("btnCalculate").addEventListener("click", calculate);

function home() {
  window.open("index.html");
}

function loan() {
  document.getElementById("form").style.visibility = "visible";
  document.getElementById("finalTable").style.visibility = "hidden";
}

function calculate() {
  document.getElementById("finalTable").style.visibility = "visible";

  if (parseInt(document.getElementById("loanInput").value) > 0) {
    var loanAmount = parseInt(document.getElementById("loanInput").value);
  }

  if (parseFloat(document.getElementById("interestInput").value) > 0) {
    var interestRate = parseFloat(
      document.getElementById("interestInput").value
    );
  }

  if (parseInt(document.getElementById("termInput").value) > 0) {
    var loanTerm = parseInt(document.getElementById("termInput").value);
  }

  var startYear = parseInt(document.getElementById("startYear").value);

  var startMonth = document.getElementById("startMonth").selectedIndex;
 var interestTotal = 0;
 var principalTotal = 0;
  var balance = loanAmount;
  
  var monthInterestRate = parseFloat(interestRate / 100 / 12);
  console.log(monthInterestRate);
  var monthPayment =
    (loanAmount *
      (monthInterestRate) /(1- Math.pow(1.0 + monthInterestRate, -(loanTerm * 12))));
  var interestPaid = balance * monthInterestRate;
  var principalPaid = monthPayment - interestPaid;

  
  var table =
    '<p id ="monthPayment">Monthly Payment : $' +
    monthPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
    "</p>";
  table += "<table>";
  table +=
    "<tr>" +
    "<th>Date </th>" +
    " <th>Interest </th>" +
    "<th>Principal </th>" +
    " <th>Balance </th>" +
    "</tr>";
  for (var i = 1; i <= loanTerm; i++) {
    for (var j = 1; j <= 12; j++) {
      
      
      balance = balance - principalPaid;
      principalPaid = monthPayment - interestPaid;
        console.log(principalPaid)
        interestPaid = balance * monthInterestRate;
        console.log(interestPaid)
      var tempBalance = "$"+balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      interestTotal += interestPaid ;
      console.log(interestTotal)
      var tempInterestPaid = "$"+interestTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      principalTotal += principalPaid;
      console.log(principalTotal)
      var tempPrincipalPaid = "$"+principalTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    table += "</tr>";
    table +=
      "<td>" +
      startYear +
      " </td> <td>" +
      tempInterestPaid +
      "</td><td> " +
      tempPrincipalPaid +
      " </td><td>" +
      tempBalance +
      "</td>";
    startYear++;

    var finalTabel = document.getElementById("finalTable");
    finalTabel.innerHTML = table;
    
    interestTotal= 0;
    principalTotal = 0;
    table += "</tr>";
  }
  table = "</table>";
}