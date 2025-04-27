document.addEventListener("DOMContentLoaded", function() {
  // Get buttons by ID
  const yesButton = document.getElementById('yesButton');
  const snoozeButton = document.getElementById('snoozeButton');
  const solvingButton = document.getElementById('solvingButton');
  const dontShowAgainButton = document.getElementById('dont-show-again-btn');
  
  // Add event listeners to buttons
  yesButton.addEventListener('click', handleYesClick);
  snoozeButton.addEventListener('click', handleSnoozeClick);
  solvingButton.addEventListener('click', handleSolvingClick);
  dontShowAgainButton.addEventListener('click', handleDontShowAgainClick);

  // Check if the reminder has been dismissed for today
  let reminderDismissed = localStorage.getItem('reminderDismissed');
  let dontShowAgainToday = localStorage.getItem('dontShowAgainToday');
  
  // Show the reminder only if it's not dismissed or "Don't show again today"
  if (reminderDismissed || dontShowAgainToday) {
    document.querySelector('.reminder-card').style.display = 'none';
  } else {
    document.querySelector('.reminder-card').style.display = 'block';
  }

  // Check if the stored date is the same as today's date
  const currentDate = new Date().toLocaleDateString();
  const storedDate = localStorage.getItem('storedDate');

  if (currentDate !== storedDate) {
    // If it's a new day, reset the flags
    localStorage.removeItem('dontShowAgainToday');
    localStorage.removeItem('reminderDismissed');
    localStorage.setItem('storedDate', currentDate);  // Store today's date
  }
});

// Button event handlers
function handleYesClick() {
  alert('Great! Keep up the good work!');
  localStorage.setItem('reminderDismissed', 'true');  // Set the flag
  document.querySelector('.reminder-card').style.display = 'none';  // Hide the reminder
  window.close();  // Close the tab
}

function handleSnoozeClick() {
  alert('Snoozed! Keep practicing later.');
  localStorage.setItem('reminderDismissed', 'true');  // Set the flag
  document.querySelector('.reminder-card').style.display = 'none';  // Hide the reminder
  // Set a timer to show the reminder again after 1 hour
  setTimeout(() => {
    localStorage.removeItem('reminderDismissed');  // Remove flag after a certain period if needed
    window.location.reload();  // Reload the page after timer
  }, 600000);  // Example: Show the reminder after 10 min (600000 ms)
  window.close();
}

function handleSolvingClick() {
  alert('Good luck with your problem solving!');
  document.querySelector('.reminder-card').style.display = 'block';  // Hide the reminder
  // Optionally, perform any other actions (e.g., opening DSA platform)
  window.close();
}

function handleDontShowAgainClick() {
  localStorage.setItem('dontShowAgainToday', 'true');  // Set the flag to prevent showing again today
  document.querySelector('.reminder-card').style.display = 'none';  // Hide the reminder
  window.close();  // Close the tab
}
