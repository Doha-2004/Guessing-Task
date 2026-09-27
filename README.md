# Guessing Task

## 1. Project Overview

**Guessing Task** is a Number Guessing Game where users try to discover a hidden number within a specific range.

The project combines a simple game experience with:

* User Accounts
* Practice Game
* Daily Game
* Guess History
* User Statistics
* Daily Streak
* Leaderboard
* User Profile

The main goal is to provide a simple, interactive, and competitive guessing-game experience.

---

# 2. Project Goal

The project aims to create a game where the user:

1. Creates an account.
2. Logs in.
3. Chooses a game mode.
4. Tries to guess a hidden number.
5. Receives feedback after every guess.
6. Continues guessing until finding the correct number.
7. Gets a final result.
8. Tracks their performance over time.
9. Can participate in the Daily Game.
10. Can compare their results through the leaderboard.

---

# 3. Main Game Concept

The player receives a number range.

For example:

```text
Range: 1 - 100
```

The player enters a guess.

Example:

```text
Guess: 50
Result: Higher
```

This means the hidden number is higher than `50`.

The player tries again:

```text
Guess: 75
Result: Lower
```

Then:

```text
Guess: 63
Result: Correct
```

The goal is to find the correct number using as few attempts as possible.

---

# 4. Game Feedback

There are three main types of feedback:

### Higher

The hidden number is greater than the player's guess.

```text
50 → Higher ↑
```

### Lower

The hidden number is smaller than the player's guess.

```text
75 → Lower ↓
```

### Correct

The player found the hidden number.

```text
63 → Correct ✓
```

The Front-End should display these results clearly so the user immediately understands what to do next.

---

# 5. Main Features

## 5.1 Authentication

Users can:

* Create an account.
* Log in.
* Log out.
* View their account information.

Authentication allows the application to associate games and statistics with the correct user.

---

## 5.2 Practice Game

The Practice Game is available whenever the user wants to play.

Basic flow:

```text
Start Game
    ↓
Receive Number Range
    ↓
Enter Guess
    ↓
Receive Feedback
    ↓
Higher / Lower
    ↓
Try Again
    ↓
Correct
    ↓
Game Completed
```

The user can use the feedback from previous guesses to narrow down the possible number.

---

## 5.3 Daily Game

The Daily Game is a special challenge designed to give users a recurring game experience.

The user can:

* Check the current daily challenge.
* Start the challenge.
* Submit guesses.
* Receive feedback.
* Complete the challenge.
* See the final result.
* View the leaderboard.

The Daily Game adds a competitive and recurring aspect to the project.

---

## 5.4 Leaderboard

The leaderboard allows users to compare their Daily Game performance with other players.

It can display:

* Rank
* Username
* Number of guesses
* Completion information
* Current user's position

Example:

```text
Daily Leaderboard

Rank    Player      Guesses
----------------------------
1       Ahmed          4
2       Sara           5
3       Doha           6
4       Omar           7
```

The current user's row can be visually highlighted.

---

## 5.5 Profile

The Profile page displays the user's account information and game performance.

Possible information:

```text
Username
Email
Best Score
Games Played
Games Won
Daily Streak
Member Since
```

Example:

```text
My Profile

Username: Doha
Email: user@example.com

----------------------------

Best Score:     5
Games Played:  20
Games Won:     14
Daily Streak:   7
```

---

# 6. User Statistics

The project tracks several statistics.

## Best Score

The best performance achieved by the user.

For a guessing game, a lower number of guesses generally represents a smaller number of attempts needed to complete a game.

---

## Games Played

The total number of games the user has played.

---

## Games Won

The total number of games successfully completed.

---

## Daily Streak

Represents consecutive participation in the Daily Game.

Example:

```text
Daily Streak: 7 days
```

---

# 7. Game Modes

The project has two main game modes:

```text
Game
│
├── Practice
│
└── Daily
```

## Practice

Used for normal/repeatable gameplay.

## Daily

Used for the recurring daily challenge.

---

# 8. Game States

A game can have different states.

## In Progress

The user is currently playing.

The UI should display:

* Number range
* Guess input
* Guess button
* Number of attempts
* Guess history
* Feedback

Example:

```text
Practice Game

Find the hidden number
Range: 1 - 100

Your Guess:
[      50      ] [Submit]

Attempts: 3

History:
50 → Higher
75 → Lower
```

---

## Won

The user successfully found the hidden number.

The UI can display:

```text
🎉 Congratulations!

You found the number.

Guesses: 5

[ Play Again ]
```

---

## Abandoned

The game has ended without being completed.

The UI should clearly tell the user that the game is no longer active.

---

# 9. Guess History

The application keeps track of previous guesses during the game.

Example:

```text
Guess History

50 → Higher
75 → Lower
63 → Correct
```

This helps the player understand their progress and makes the game experience clearer.

---

# 10. User Journey

The overall user journey can be represented as:

```text
Open Application
       ↓
Register / Login
       ↓
Dashboard
       ↓
Choose Game
   ┌───┴────┐
   ↓        ↓
Practice   Daily
   ↓        ↓
   Play     Play
   └───┬────┘
       ↓
     Result
       ↓
Statistics / Leaderboard
```

---

# 11. Main Pages

## Public Pages

### Login Page

Purpose:

Allow existing users to access their account.

Main elements:

* Login input
* Password input
* Login button
* Validation messages
* Link to Register

---

### Register Page

Purpose:

Allow a new user to create an account.

Main elements:

* Username
* Email
* Password
* Confirm Password
* Register button
* Link to Login

---

# 12. Protected Pages

## Dashboard

The Dashboard is the main screen after authentication.

It can contain:

* Welcome message
* Practice Game card
* Daily Game card
* Best Score
* Games Played
* Games Won
* Daily Streak

Example:

```text
Welcome back, Doha!

--------------------------------

[ Practice Game ]

Play whenever you want.

--------------------------------

[ Daily Game ]

Today's challenge.

--------------------------------

Best Score: 5
Games Won: 14
Daily Streak: 7
```

---

# 13. Practice Game Page

The Practice Game page contains the complete practice gameplay experience.

Main sections:

```text
Practice Game
────────────────────────

Range: 1 - 100

Your Guess:

[      50      ] [Submit]

Attempts: 3

Guess History:

50 → Higher
75 → Lower
```

After winning:

```text
Congratulations!

You found the number.

Total Guesses: 5

[ Play Again ]
```

---

# 14. Daily Game Page

The Daily Game page focuses on the current daily challenge.

Possible sections:

```text
Daily Challenge

Today's Game

Range: 1 - 100

Your Guess:

[      50      ] [Submit]

Attempts: 3

Guess History:
50 → Higher
75 → Lower

[ View Leaderboard ]
```

After completion:

```text
Daily Challenge Complete!

Your Result:
6 Guesses

[ View Leaderboard ]
```

---

# 15. Leaderboard Page

The Leaderboard page displays player rankings.

Example:

```text
Daily Leaderboard

Players: 125

--------------------------------

Rank    Player      Guesses
--------------------------------
1       Ahmed          4
2       Sara           5
3       Doha           6
4       Omar           7
```

The current user can be highlighted:

```text
#17   Doha   8 guesses   ← You
```

---

# 16. Profile Page

The Profile page contains account and performance information.

Example:

```text
My Profile

Doha
user@example.com

--------------------------------

Best Score
5

Games Played
20

Games Won
14

Daily Streak
7

Member Since
2026
```

---

# 17. Navigation

## Public Navigation

```text
Login
Register
```

## Authenticated Navigation

```text
Dashboard
Practice
Daily Game
Leaderboard
Profile
Logout
```

The navigation should change depending on the user's authentication state.

---

# 18. Front-End Architecture

Recommended React structure:

```text
src/
│
├── api/
│   ├── authApi.js
│   ├── gameApi.js
│   └── dailyApi.js
│
├── components/
│   ├── common/
│   ├── game/
│   ├── daily/
│   └── leaderboard/
│
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── Dashboard/
│   ├── PracticeGame/
│   ├── DailyGame/
│   ├── Leaderboard/
│   └── Profile/
│
├── context/
│   └── AuthContext.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useGame.js
│   └── useDailyGame.js
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── utils/
│   ├── constants.js
│   └── validation.js
│
├── App.jsx
└── main.jsx
```

---

# 19. Folder Responsibilities

## `api/`

Responsible for communication with the backend.

Examples:

```text
Authentication operations
Practice game operations
Daily game operations
Leaderboard operations
```

The goal is to keep data communication separate from UI components.

---

## `components/`

Contains reusable UI components.

Examples:

```text
Button
Input
Card
Modal
Loader
ErrorMessage
GuessForm
GuessHistory
GuessResult
GameResult
StatCard
LeaderboardTable
```

---

## `pages/`

Contains complete application screens.

Examples:

```text
Login
Register
Dashboard
Practice Game
Daily Game
Leaderboard
Profile
```

---

## `context/`

Contains shared application state.

The most important global state is authentication.

Example:

```js
{
  user,
  isAuthenticated,
  login,
  logout
}
```

---

## `hooks/`

Contains reusable React logic.

Examples:

```text
useAuth()
useGame()
useDailyGame()
```

Custom hooks keep business-related logic out of large page components.

---

## `routes/`

Responsible for application navigation.

Contains:

```text
AppRoutes
ProtectedRoute
```

---

## `utils/`

Contains:

* Constants
* Validation
* Helper functions

---

# 20. State Management

Not every piece of state should be global.

## Global State

Authentication is a good candidate for global state.

Example:

```js
{
  user,
  isAuthenticated
}
```

---

## Local State

Game-specific state should normally stay local to the game page or its custom hook.

Examples:

```text
guessValue
loading
error
guessResult
guessHistory
gameState
```

There is no need to make every game value global.

---

# 21. React Component Flow

The basic interaction model is:

```text
User Action
     ↓
React Component
     ↓
Event Handler
     ↓
Application Logic
     ↓
Backend
     ↓
Response
     ↓
React State
     ↓
UI Update
```

Example:

```text
User enters 50
       ↓
GuessForm
       ↓
submitGuess(50)
       ↓
Game Logic
       ↓
Receive Result
       ↓
Update State
       ↓
Display Feedback
```

---

# 22. Reusable Components

## Common Components

```text
Navbar
Button
Input
Card
Modal
Loader
ErrorMessage
EmptyState
```

## Game Components

```text
GameHeader
NumberRange
GuessForm
GuessInput
GuessHistory
GuessResult
GameResult
```

## Statistics Components

```text
StatCard
ProfileStats
```

## Leaderboard Components

```text
LeaderboardTable
LeaderboardRow
CurrentUserRow
```

---

# 23. Form Validation

The Front-End should validate user input before submitting it.

## Registration Validation

Check:

* Username is required.
* Username length is valid.
* Email format is valid.
* Password is valid.
* Confirm Password matches Password.

Example:

```text
Password:
[ ******** ]

Confirm Password:
[ ******** ]

Passwords match ✓
```

---

## Login Validation

Check:

* Login field is not empty.
* Password is not empty.

---

## Guess Validation

Check:

* A value has been entered.
* The value is numeric.
* The value is inside the current game range.

The game range should come from the current game rather than being unnecessarily hardcoded.

---

# 24. Loading States

Every operation that waits for information should have a loading state.

Examples:

```text
Loading profile...
```

```text
Starting game...
```

```text
Submitting guess...
```

```text
Loading leaderboard...
```

For larger areas, skeleton loading can be used.

---

# 25. Error States

Errors should be clear and user-friendly.

Example:

```text
Something went wrong.

Please try again.
```

Another example:

```text
We couldn't start the game.

[ Try Again ]
```

Technical errors should not normally be shown directly to users.

---

# 26. Empty States

Some screens may have no information yet.

## No Active Game

```text
You don't have an active game.

[ Start Practice Game ]
```

## Empty Leaderboard

```text
No players have completed the challenge yet.
```

## New User Statistics

```text
You haven't played any games yet.

[ Start Your First Game ]
```

---

# 27. Responsive Design

The application should work well on:

* Desktop
* Laptop
* Tablet
* Mobile

Important responsive areas:

* Navigation
* Game cards
* Guess input
* Buttons
* Statistics cards
* Leaderboard
* Profile
* Game result screens

The game input should remain comfortable to use on mobile devices.

---

# 28. Accessibility

The application should follow basic accessibility practices.

Important points:

* Use semantic HTML.
* Give every input a clear label.
* Use descriptive button text.
* Support keyboard navigation.
* Keep focus states visible.
* Provide understandable error messages.
* Maintain good text contrast.
* Do not rely only on color to communicate game results.

For example:

Instead of showing only:

```text
↑
```

use:

```text
Higher ↑
```

---

# 29. Security Mindset

The Front-End should never be the source of truth for important game rules.

The client should not independently decide:

```text
The target number
Whether the guess is correct
The user's score
The user's rank
```

The Front-End is responsible for:

```text
Displaying information
Collecting user input
Sending actions
Showing results
```

The backend is responsible for authoritative:

```text
Game Rules
Secret Number
Guess Evaluation
Scores
Statistics
Leaderboard
Data Persistence
```

Important principle:

> **React controls the experience. The backend controls the truth.**

---

# 30. Front-End vs Backend Responsibilities

## Front-End

```text
UI
User Interaction
Routing
Form Validation
Loading States
Error Display
State Management
Responsive Design
Accessibility
```

## Backend

```text
Authentication
Game Rules
Secret Number
Guess Evaluation
Game Results
Statistics
Leaderboard
Data Persistence
```

---

# 31. Authentication Flow

```text
Register
   ↓
Account Created
   ↓
Login
   ↓
Authenticated User
   ↓
Dashboard
```

The application should protect authenticated pages from unauthenticated users.

---

# 32. Practice Game Flow

```text
Dashboard
   ↓
Practice Game
   ↓
Start
   ↓
Game In Progress
   ↓
Submit Guess
   ↓
Higher / Lower
   ↓
Submit Another Guess
   ↓
Correct
   ↓
Game Won
   ↓
Statistics Updated
```

---

# 33. Daily Game Flow

```text
Dashboard
   ↓
Daily Game
   ↓
Check Challenge
   ↓
Start
   ↓
Submit Guess
   ↓
Receive Feedback
   ↓
Continue
   ↓
Complete
   ↓
Daily Result
   ↓
Leaderboard
```

---

# 34. Overall Application Flow

```text
                    APPLICATION
                         │
                         ↓
                 Authentication
                         │
                         ↓
                     Dashboard
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        Practice Game           Daily Game
              │                     │
              ↓                     ↓
           Guesses               Guesses
              │                     │
              └──────────┬──────────┘
                         ↓
                       Result
                         │
               ┌─────────┴─────────┐
               ↓                   ↓
            Profile           Leaderboard
               │
               ↓
          Statistics
```

---

# 35. Recommended Development Order

Build the project progressively.

## Phase 1 — Project Setup

Set up:

```text
React
React Router
API Client
Project Structure
```

---

## Phase 2 — Routing

Create:

```text
/login
/register
/dashboard
/practice
/daily
/leaderboard
/profile
```

Separate:

```text
Public Routes
Protected Routes
```

---

## Phase 3 — Authentication

Build:

```text
Register
Login
Logout
Current User
```

Then implement authentication state.

---

## Phase 4 — Layout

Create:

```text
Navbar
Main Layout
User Menu
Navigation
Logout
```

---

## Phase 5 — Dashboard

Build:

```text
Welcome Section
Practice Game Card
Daily Game Card
Statistics Cards
```

---

## Phase 6 — Practice Game

Implement the simplest complete game flow:

```text
Start
 ↓
Play
 ↓
Guess
 ↓
Feedback
 ↓
Win
```

---

## Phase 7 — Daily Game

After the Practice Game works correctly:

```text
Daily Status
 ↓
Start
 ↓
Guess
 ↓
Feedback
 ↓
Complete
```

---

## Phase 8 — Leaderboard

Build:

```text
Leaderboard
Player Ranking
Current User Position
```

---

## Phase 9 — Profile

Build:

```text
User Information
Statistics
Best Score
Games Played
Games Won
Daily Streak
```

---

## Phase 10 — UX States

Add:

```text
Loading
Error
Empty
Success
Retry
```

---

## Phase 11 — Responsive Design

Test:

```text
Desktop
Tablet
Mobile
```

---

## Phase 12 — Accessibility

Check:

```text
Keyboard Navigation
Labels
Focus
Contrast
Semantic HTML
Error Messages
```

---

## Phase 13 — Final Testing

Test the complete user journey:

```text
Register
 ↓
Login
 ↓
Dashboard
 ↓
Practice
 ↓
Guess
 ↓
Win
 ↓
Daily Game
 ↓
Complete
 ↓
Leaderboard
 ↓
Profile
 ↓
Logout
```

---

# 36. Recommended Development Strategy

Do not build all pages at the same time.

Start with one complete user flow:

```text
Login
  ↓
Dashboard
  ↓
Practice Game
  ↓
Guess
  ↓
Result
```

Make this flow work correctly first.

Then add:

```text
Daily Game
      ↓
Leaderboard
      ↓
Profile
```

This approach makes the project easier to understand, test, and debug.

---

# 37. Suggested UI Style

The UI should feel:

* Modern
* Simple
* Playful
* Clean
* Responsive
* Easy to understand

The game should be the visual focus.

Possible design elements:

```text
Game Cards
Large Number Input
Clear Feedback
Progress Indicators
Statistics Cards
Leaderboard Table
Success Animation
```

Avoid making the interface unnecessarily complicated.

---

# 38. Core Project Mental Model

The entire project can be understood through three main areas:

```text
                 GUESSING TASK
                      │
         ┌────────────┼────────────┐
         ↓            ↓            ↓
       AUTH          GAME       STATISTICS
         │            │            │
         │       ┌────┴────┐       │
         │       ↓         ↓       │
         │   PRACTICE    DAILY     │
         │       │         │       │
         │       └────┬────┘       │
         │            ↓            │
         │          RESULT         │
         │            │            │
         └────────────┼────────────┘
                      ↓
                USER EXPERIENCE
```

---

# 39. The Most Important Front-End Mental Model

Whenever the user interacts with the application:

```text
User Action
     ↓
React Component
     ↓
Event Handler
     ↓
Application Logic
     ↓
Backend
     ↓
Result
     ↓
React State
     ↓
UI Update
```

For example:

```text
User enters 50
       ↓
GuessForm
       ↓
Submit
       ↓
Game Logic
       ↓
Result
       ↓
Update State
       ↓
Show:
"Try a higher number"
```

This pattern is the foundation of the entire project.

---

# 40. Final Project Summary

**Guessing Task** is a Number Guessing Game focused on a simple but complete gaming experience.

The main product areas are:

* Authentication
* Practice Game
* Daily Game
* Guess Feedback
* Guess History
* User Statistics
* Daily Streak
* Leaderboard
* Profile
* Responsive UI
* Accessible UI

The project is not mainly about creating many CRUD screens.

Its main focus is a **game-driven user experience** where:

```text
The user plays
      ↓
The game provides feedback
      ↓
The user improves their guesses
      ↓
The result is recorded
      ↓
Statistics are updated
      ↓
Daily performance can be compared
```

---

# 41. Final Project Flow

```text
Create Account
      ↓
Login
      ↓
Dashboard
      ↓
Choose Game
      ↓
Practice / Daily
      ↓
Start Game
      ↓
Enter Guess
      ↓
Higher / Lower
      ↓
Try Again
      ↓
Correct
      ↓
Game Completed
      ↓
Save Result
      ↓
Update Statistics
      ↓
View Profile / Leaderboard
```

---

# 42. One-Sentence Project Definition

> **Guessing Task is an interactive number guessing game where users can play practice and daily challenges, track their performance, and compare their daily results through a leaderboard.**
