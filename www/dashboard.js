// Function to play speech
function playSpeech(statement) {
    const utterance = new SpeechSynthesisUtterance(statement);
    window.speechSynthesis.speak(utterance);
}

// Function to load recent translations
function loadRecentTranslations() {
    const username = localStorage.getItem('username'); // Get the username from local storage
    const key = `translationHistory_${username}`; // Create a unique key for the user
    const recentTranslations = JSON.parse(localStorage.getItem(key)) || [];
    const tableBody = document.getElementById('recentTranslationsBody');
    tableBody.innerHTML = ''; // Clear existing content

    // Check if there are any translations to show
    if (recentTranslations.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="3">No recent translations found.</td>`;
        tableBody.appendChild(row);
        return;
    }

    // Limit to the last 4 entries
    const entriesToShow = recentTranslations.slice(-4);
    const isDarkTheme = localStorage.getItem('theme') === 'dark'; // Check if dark theme is active

    entriesToShow.forEach(entry => {
        const row = document.createElement('tr');
        const audioIcon = isDarkTheme ? 'asset/iconspeakerwhite.png' : 'asset/🦆 icon _speaker one_.png'; // Set icon based on theme
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.output}</td>
            <td>
                <img class="speaker" src="${audioIcon}" alt="" onclick="playSpeech('${entry.output}')" />
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to save a translation
function saveTranslation(output) {
    const username = localStorage.getItem('username'); // Get the username from local storage

    // Check if the user is logged in
    if (!username) {
        alert('You must be logged in to save translations.');
        return;
    }

    const key = `translationHistory_${username}`; // Create a unique key for the user
    const translationHistory = JSON.parse(localStorage.getItem(key)) || [];

    // Create a new entry
    const newEntry = {
        date: new Date().toLocaleString(), // Current date and time
        output: output
    };

    // Add the new entry to the history
    translationHistory.push(newEntry);

    // Save the updated history back to local storage
    localStorage.setItem(key, JSON.stringify(translationHistory));
}

// Call loadRecentTranslations when the page loads
window.onload = function() {
    loadRecentTranslations();
};