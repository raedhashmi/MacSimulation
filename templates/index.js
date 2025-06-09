let boot = false;
let login = true;

function handleScreenTransition(showScreen, hideScreen, showAnimation, hideAnimation, delay = 14000, transitionTime = 500) {
    document.querySelector(hideScreen).style.display = "block";
    document.querySelector(showScreen).style.display = "none";

    setTimeout(() => {
        document.querySelector(hideScreen).style.animation = hideAnimation;
        document.querySelector(showScreen).style.animation = showAnimation;
        setTimeout(() => {
            document.querySelector(hideScreen).style.display = "none";
            document.querySelector(showScreen).style.display = "block";
        }, transitionTime);
    }, delay);
}

if (boot && login) {
    handleScreenTransition('.start-screen', '.boot-screen', "fadeIn 0.6s ease-in-out", "fadeOut 0.6s ease-in-out");
} else if (boot && !login) {
    handleScreenTransition('.home-screen', '.boot-screen', "fadeIn 0.6s ease-in-out", "fadeOut 0.6s ease-in-out");
} else if (!boot && login) {
    document.querySelector('.boot-screen').style.display = "none";
    document.querySelector('.start-screen').style.display = "block";
} else if (!boot && !login) {
    document.querySelector('.boot-screen').style.display = "none";
    document.querySelector('.start-screen').style.display = "none";
    document.querySelector('.home-screen').style.display = "block";
}

let date = new Date()
let hours = date.getHours();
let minutes = date.getMinutes();
if (hours >= 12) {
    hours -= 12;
}
if (minutes == 0 || minutes == 1 || minutes == 2 || minutes == 3 || minutes == 4 || minutes == 5 || minutes == 6 || minutes == 7 || minutes == 8 || minutes == 9) {
    minutes = '0' + minutes;
}
let time = hours + ":" + minutes;
document.querySelector('.start-screen-time').textContent = time;

setInterval(() => {
    let date = new Date()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12;
    if (minutes <= 9) {
        minutes = '0' + minutes;
    }
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
let dateToday = day + ', ' + date.getDate() + ' ' + month; // Changed date.getDay() to date.getDate()
document.querySelector('.start-screen-date').textContent = dateToday;

function loginUser() {
    bootScreen = document.querySelector('.boot-screen');
    startScreen = document.querySelector('.start-screen');
    homeScreen = document.querySelector('.home-screen');
    password = document.querySelector('.start-screen-password').value;
    accountPassword = localStorage.getItem('account-password');

    if (accountPassword == null) {
        localStorage.setItem('account-password', 123)
        accountPassword = localStorage.getItem('account-password');
    }
    
    if (password == accountPassword) {
        bootScreen.style.animation = 'fadeOut 0.3s ease-in-out';
        startScreen.style.animation = 'fadeOut 0.3s ease-in-out';
        homeScreen.style.animation = 'fadeIn 0.3s ease-in-out';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            startScreen.style.display = 'none';
            homeScreen.style.display = 'block';
        }, 100);
    } else {
        document.querySelector('.start-screen-password').style.backgroundColor = '#ff000066'
        document.querySelector('.start-screen-password').style.border = '2px #ff0000 solid'
        document.querySelector('.start-screen-password').style.animation = 'vibrate 0.2s linear'
        setTimeout(() => {
            document.querySelector('.start-screen-password').style.animation = 'nonr'
        }, 300)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector
})

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

const appIconNames = ['Finder', 'Safari', 'VSCode', 'Notes', 'UltraGPT', 'Reminders']
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

appIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
        localStorage.removeItem(`${appIconNames[index].toLowerCase()}Minimized`);
    });
});

let isDragging = false;
let startCoords = { x: 0, y: 0 };
let endCoords = { x: 0, y: 0 };

document.querySelector('.home-screen').addEventListener('mousedown', (e) => {
    if (e.detail === 2) {
        isDragging = true;
        startCoords.x = e.clientX;
        startCoords.y = e.clientY;
    }
});

let selectionBox = document.createElement('div');

document.querySelector('.home-screen').addEventListener('mousemove', (e) => {
    if (isDragging) {
        endCoords.x = e.clientX;
        endCoords.y = e.clientY;

        selectionBox.className = 'selection-box';
        selectionBox.style.cssText = `
            position: absolute;
            top: ${Math.min(startCoords.y, endCoords.y)}px;
            left: ${Math.min(startCoords.x, endCoords.x)}px;
            width: ${Math.abs(endCoords.x - startCoords.x)}px;
            height: ${Math.abs(endCoords.y - startCoords.y)}px;
            border: 1px solid #ffffff88;
            background-color: #ffffff77;
            opacity: 0.6;
        `;

        document.querySelector('.windows-section').appendChild(selectionBox);
    }
});

document.querySelector('.windows-section').addEventListener('mouseup', () => {
    isDragging = false;
    selectionBox.remove();
});

document.querySelectorAll('.dock img').forEach((icon) => {
    if (!icon.src.includes('finder')) {
        icon.addEventListener('click', () => {
            underlineElement = document.createElement('div');
            underlineElement.className = `underline-element ${icon.className}-underline-element`;
            underlineElement.style.cssText = `
                position: absolute;
                left: ${icon.offsetLeft + (icon.offsetWidth - underlineElement.offsetWidth) / 2}px;
                bottom: 9%;
                height: 3px;
                width: 4px;
                background-color:rgb(126, 126, 126);
                border-radius: 30px;
            `

            icon.style.animation = 'bounce 1s ease-in-out';
            icon.after(underlineElement)
            
            setTimeout(() => {
                icon.style.animation = 'none';
            }, 1000);
        })
    }
});

document.querySelectorAll('.window').forEach((window) => {
    window.addEventListener('click', () => {
        // Bring the clicked window to the front by increasing its zIndex
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 0); // Reset zIndex for all windows
        window.style.zIndex = 10; // Set a higher zIndex for the clicked window
    });
});

// Function to reload the page when Ctrl+R is pressed
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent the default action
        location.reload(); // Reload the page
    }
});

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'q') {
        blackScreen = document.createElement('div');
        blackScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: black;
            z-index: 100;
            animation: fadeIn 0.6s ease-in-out;
        `;
        document.body.appendChild(blackScreen);
        setTimeout(() => {
                fetch('/closeApp', {
                method: 'POST'
            }).then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('Application closed successfully.');
                } else {
                    console.error('Failed to close the application.');
                }
            })
            .catch(error => console.error('Error closing the application:', error));
            setTimeout(() => {
                window.location.reload();
            }, 1500)
        }, 600)
    }
});

function openApp(name) {
    let windowsSection = document.querySelector('.windows-section');
    
    function setupDraggable(appName) {
        if (document.querySelector(`.${appName}-window`)) {
            const windowTopBarElement = document.querySelector(`.${appName}-window-top-bar`);
            let mouseX, mouseY, initialX, initialY;

            windowTopBarElement.addEventListener('mousedown', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                initialX = windowTopBarElement.parentElement.offsetLeft;
                initialY = windowTopBarElement.parentElement.offsetTop;
                
                document.addEventListener('mousemove', dragWindow);
                document.addEventListener('mouseup', stopDragging);
            });

            function dragWindow(e) {
                const newX = initialX + (e.clientX - mouseX);
                const newY = initialY + (e.clientY - mouseY);
                document.querySelector('.window').style.transition = "none";
                
                windowTopBarElement.parentElement.style.top = `${newY}px`;
                windowTopBarElement.parentElement.style.left = `${newX}px`;
            }

            function stopDragging() {
                document.removeEventListener('mousemove', dragWindow);
                document.removeEventListener('mouseup', stopDragging);
            }
        }
    }


    if (name == 'safari' && localStorage.getItem('safariMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window safari-window">
                <div class="window-top-bar safari-window-top-bar">
                    <button class="window-top-bar-button safari-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("safariMinimized", "false"); if (document.querySelector(".underline-element")) { document.querySelector(".underline-element").remove() }; this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
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

        setInterval(() => setupDraggable('safari'), 1)

        localStorage.setItem('currentFocus', 'Safari')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'settings' && localStorage.getItem('settingsMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window settings-window">
            <div class="window-top-bar settings-window-top-bar">
                <button class="window-top-bar-button settings-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("settingsMinimized", "false"); if (document.querySelector(".underline-element")) { document.querySelector(".underline-element").remove() }; this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
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
            <div class="settings-body">
                <nav class="settings-sidebar">
                <ul>
                    <li class="active" data-section="about"><img src="resources/appleLightVersion.png" alt="About" style="width:24px; height:24px"/> <span>About This Mac</span></li>
                    <li data-section="general"><img src="https://cdn-icons-png.flaticon.com/512/2040/2040504.png" alt="General" style="width:24px; height:24px"/> <span>General</span></li>
                    <li data-section="users"><img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Users" style="width:24px; height:24px"/> <span>Users & Accounts</span></li>
                    <li data-section="battery"><img src="https://cdn-icons-png.flaticon.com/512/664/664883.png" alt="Battery" style="width:24px; height:24px"/> <span>Battery</span></li>
                    <li data-section="ai"><img src="https://cdn-icons-png.flaticon.com/512/6134/6134346.png" alt="AI" style="width:24px; height:24px"/> <span>AI & Privacy</span></li>
                </ul>
                </nav>
                <main class="settings-content">
                    <div class="settings-section" id="about-section">
                        <h2>About This Mac</h2>
                        <div class="about-mac-info">
                            <p>macOS Ventura<br>Version 13.4<br>MacBook Pro (13-inch, M1, 2020)</p>
                            <p>Chip: Apple M1<br>Memory: 8 GB</p>
                        </div>
                        <button class="settings-learn-more">Learn More...</button>
                    </div>
                    <div class="settings-section" id="general-section" style="display:none">
                        <h2>General</h2>
                        <div class="settings-option">
                            <label for="appearance-select">Appearance</label>
                            <select id="appearance-select">
                                <option>Light</option>
                                <option>Dark</option>
                                <option>Auto</option>
                            </select>
                        </div>
                        <div class="settings-option">
                            <label for="accent-color-input">Accent Color</label>
                            <input id="accent-color-input" type="color" value="#007AFF"/>
                        </div>
                        <div class="settings-option">
                            <label for="sidebar-size-select">Sidebar Size</label>
                            <select id="sidebar-size-select">
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select>
                        </div>
                    </div>
                    <div class="settings-section" id="users-section" style="display:none">
                        <h2>Users & Accounts</h2>
                        <div class="user-profile">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Profile" class="user-profile-img"/>
                            <div class="user-profile-info">
                                <h3>Current User</h3>
                                <p>Administrator</p>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="settings-button">Edit Profile</button>
                            <button class="settings-button">Change Password</button>
                        </div>
                    </div>
                    <div class="settings-section" id="battery-section" style="display:none">
                        <h2>Battery</h2>
                        <div class="battery-info">
                            <div class="battery-level">100%</div>
                            <div class="battery-status">Power Adapter Connected</div>
                        </div>
                        <div class="battery-options">
                            <label><input type="checkbox" checked> Show battery percentage in menu bar</label>
                            <label><input type="checkbox" checked> Optimize battery charging</label>
                            <label><input type="checkbox"> Low power mode</label>
                        </div>
                    </div>
                    <div class="settings-section" id="ai-section" style="display:none">
                        <h2>AI & Privacy</h2>
                        <div class="ai-settings">
                            <label><input type="checkbox" checked> Enable AI features</label>
                            <label><input type="checkbox" checked> Share analytics to improve AI</label>
                            <label><input type="checkbox"> Allow personalized suggestions</label>
                        </div>
                        <div class="privacy-options">
                            <h3>Data Collection</h3>
                            <select>
                                <option>Essential Only</option>
                                <option>Balanced</option>
                                <option>Full Features</option>
                            </select>
                        </div>
                    </div>
                </main>
            </div>
            </div>
        `;

         

        // Sidebar switching logic
        setTimeout(() => {
            document.querySelectorAll('.settings-sidebar li').forEach(item => {
                item.addEventListener('click', function() {
                    document.querySelectorAll('.settings-sidebar li').forEach(li => li.classList.remove('active'));
                    this.classList.add('active');
                    document.querySelectorAll('.settings-section').forEach(section => section.style.display = 'none');
                    document.getElementById(this.dataset.section + '-section').style.display = 'block';
                });
            });

            // Users & Accounts functionality
            const userSection = document.getElementById('users-section');
            if (userSection) {
                // Edit Profile
                const editBtn = userSection.querySelector('.settings-button:nth-child(1)');
                // Change Password
                const passBtn = userSection.querySelector('.settings-button:nth-child(2)');
                const userNameElem = userSection.querySelector('.user-profile-info h3');
                editBtn.addEventListener('click', function() {
                    const modal = document.createElement('div');
                    modal.className = 'settings-modal';
                    modal.innerHTML = `
                        <div class="settings-modal-content">
                            <h3>Edit Profile</h3>
                            <label>Username</label>
                            <input type="text" id="edit-username-input" value="${userNameElem.textContent}" />
                            <div class="settings-modal-actions">
                                <button class="settings-button" id="save-username-btn">Save</button>
                                <button class="settings-button" id="cancel-username-btn">Cancel</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    modal.querySelector('#save-username-btn').onclick = function() {
                        const newName = modal.querySelector('#edit-username-input').value.trim();
                        if (newName) {
                            userNameElem.textContent = newName;
                            localStorage.setItem('account-username', newName);
                        }
                        document.body.removeChild(modal);
                    };
                    modal.querySelector('#cancel-username-btn').onclick = function() {
                        document.body.removeChild(modal);
                    };
                });
                passBtn.addEventListener('click', function() {
                    const modal = document.createElement('div');
                    modal.className = 'settings-modal';
                    modal.innerHTML = `
                        <div class="settings-modal-content">
                            <h3>Change Password</h3>
                            <label>New Password</label>
                            <input type="password" id="new-password-input" />
                            <label>Confirm Password</label>
                            <input type="password" id="confirm-password-input" />
                            <div class="settings-modal-actions">
                                <button class="settings-button" id="save-password-btn">Save</button>
                                <button class="settings-button" id="cancel-password-btn">Cancel</button>
                            </div>
                            <div id="password-error" class="settings-modal-error">Passwords do not match.</div>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    modal.querySelector('#save-password-btn').onclick = function() {
                        const newPass = modal.querySelector('#new-password-input').value;
                        const confirmPass = modal.querySelector('#confirm-password-input').value;
                        if (newPass && newPass === confirmPass) {
                            localStorage.setItem('account-password', newPass);
                            document.body.removeChild(modal);
                        } else {
                            modal.querySelector('#password-error').style.display = 'block';
                        }
                    };
                    modal.querySelector('#cancel-password-btn').onclick = function() {
                        document.body.removeChild(modal);
                    };
                });
            }
        }, 100);

        setInterval(() => setupDraggable('settings'), 1);

        localStorage.setItem('currentFocus', 'Settings');
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'ultragpt' && localStorage.getItem('ultragptMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window ultragpt-window">
                <div class="window-top-bar ultragpt-window-top-bar">
                    <button class="window-top-bar-button ultragpt-window-top-bar-button close" style="margin-left: 20px;" onclick='localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus"); localStorage.setItem("ultragptMinimized", "false"); if (document.querySelector(".underline-element")) { document.querySelector(".underline-element").remove() }; this.parentElement.parentElement.style.animation = "fadeOut 0.2s ease-in-out"; setTimeout(() => { this.parentElement.parentElement.remove(); }, 100)'></button>
                    <button class="window-top-bar-button ultragpt-window-top-bar-button minimize" onclick='this.parentElement.parentElement.hidden = true; localStorage.setItem("ultragptMinimized", "true"); localStorage.setItem("currentFocus", "Finder"); document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus");'></button>
                    <button class="window-top-bar-button ultragpt-window-top-bar-button expand" onclick='
                        let windowElement = this.parentElement.parentElement;
                        localStorage.setItem("ultragptMinimized", "false");
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

                    <iframe class='ultragpt-iframe' src="https://ultragpt-rust.vercel.app/" style='height: 95%; width: 100%; margin-top: 12px; background-color: transparent;' frameborder="0"></iframe>
                </div>
            </div>
        `

        setInterval(() => setupDraggable('ultragpt'), 1)

    } else {
        document.querySelector('.window').style.animation = 'fadeIn 0.1s ease-in-out'
        document.querySelector('.window').hidden = false;
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus')
    }
}
