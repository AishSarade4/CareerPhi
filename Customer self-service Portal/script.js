document.addEventListener("DOMContentLoaded", () => {
  const claimForm = document.getElementById("claim-form");
  const claimsList = document.getElementById("claims-list");
  const successMessage = document.getElementById("success-message");

  // Create LocalStorage instance
  const localStorageService = new LocalStorageService();
  let claims = localStorageService.getData();

  // // Initialize default claims if none exist
  // if (claims.length === 0) {
  //   claims = [
  //     {id: "CLM001", status: "Approved", incidentDate: '09-05-2024' },
  //     { id: "CLM002", status: "Approved", incidentDate: '08-05-2024' }
  //   ];
  //   localStorageService.saveData(claims);
  // }

  // Set up form submission
  claimForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const claim = createClaim();

    claims.push(claim);
    localStorageService.saveData(claims); // Save to local storage
    updateClaimsList();
    claimForm.reset();
    displaySuccessMessage();
  });

  // Create a new claim object
  function createClaim() {
    const policyNumber = document.getElementById("policy-number").value;
    const incidentDate = document.getElementById("incident-date").value;
    const incidentDescription = document.getElementById(
      "incident-description"
    ).value;
    const claimId = `CM${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(5, "0")}`;

    const statusOptions = ["Pending"];
    const claimStatus =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    return {
      id: claimId,
      policyNumber,
      incidentDate,
      incidentDescription,
      status: claimStatus,
    };
  }
  // Function to get current local date when claim is submitted
  function getLocalDate() {
    const date = new Date();
    return date.toLocaleDateString(); // You can customize the locale or use toLocaleString for time as well
  }
  // Function to update claims list and display local date
  function updateClaimsList() {
    claimsList.innerHTML = claims
      .map(
        (claim) => `
      <tr>
        <td>${claim.id}</td>
        <td>${claim.status}</td>
        <td>${
          claim.incidentDate || getLocalDate()
        }</td>  <!-- Check if incidentDate exists, else set current local date -->
      </tr>
    `
      )
      .join("");
  }
  // Display success message
  function displaySuccessMessage() {
    successMessage.textContent = "Claim submitted successfully!";
    successMessage.style.color = "green";
    setTimeout(() => (successMessage.textContent = ""), 4000);
  }
});

// LocalStorageService class
class LocalStorageService {
  constructor() {
    this.localStorage = window.localStorage;
    this.dataKey = "claims";
  }

  saveData(data) {
    this.localStorage.setItem(this.dataKey, JSON.stringify(data));
  }

  getData() {
    return JSON.parse(this.localStorage.getItem(this.dataKey)) || [];
  }
}

// Show/hide sections based on button clicks
function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

const articles = [
  {
    title: "How to File an Insurance Claim",
    content:
      "Filing an insurance claim can be done by contacting your insurance...",
  },
  {
    title: "Understanding Your Policy Coverage",
    content:
      "Your policy coverage includes liability, collision, and comprehensive...",
  },
  {
    title: "What to Do After an Accident",
    content:
      "Immediately after an accident, make sure to stay calm and assess the situation...",
  },
  {
    title: "How to Check the Status of Your Claim",
    content:
      "You can check the status of your claim online or by contacting your insurer...",
  },
  {
    title: "Common Reasons for Claim Rejection",
    content:
      "Claim rejections often occur due to insufficient documentation or invalid policy claims...",
  },
];

// Function to filter and display articles based on search input
function searchArticles() {
  const query = document.getElementById("search-bar").value.toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Clear previous results

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query)
  );

  if (filteredArticles.length === 0) {
    resultsContainer.innerHTML =
      '<p class="no-results">No matching articles found.</p>';
  } else {
    filteredArticles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.classList.add("article");
      articleElement.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
      resultsContainer.appendChild(articleElement);
    });
  }
}
