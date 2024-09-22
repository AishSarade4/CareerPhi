let currentBalance = 1000;

      function deposit() {
        const depositAmount = parseFloat(
          document.getElementById("deposit-amount").value
        );

        if (!isNaN(depositAmount) && depositAmount > 0) {
          currentBalance += depositAmount;
          updateBalance();
          document.getElementById("deposit-amount").value = "";
        } else {
          alert("Please enter a valid deposit amount.");
        }
      }

      function withdraw() {
        const withdrawalAmount = parseFloat(
          document.getElementById("withdrawal-amount").value
        );

        if (!isNaN(withdrawalAmount) && withdrawalAmount > 0) {
          if (withdrawalAmount <= currentBalance) {
            currentBalance -= withdrawalAmount;
            updateBalance();
            document.getElementById("withdrawal-amount").value = ""; 
          } else {
            alert(
              "Insufficient balance. Please enter a valid withdrawal amount."
            );
          }
        } else {
          alert("Please enter a valid withdrawal amount.");
        }
      }

      function updateBalance() {
        const balanceElement = document.getElementById("account-balance");
        balanceElement.innerText =
          "Current Balance: $" + currentBalance + ".00";
      }