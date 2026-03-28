// Study Tracker App Functionality

// Local storage key
const STORAGE_KEY = 'study_tracker_data';

// DOM Elements
const loginForm = document.getElementById('login-form');
const logoutButton = document.getElementById('logout-button');
const studyLogForm = document.getElementById('study-log-form');
const subjectInput = document.getElementById('subject-input');
const hoursInput = document.getElementById('hours-input');
const statsDisplay = document.getElementById('stats-display');

let isLoggedIn = false;
let studyData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

// Login Functionality
loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    isLoggedIn = true;
    updateUI();
});

// Logout Functionality
logoutButton.addEventListener('click', function() {
    isLoggedIn = false;
    updateUI();
});

// Log Study Hours
studyLogForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const subject = subjectInput.value;
    const hours = parseFloat(hoursInput.value);
    if (subject && hours) {
        logStudyHours(subject, hours);
    }
});

// Log Study Hours Function
function logStudyHours(subject, hours) {
    if (!studyData[subject]) {
        studyData[subject] = { totalHours: 0, logs: [] };
    }
    studyData[subject].totalHours += hours;
    studyData[subject].logs.push({ date: new Date().toISOString(), hours });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studyData));
    updateStatistics();
}

// Update Statistics
function updateStatistics() {
    // Calculate and display statistics (weekly, monthly, yearly, all-time)
    // Placeholder for statistics logic
    statsDisplay.innerHTML = JSON.stringify(studyData, null, 2);
}

// Update UI
function updateUI() {
    if (isLoggedIn) {
        loginForm.style.display = 'none';
        logoutButton.style.display = 'block';
        studyLogForm.style.display = 'block';
        updateStatistics();
    } else {
        loginForm.style.display = 'block';
        logoutButton.style.display = 'none';
        studyLogForm.style.display = 'none';
        statsDisplay.innerHTML = '';
    }
}

updateUI();
