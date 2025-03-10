let boot = false;
let login = false;

document.documentElement.style.setProperty('--center-from-top', 'calc(100vh / 2)');
document.documentElement.style.setProperty('--center-from-left', 'calc(100vw / 2)');

if (boot == true && login == true) {
    document.querySelector('.boot-screen').style.display = "block";
    document.querySelector('.start-screen').style.display = "none";

    setTimeout(() => {
        document.querySelector('.boot-screen').style.animation = "fadeOut 0.6s ease-in-out";
        document.querySelector('.start-screen').style.animation = "fadeIn 0.6s ease-in-out";
        setTimeout(() => {
            document.querySelector('.boot-screen').style.display = "none";
            document.querySelector('.start-screen').style.display = "block";
        }, 500);
    }, 14000);
} else if (boot == true && login == false) {
    document.querySelector('.boot-screen').style.display = "block";
    document.querySelector('.start-screen').style.display = "none";
    setTimeout(() => {
        document.querySelector('.boot-screen').style.animation = "fadeOut 0.6s ease-in-out";
        document.querySelector('.home-screen').style.animation = "fadeIn 0.6s ease-in-out";
        document.querySelector('.start-screen').style.display = "none";
        setTimeout(() => {
            document.querySelector('.boot-screen').style.display = "none";
            document.querySelector('.home-screen').style.display = "block";
        }, 500);
    }, 14000)
} else if (boot == false && login == true) {
    document.querySelector('.boot-screen').style.display = "none";
    document.querySelector('.start-screen').style.display = "block";
    setTimeout(() => {
        document.querySelector('.boot-screen').style.animation = "fadeOut 0.6s ease-in-out";
        document.querySelector('.start-screen').style.animation = "fadeIn 0.6s ease-in-out";
        setTimeout(() => {
            document.querySelector('.boot-screen').style.display = "none";
            document.querySelector('.start-screen').style.display = "block";
        }, 500);
    }, 14000);
} else if (boot == false && login == false) {
    document.querySelector('.boot-screen').style.display = "none";
    document.querySelector('.start-screen').style.display = "none";
    document.querySelector('.home-screen').style.display = "block";
}

let date = new Date()
let hours = date.getHours();
let minutes = date.getMinutes();
hours = hours - 12;
if (minutes == 0 || minutes == 1 || minutes == 2 || minutes == 3 || minutes == 4 || minutes == 5 || minutes == 6 || minutes == 7 || minutes == 8 || minutes == 9) {
    minutes = '0' + minutes;
}
let time = hours + ":" + minutes;
document.querySelector('.start-screen-time').textContent = time;

setInterval(() => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes == 0 || minutes == 1 || minutes == 2 || minutes == 3 || minutes == 4 || minutes == 5 || minutes == 6 || minutes == 7 || minutes == 8 || minutes == 9) {
        minutes = '0' + minutes;
    }
    hours = hours - 12;
    let time = hours + ":" + minutes;   
    document.querySelector('.start-screen-time').textContent = time;
}, 1000);

let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
let month = date.getUTCMonth() + 1;
if (month == 1) {
    month = 'January';
} else if (month == 2) {
    month = 'February';
} else if (month == 3) {
    month = 'March';
} else if (month == 4) {
    month = 'April';
} else if (month == 5) {
    month = 'May';
} else if (month == 6) {
    month = 'June';
} else if (month == 7) {
    month = 'July';
} else if (month == 8) {
    month = 'August';
} else if (month == 9) {
    month = 'September';
} else if (month == 10) {
    month = 'October';
} else if (month == 11) {
    month = 'November';
} else if (month == 12) {
    month = 'December';
}
let year = date.getFullYear();
let dateToday = day + ', ' + date.getDay() + ' ' + month;
document.querySelector('.start-screen-date').textContent = dateToday;

function loginUser() {
    bootScreen = document.querySelector('.boot-screen');
    startScreen = document.querySelector('.start-screen');
    homeScreen = document.querySelector('.home-screen');
    password = document.querySelector('.start-screen-password').value;
    if (password != '') {
        bootScreen.style.animation = 'fadeOut 0.3s ease-in-out';
        startScreen.style.animation = 'fadeOut 0.3s ease-in-out';
        homeScreen.style.animation = 'fadeIn 0.3s ease-in-out';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            startScreen.style.display = 'none';
            homeScreen.style.display = 'block';
        }, 100);
    } else {
        alert('Password cannot be empty');
        console.error('Password cannot be empty');
    }
}

let topToolbarDay = date.getDay()
let topToolbarMonth = 1 + date.getUTCMonth()
let topToolbarDayNumber = date.getUTCDate()

let topToolbarTimeHours = date.getHours()
if (topToolbarTimeHours >= 12) {
    topToolbarTimeHours = topToolbarTimeHours - 12;
}
let topToolbarTimeMinutes = date.getMinutes()
if (topToolbarTimeMinutes <= 9) {
    topToolbarTimeMinutes = '0' + topToolbarTimeMinutes;
} else if (topToolbarDayNumber <= 9) {
    topToolbarDayNumber = '0' + topToolbarDayNumber;
}

if (topToolbarDay == 1) {
    topToolbarDay = 'Mon'
} else if (topToolbarDay == 2) {
    topToolbarDay = 'Tue'
} else if (topToolbarDay == 3) {
    topToolbarDay = 'Wed'
} else if (topToolbarDay == 4) {
    topToolbarDay = 'Thu'
} else if (topToolbarDay == 5) {
    topToolbarDay = 'Fri'
} else if (topToolbarDay == 6) {
    topToolbarDay = 'Sat'
} else if (topToolbarDay == 0) {
    topToolbarDay = 'Sun'
}

topToolbarMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][topToolbarMonth - 1];

document.querySelector('.top-toolbar-date').textContent = topToolbarDay + ' ' + topToolbarMonth + ' ' + topToolbarDayNumber;
let timePeriod = topToolbarTimeHours >= 12 ? 'PM' : 'AM';
let displayHours = topToolbarTimeHours > 12 ? topToolbarTimeHours - 12 : topToolbarTimeHours;
document.querySelector('.top-toolbar-time').textContent = displayHours + ':' + topToolbarTimeMinutes + ' ' + timePeriod;

const appIconNames = ['Finder', 'Safari', 'Cursor', 'Notes', 'ChatGPT', 'Reminders']
const appIcons = document.querySelectorAll('.dock img');

appIcons.forEach((icon, index) => {
    icon.addEventListener('mouseover', () => {
        // Show the corresponding app-label
        document.querySelector(`.app-label.${appIconNames[index]}-label`).style.animation = 'fadeIn 0.1s ease-in-out'
        document.querySelector(`.app-label.${appIconNames[index]}-label`).style.display = 'block';
    });

    icon.addEventListener('mouseout', () => {
        // Hide the corresponding app-label
        document.querySelector(`.app-label.${appIconNames[index]}-label`).style.animation = 'fadeOut 0.1s ease-in-out'
        document.querySelector(`.app-label.${appIconNames[index]}-label`).style.display = 'none ';
    });
});
document.querySelectorAll('.dock img').forEach((icon, index) => {
    if (index !== 0) {
        let underlineElement = document.createElement('div');
        underlineElement.className = 'underline-element';
        icon.addEventListener('click', () => {
            underlineElement.style.position = 'relative';
            underlineElement.style.left = '-7.9%';
            underlineElement.style.marginTop = '60px'
            underlineElement.style.width = '6px'; // Adjust this value to change the width
            underlineElement.style.borderRadius = '9px'
            underlineElement.style.height = '3px'; // Adjust this value to change the height/thickness
            underlineElement.style.backgroundColor = '#353535'; // Adjust this value to change the color
            icon.style.marginRight = '-2px';
            icon.parentElement.insertBefore(underlineElement, icon.nextSibling);
            icon.style.animation = 'bounce 1s ease-in-out';
            setTimeout(() => {
                icon.style.animation = 'none';
            }, 900)
        });
    }
});
if (document.querySelector('.cursor-window')) {
    function updateCursorLeftColumnHeight() {
        const windowHeight = Number(getComputedStyle(document.querySelector('.window')).height.replace('px', ''));
        document.querySelector('.cursor-left-column').style.height = (windowHeight - 52) + 'px';
    }

    // Initial height update
    updateCursorLeftColumnHeight();

    setInterval(() => {
        let windowOldHeight = getComputedStyle(document.querySelector('.window')).height;
        let windowNewHeight = Number(localStorage.getItem('cursorWindowHeight').replace('vh', '')) + 265 + 'px';
        if (windowOldHeight != windowNewHeight) {
            updateCursorLeftColumnHeight()
        }
    }, 10);
}

// Function to reload the page when Ctrl+B is pressed
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent the default action
        location.reload(); // Reload the page
    }
});

function openApp(name) {
    let windowsSection = document.querySelector('.windows-section');
    
    if (name == 'safari' && localStorage.getItem('safariMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window safari-window">
                <div class="window-top-bar safari-window-top-bar">
                    <button class="window-top-bar-button safari-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("safariMinimized", "false"); document.querySelector(".underline-element").remove(); this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
                    <button class="window-top-bar-button safari-window-top-bar-button minimize" onclick='this.parentElement.parentElement.hidden = true; localStorage.setItem("safariMinimized", "true"); localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus");'></button>
                    <button class="window-top-bar-button safari-window-top-bar-button expand" onclick='
                        let windowElement = this.parentElement.parentElement;
                        localStorage.setItem("safariMinimized", "false");
                        if (windowElement.style.height === "95vh" && windowElement.style.width === "100vw") {
                            windowElement.style.height = "50%";
                            windowElement.style.width = "50%";
                        } else {
                            windowElement.style.height = "95vh";
                            windowElement.style.width = "100vw";
                            windowElement.style.marginTop = "10px";
                            windowElement.style.postion = "absolute";
                            windowElement.style.top = "50%"
                            windowElement.style.left = "50%"
                            windowElement.style.transform = "translate(-50%, -50%)"
                        }
                        windowElement.style.transition = "all 0.2s ease-in-out";
                    '></button>
                </div>
    
                <iframe src="https://example.com" width="100%" height="100%" frameborder="0"></iframe>
            </div>
        `    

        if (document.querySelector(`.safari-window`)) {
            // Get the window-top-bar element
            const windowTopBarElement = document.querySelector('.safari-window-top-bar');

            // Variables to store the mouse position and the window's initial position
            let mouseX, mouseY, initialX, initialY;

            // Event listener for mousedown
            windowTopBarElement.addEventListener('mousedown', (e) => {
                // Store the initial mouse position and the window's initial position
                mouseX = e.clientX;
                mouseY = e.clientY;
                initialX = windowTopBarElement.parentElement.offsetLeft;
                initialY = windowTopBarElement.parentElement.offsetTop;
                
                // Add event listeners for mousemove and mouseup
                document.addEventListener('mousemove', dragWindow);
                document.addEventListener('mouseup', stopDragging);
            });

            // Function to drag the window
            function dragWindow(e) {
                // Calculate the new position of the window
                const newX = initialX + (e.clientX - mouseX);
                const newY = initialY + (e.clientY - mouseY);
                document.querySelector('.window').style.transition = "none";
                
                // Update the window's position
                windowTopBarElement.parentElement.style.top = `${newY}px`;
                windowTopBarElement.parentElement.style.left = `${newX}px`;
            }

            // Function to stop dragging
            function stopDragging() {
                // Remove event listeners for mousemove and mouseup
                document.removeEventListener('mousemove', dragWindow);
                document.removeEventListener('mouseup', stopDragging);
            }
        }

        localStorage.setItem('currentFocus', 'Safari')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'cursor' && localStorage.getItem('cursorMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window cursor-window">
                <div class="window-top-bar cursor-window-top-bar">
                    <button class="window-top-bar-button cursor-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("cursorMinimized", "false"); document.querySelector(".underline-element").remove(); this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
                    <button class="window-top-bar-button cursor-window-top-bar-button minimize" onclick='this.parentElement.parentElement.hidden = true; localStorage.setItem("cursorMinimized", "true"); localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus");'></button>
                    <button class="window-top-bar-button cursor-window-top-bar-button expand" onclick='
                        let windowElement = this.parentElement.parentElement;
                        localStorage.setItem("cursorMinimized", "false");
                        if (windowElement.style.height === "95vh" && windowElement.style.width === "100vw") {
                            windowElement.style.height = "50%";
                            windowElement.style.width = "50%";
                        } else {
                            windowElement.style.height = "95vh";
                            localStorage.setItem("cursorWindowHeight", windowElement.style.height)
                            windowElement.style.width = "100vw";
                            windowElement.style.marginTop = "10px";
                            windowElement.style.postion = "absolute";
                            windowElement.style.top = "50%"
                            windowElement.style.left = "50%"
                            windowElement.style.transform = "translate(-50%, -50%)"
                        }
                        windowElement.style.transition = "all 0.2s ease-in-out";
                    '></button>
                </div>
    
                <div class='cursor-left-column'>
                    <div class="cursor-left-column-top-area">
                        <h1 class="cursor-left-column-folder-name"><img src="resources/downarrow.svg" alt="">FOLDER NAME<button class="cursor-left-column-new-file">+</button></h1>
                    </div>
                    
                    <div class="cursor-left-column-files">
                        <div class="file">
                            templates
                        </div>
                        <div class="file">
                            index.html
                        </div>
                    </div>
                </div>
            </div>
        `
        function updateCursorLeftColumnHeight() {
            const windowHeight = Number(getComputedStyle(document.querySelector('.window')).height.replace('px', ''));
            document.querySelector('.cursor-left-column').style.height = (windowHeight - 52) + 'px';
        }
        
        // Initial height update
        updateCursorLeftColumnHeight();

        setInterval(() => {
            let windowOldHeight;
            let windowNewHeight;
            if (document.querySelector('.cursor-window')) {
                windowOldHeight = getComputedStyle(document.querySelector('.window')).height;
                windowNewHeight = Number(localStorage.getItem('cursorWindowHeight').replace('vh', '')) + 265 + 'px';
            }
            if (windowOldHeight != windowNewHeight) {
                updateCursorLeftColumnHeight()
            } else {
                null
            }
        }, 1)        

        if (document.querySelector(`.cursor-window`)) {
            // Get the window-top-bar element
            const windowTopBarElement = document.querySelector('.cursor-window-top-bar');

            // Variables to store the mouse position and the window's initial position
            let mouseX, mouseY, initialX, initialY;

            // Event listener for mousedown
            windowTopBarElement.addEventListener('mousedown', (e) => {
                // Store the initial mouse position and the window's initial position
                mouseX = e.clientX;
                mouseY = e.clientY;
                initialX = windowTopBarElement.parentElement.offsetLeft;
                initialY = windowTopBarElement.parentElement.offsetTop;
                
                // Add event listeners for mousemove and mouseup
                document.addEventListener('mousemove', dragWindow);
                document.addEventListener('mouseup', stopDragging);
            });

            // Function to drag the window
            function dragWindow(e) {
                // Calculate the new position of the window
                const newX = initialX + (e.clientX - mouseX);
                const newY = initialY + (e.clientY - mouseY);
                document.querySelector('.window').style.transition = "none";
                
                // Update the window's position
                windowTopBarElement.parentElement.style.top = `${newY}px`;
                windowTopBarElement.parentElement.style.left = `${newX}px`;
            }

            // Function to stop dragging
            function stopDragging() {
                // Remove event listeners for mousemove and mouseup
                document.removeEventListener('mousemove', dragWindow);
                document.removeEventListener('mouseup', stopDragging);
            }
        }

        localStorage.setItem('currentFocus', 'Cursor')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus')
    } else if (name == 'settings' && localStorage.getItem('settingsMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window settings-window">
                <div class="window-top-bar settings-window-top-bar">
                    <button class="window-top-bar-button settings-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("settingsMinimized", "false"); document.querySelector(".underline-element").remove(); this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
                    <button class="window-top-bar-button settings-window-top-bar-button minimize" onclick='this.parentElement.parentElement.hidden = true; localStorage.setItem("settingsMinimized", "true"); localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus");'></button>
                    <button class="window-top-bar-button settings-window-top-bar-button expand" onclick='
                        let windowElement = this.parentElement.parentElement;
                        localStorage.setItem("settingsMinimized", "false");
                        if (windowElement.style.height === "95vh" && windowElement.style.width === "100vw") {
                            windowElement.style.height = "70%";
                            windowElement.style.width = "50%";
                        } else {
                            windowElement.style.height = "95vh";
                            windowElement.style.width = "100vw";
                            localStorage.setItem("settingsWindowHeight", windowElement.style.height)
                            windowElement.style.marginTop = "10px";
                            windowElement.style.postion = "absolute";
                            windowElement.style.top = "50%"
                            windowElement.style.left = "50%"
                            windowElement.style.transform = "translate(-50%, -50%)"
                        }
                        windowElement.style.transition = "all 0.2s ease-in-out";
                    '></button>
                </div>

                <div class='settings-left-column'>
                    <button>About this Mac</button>
                </div>
            </div>
        `

        function updateSettingsLeftColumnHeight() {
            const windowHeight = Number(getComputedStyle(document.querySelector('.window')).height.replace('px', ''));
            document.querySelector('.settings-left-column').style.height = (windowHeight - 52) + 'px';
        }
        
        // Initial height update
        updateSettingsLeftColumnHeight();

        setInterval(() => {
            let windowOldHeight;
            let windowNewHeight;
            if (document.querySelector('.settings-window')) {
                windowOldHeight = getComputedStyle(document.querySelector('.window')).height;
                windowNewHeight = Number(localStorage.getItem('settingsWindowHeight').replace('vh', '')) + 265 + 'px';
            }
            if (windowOldHeight != windowNewHeight) {
                updateSettingsLeftColumnHeight()
            } else {
                null
            }
        }, 1)

        if (document.querySelector(`.settings-window`)) {
            // Get the window-top-bar element
            const windowTopBarElement = document.querySelector('.settings-window-top-bar');

            // Variables to store the mouse position and the window's initial position
            let mouseX, mouseY, initialX, initialY;

            // Event listener for mousedown
            windowTopBarElement.addEventListener('mousedown', (e) => {
                // Store the initial mouse position and the window's initial position
                mouseX = e.clientX;
                mouseY = e.clientY;
                initialX = windowTopBarElement.parentElement.offsetLeft;
                initialY = windowTopBarElement.parentElement.offsetTop;
                
                // Add event listeners for mousemove and mouseup
                document.addEventListener('mousemove', dragWindow);
                document.addEventListener('mouseup', stopDragging);
            });

            // Function to drag the window
            function dragWindow(e) {
                // Calculate the new position of the window
                const newX = initialX + (e.clientX - mouseX);
                const newY = initialY + (e.clientY - mouseY);
                document.querySelector('.window').style.transition = "none";
                
                // Update the window's position
                windowTopBarElement.parentElement.style.top = `${newY}px`;
                windowTopBarElement.parentElement.style.left = `${newX}px`;
            }

            // Function to stop dragging
            function stopDragging() {
                // Remove event listeners for mousemove and mouseup
                document.removeEventListener('mousemove', dragWindow);
                document.removeEventListener('mouseup', stopDragging);
            }
        }

        localStorage.setItem('currentFocus', 'Settings')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus')
    } else {
        document.querySelector('.window').style.animation = 'fadeIn 0.1s ease-in-out'
        document.querySelector('.window').hidden = false;
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus')
    }
}


