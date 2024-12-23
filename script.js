// Sample course data
const courses = [
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Smith",
        rating: 4.8,
        price: "$49.99",
        image: "🌐",
        curriculum: [
            { title: "Introduction to HTML", duration: "45 min" },
            { title: "CSS Basics", duration: "60 min" },
            { title: "JavaScript Fundamentals", duration: "90 min" }
        ]
    },
    {
        id: 2,
        title: "Data Science Basics",
        instructor: "Sarah Johnson",
        rating: 4.9,
        price: "$59.99",
        image: "📊",
        curriculum: [
            { title: "Introduction to Python", duration: "60 min" },
            { title: "Data Analysis", duration: "75 min" },
            { title: "Visualization Techniques", duration: "45 min" }
        ]
    },
    {
        id: 3,
        title: "Digital Marketing",
        instructor: "Mike Wilson",
        rating: 4.7,
        price: "$39.99",
        image: "📱",
        curriculum: [
            { title: "Marketing Fundamentals", duration: "30 min" },
            { title: "Social Media Strategy", duration: "60 min" },
            { title: "Analytics and Reporting", duration: "45 min" }
        ]
    },
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Smith",
        rating: 4.8,
        price: "$49.99",
        image: "🌐",
        curriculum: [
            { title: "Introduction to HTML", duration: "45 min" },
            { title: "CSS Basics", duration: "60 min" },
            { title: "JavaScript Fundamentals", duration: "90 min" }
        ]
    },
    {
        id: 2,
        title: "Data Science Basics",
        instructor: "Sarah Johnson",
        rating: 4.9,
        price: "$59.99",
        image: "📊",
        curriculum: [
            { title: "Introduction to Python", duration: "60 min" },
            { title: "Data Analysis", duration: "75 min" },
            { title: "Visualization Techniques", duration: "45 min" }
        ]
    },
    {
        id: 3,
        title: "Digital Marketing",
        instructor: "Mike Wilson",
        rating: 4.7,
        price: "$39.99",
        image: "📱",
        curriculum: [
            { title: "Marketing Fundamentals", duration: "30 min" },
            { title: "Social Media Strategy", duration: "60 min" },
            { title: "Analytics and Reporting", duration: "45 min" }
        ]
    },
    {
        id: 1,
        title: "Web Development Fundamentals",
        instructor: "John Smith",
        rating: 4.8,
        price: "$49.99",
        image: "🌐",
        curriculum: [
            { title: "Introduction to HTML", duration: "45 min" },
            { title: "CSS Basics", duration: "60 min" },
            { title: "JavaScript Fundamentals", duration: "90 min" }
        ]
    },
    {
        id: 2,
        title: "Data Science Basics",
        instructor: "Sarah Johnson",
        rating: 4.9,
        price: "$59.99",
        image: "📊",
        curriculum: [
            { title: "Introduction to Python", duration: "60 min" },
            { title: "Data Analysis", duration: "75 min" },
            { title: "Visualization Techniques", duration: "45 min" }
        ]
    },
    {
        id: 3,
        title: "Digital Marketing",
        instructor: "Mike Wilson",
        rating: 4.7,
        price: "$39.99",
        image: "📱",
        curriculum: [
            { title: "Marketing Fundamentals", duration: "30 min" },
            { title: "Social Media Strategy", duration: "60 min" },
            { title: "Analytics and Reporting", duration: "45 min" }
        ]
    }
    
];

// Current course and lesson tracking
let currentCourseId = null;
let currentLessonIndex = 0;

// Populate courses
function populateCourses() {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = ''; // Clear existing courses
    courses.forEach(course => {
        const courseCard = `
            <div class="course-card" onclick="showCourseDetails(${course.id})">
                <div class="course-image">${course.image}</div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-instructor">By ${course.instructor}</p>
                    <div class="course-rating">★★★★★ ${course.rating}</div>
                    <div class="course-price">${course.price}</div>
                </div>
            </div>
        `;
        courseGrid.innerHTML += courseCard;
    });
}

// Show course details
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    currentCourseId = courseId;
    currentLessonIndex = 0;

    document.querySelector('.home-page').style.display = 'none';
    document.getElementById('courseDetails').style.display = 'block';
    document.getElementById('learningInterface').style.display = 'none';

    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = `Instructor: ${course.instructor}`;
    document.getElementById('courseRating').textContent = `Rating: ${course.rating}/5`;

    const curriculumList = document.getElementById('curriculumList');
    curriculumList.innerHTML = course.curriculum.map((item, index) => `
        <div class="curriculum-item" onclick="startSpecificLesson(${index})">
            <h3>${item.title}</h3>
            <p>Duration: ${item.duration}</p>
        </div>
    `).join('');
}

// Start course
function startCourse() {
    if (currentCourseId === null) return;
    startSpecificLesson(0);
}

// Start specific lesson
function startSpecificLesson(lessonIndex) {
    const course = courses.find(c => c.id === currentCourseId);
    if (!course || !course.curriculum[lessonIndex]) return;

    currentLessonIndex = lessonIndex;
    document.getElementById('courseDetails').style.display = 'none';
    document.getElementById('learningInterface').style.display = 'block';

    // Update lesson content
    const lesson = course.curriculum[lessonIndex];
    document.getElementById('lessonTitle').textContent = lesson.title;
    updateProgress();
    switchTab(document.querySelector('.tab.active'), 'overview');
}

// Update progress
function updateProgress() {
    const course = courses.find(c => c.id === currentCourseId);
    if (!course) return;

    const progressPercentage = ((currentLessonIndex + 1) / course.curriculum.length) * 100;
    document.querySelector('.progress-fill').style.width = `${progressPercentage}%`;
}

// Navigation between lessons
function nextLesson() {
    const course = courses.find(c => c.id === currentCourseId);
    if (!course || currentLessonIndex >= course.curriculum.length - 1) return;
    startSpecificLesson(currentLessonIndex + 1);
}

function previousLesson() {
    if (currentLessonIndex <= 0) return;
    startSpecificLesson(currentLessonIndex - 1);
}

// Switch tabs in learning interface
function switchTab(tab, content) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');

    const course = courses.find(c => c.id === currentCourseId);
    const lesson = course?.curriculum[currentLessonIndex];
    
    // Update content based on selected tab
    const contentArea = document.getElementById('lessonContent');
    switch(content) {
        case 'overview':
            contentArea.innerHTML = `
                <h2>${lesson?.title || 'Lesson Overview'}</h2>
                <p>This lesson covers the fundamental concepts and practical applications.</p>
                <div class="lesson-navigation">
                    <button onclick="previousLesson()" class="btn btn-secondary" ${currentLessonIndex <= 0 ? 'disabled' : ''}>Previous</button>
                    <button onclick="nextLesson()" class="btn btn-primary" ${currentLessonIndex >= (course?.curriculum.length - 1) ? 'disabled' : ''}>Next</button>
                </div>
            `;
            break;
        case 'resources':
            contentArea.innerHTML = `
                <h2>Resources</h2>
                <ul>
                    <li>Lesson Slides</li>
                    <li>Practice Exercises</li>
                    <li>Additional Reading Materials</li>
                </ul>
            `;
            break;
        case 'discussion':
            contentArea.innerHTML = `
                <h2>Discussion Forum</h2>
                <div class="discussion-forum">
                    <textarea placeholder="Start a discussion..." class="notes-input"></textarea>
                    <button class="btn btn-primary" onclick="alert('Discussion feature coming soon!')">Post</button>
                </div>
            `;
            break;
    }
}

// Show home page
function showHomePage() {
    document.querySelector('.home-page').style.display = 'block';
    document.getElementById('courseDetails').style.display = 'none';
    document.getElementById('learningInterface').style.display = 'none';
    currentCourseId = null;
    currentLessonIndex = 0;
}

// Save notes
function saveNotes(courseId, lessonIndex, notes) {
    const key = `notes_${courseId}_${lessonIndex}`;
    localStorage.setItem(key, notes);
}

// Load notes
function loadNotes(courseId, lessonIndex) {
    const key = `notes_${courseId}_${lessonIndex}`;
    return localStorage.getItem(key) || '';
}

// Authentication functions
function showLoginModal() {
    alert('Login functionality to be implemented');
}

function showSignupModal() {
    alert('Sign up functionality to be implemented');
}

// Explore courses
function exploreCourses() {
    document.querySelector('.featured-courses').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Search courses
function searchCourses(query) {
    const filteredCourses = courses.filter(course => 
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.instructor.toLowerCase().includes(query.toLowerCase())
    );
    return filteredCourses;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    populateCourses();

    // Setup notes autosave
    const notesInput = document.querySelector('.notes-input');
    if (notesInput) {
        notesInput.addEventListener('input', (e) => {
            if (currentCourseId && currentLessonIndex >= 0) {
                saveNotes(currentCourseId, currentLessonIndex, e.target.value);
            }
        });
    }

    // Load saved notes when switching lessons
    document.addEventListener('lessonChange', () => {
        if (currentCourseId && currentLessonIndex >= 0) {
            const savedNotes = loadNotes(currentCourseId, currentLessonIndex);
            if (notesInput) {
                notesInput.value = savedNotes;
            }
        }
    });
});


// Store for logged-in user data
let currentUser = null;

// Show login modal
function showLoginModal() {
    const modal = document.getElementById('authModal');
    switchForm('login');
    modal.style.display = 'block';
}

// Show signup modal
function showSignupModal() {
    const modal = document.getElementById('authModal');
    switchForm('signup');
    modal.style.display = 'block';
}

// Switch between login and signup forms
function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (formType === 'login') {
        loginForm.classList.remove('hide');
        signupForm.classList.add('hide');
    } else {
        loginForm.classList.add('hide');
        signupForm.classList.remove('hide');
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically make an API call to verify credentials
    // For demo purposes, we'll simulate a successful login
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0] // Using email username as display name
        };
        
        updateAuthUI();
        closeModal();
        showSuccessMessage('Successfully logged in!');
    }
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Basic validation
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Here you would typically make an API call to create the account
    // For demo purposes, we'll simulate a successful signup
    if (name && email && password) {
        currentUser = {
            name: name,
            email: email
        };
        
        updateAuthUI();
        closeModal();
        showSuccessMessage('Account created successfully!');
    }
}

// Close the modal
function closeModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    clearForms();
}

// Clear form inputs
function clearForms() {
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginPassword').value = '';
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// Show error message
function showError(message) {
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const activeForm = document.querySelector('.auth-form:not(.hide)');
    activeForm.querySelector('form').appendChild(errorDiv);
}

// Show success message
function showSuccessMessage(message) {
    alert(message); // For demo purposes, you might want to replace this with a custom toast notification
}

// Update UI based on authentication state
function updateAuthUI() {
    const authButtons = document.querySelector('.auth-buttons');
    
    if (currentUser) {
        authButtons.innerHTML = `
            <span class="user-name">Welcome, ${currentUser.name}</span>
            <button class="btn btn-secondary" onclick="handleLogout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn btn-secondary" onclick="showLoginModal()">Login</button>
            <button class="btn btn-primary" onclick="showSignupModal()">Sign Up</button>
        `;
    }
}

// Handle logout
function handleLogout() {
    currentUser = null;
    updateAuthUI();
    showSuccessMessage('Successfully logged out!');
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking outside
    const modal = document.getElementById('authModal');
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
    
    // Close modal when clicking close button
    const closeBtn = document.querySelector('.close');
    closeBtn.onclick = closeModal;
});