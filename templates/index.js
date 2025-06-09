let boot = true;
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

function updateStartScreenDateTime() {
    const date = new Date();

    // Time (12-hour format, always 2 digits for minutes)
    let hours = date.getHours() % 12 || 12;
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let time = `${hours}:${minutes}`;
    const timeElem = document.querySelector('.start-screen-time');
    if (timeElem) timeElem.textContent = time;

    // Date (e.g., "Monday, 10 June")
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let dateToday = `${day}, ${date.getDate()} ${month}`;
    const dateElem = document.querySelector('.start-screen-date');
    if (dateElem) dateElem.textContent = dateToday;
}

// Initial update
updateStartScreenDateTime();
// Update every second
setInterval(updateStartScreenDateTime, 1000);

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

function updateTopToolbarDateTime() {
    const now = new Date();
    const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = daysShort[now.getDay()];
    const month = monthsShort[now.getMonth()];
    const dayNumber = now.getDate();

    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    document.querySelector('.top-toolbar-date').textContent = `${day} ${month} ${dayNumber}`;
    document.querySelector('.top-toolbar-time').textContent = `${hours}:${minutes} ${period}`;
}

// Initial update
updateTopToolbarDateTime();
// Update every second
setInterval(updateTopToolbarDateTime, 1000);

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
        setTimeout(() => {
            document.querySelector(`.app-label.${appIconNames[index]}-label`).style.display = 'none';
        }, 100);
    });
});

// Update dock app label hover logic for .dock-app-container structure
const dockAppContainers = document.querySelectorAll('.dock-app-container');
dockAppContainers.forEach(container => {
    const icon = container.querySelector('img');
    const label = container.querySelector('.app-label');
    if (icon && label) {
        icon.addEventListener('mouseover', () => {
            label.style.animation = 'fadeIn 0.1s ease-in-out';
            label.style.display = 'block';
        });
        icon.addEventListener('mouseout', () => {
            label.style.animation = 'fadeOut 0.1s ease-in-out';
            setTimeout(() => {
                label.style.display = 'none';
            }, 100);
        });
    }
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

function setupDockUnderlineAndBounce() {
    // Add underline and bounce animation for dock icons, supporting .dock-app-container structure
    document.querySelectorAll('.dock-app-container').forEach((container) => {
        const icon = container.querySelector('img');
        if (!icon.src.toLowerCase().includes('finder')) {
            icon.addEventListener('click', () => {
                // Remove any existing underline in this container
                const existingUnderline = container.querySelector('.underline-element');
                if (existingUnderline) existingUnderline.remove();

                const underlineElement = document.createElement('div');
                underlineElement.className = `underline-element ${icon.className}-underline-element`;
                underlineElement.style.cssText = `
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 1%;
                    height: 2px;
                    width: 3px;
                    background-color: rgb(126, 126, 126);
                    border-radius: 30px;
                    pointer-events: none;
                `;

                icon.style.animation = 'bounce 1s ease-in-out';
                container.appendChild(underlineElement);

                setTimeout(() => {
                    icon.style.animation = 'none';
                }, 1000);
            });
        }
    });
}

function finderUnderline() {
    const finderIconContainer = Array.from(document.querySelectorAll('.dock-app-container')).find(container => {
        const img = container.querySelector('img');
        return img && img.src.toLowerCase().includes('finder');
    });
    if (finderIconContainer) {
        const existingUnderline = finderIconContainer.querySelector('.underline-element');
        if (existingUnderline) {
            existingUnderline.remove();
        } else {
            const underlineElement = document.createElement('div');
            underlineElement.className = 'underline-element finder-underline-element';
            underlineElement.style.cssText = `
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 1%;
                height: 2px;
                width: 3px;
                background-color: rgb(126, 126, 126);
                border-radius: 30px;
                pointer-events: none;
            `;
            finderIconContainer.appendChild(underlineElement);
        }
    }
}

setInterval(setupDockUnderlineAndBounce(), 1)
setInterval(finderUnderline(), 1)

document.querySelectorAll('.window').forEach((winElem) => {
    winElem.addEventListener('click', () => {
        // Bring the clicked window to the front by increasing its zIndex
        document.querySelectorAll('.window').forEach(w => w.style.zIndex = 0); // Reset zIndex for all windows
        winElem.style.zIndex = 10; // Set a higher zIndex for the clicked window
    });
});

// Function to reload the page when Ctrl+R is pressed
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'r') {
        event.preventDefault(); // Prevent the default action
        location.reload(); // Reload the page
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

    // General window button handlers
    function handleClose(windowClass, minimizedKey) {
        document.querySelector(".currently-focused-instance-name").textContent = 'Finder';
        localStorage.setItem(minimizedKey, "false");
        const appName = windowClass.slice(0, -7);
        const underline = document.querySelector(`.${appName.toLowerCase()}-icon-underline-element`);
        const win = document.querySelector(`.${windowClass}`);
        if (underline) underline.remove();
        if (win) {
            win.style.animation = "fadeOut 0.2s ease-in-out";
            setTimeout(() => { win.remove(); }, 100);
        }
    }

    function handleMinimize(windowClass, minimizedKey, focusName) {
        const win = document.querySelector(`.${windowClass}`);
        if (win) win.hidden = true;
        localStorage.setItem(minimizedKey, "true");
        localStorage.setItem("currentFocus", focusName);
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem("currentFocus");
    }

    function handleExpand(windowClass, minimizedKey) {
        const win = document.querySelector(`.${windowClass}`);
        if (win) {
        localStorage.setItem(minimizedKey, "false");
        if (win.style.height === "95vh" && win.style.width === "100vw") {
            win.style.height = "50%";
            win.style.width = "50%";
        } else {
            win.style.height = "79.5vh";
            win.style.width = "100vw";
            win.style.marginTop = "-31px";
            win.style.position = "absolute";
            win.style.top = "50%";
            win.style.left = "50%";
            win.style.transform = "translate(-50%, -50%)";
        }
        win.style.transition = "all 0.2s ease-in-out";
        }
    }

    if (name == 'finder' && localStorage.getItem('finderMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window finder-window">
                <div class="window-top-bar finder-window-top-bar">
                    <button class="window-top-bar-button finder-window-top-bar-button close" style="margin-left: 20px;"></button>
                    <button class="window-top-bar-button finder-window-top-bar-button minimize"></button>
                    <button class="window-top-bar-button finder-window-top-bar-button expand"></button>
                </div>
                <div class="finder-body">
                    <div class="finder-sidebar">
                        <ul>
                            <li class="active" data-path="/">Home</li>
                            <li data-path="/Documents">Documents</li>
                            <li data-path="/Downloads">Downloads</li>
                            <li data-path="/Pictures">Pictures</li>
                            <li data-path="/Music">Music</li>
                        </ul>
                    </div>
                    <main class="finder-content">
                        <div class="finder-path-bar enhanced-path-bar">
                            <span class="finder-path-root">/</span>
                            <span class="finder-current-path">Home</span>
                        </div>
                        <div class="finder-file-list" id="finder-file-list"></div>
                        <div class="finder-drop-overlay" id="finder-drop-overlay" style="display:none;"></div>
                        <input type="file" class="finder-upload-input" style="display:none" webkitdirectory directory multiple />
                    </main>
                </div>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.finder-window .finder-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.finder-window .finder-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.finder-window .finder-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('finder-window', 'finderMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('finder-window', 'finderMinimized', 'Finder');
            if (expandBtn) expandBtn.onclick = () => handleExpand('finder-window', 'finderMinimized');
        }, 50);

        // --- Finder file system simulation with persistence ---
        let fakeFS = JSON.parse(localStorage.getItem('finder-fakeFS')) || {
            '/': [
                { name: 'Documents', type: 'folder' },
                { name: 'Downloads', type: 'folder' },
                { name: 'Pictures', type: 'folder' },
                { name: 'Music', type: 'folder' },
                { name: 'Readme.txt', type: 'file' },
            ],
            '/Documents': [],
            '/Downloads': [],
            '/Pictures': [],
            '/Music': [],
        };
        let currentPath = '/';

        function saveFS() {
            localStorage.setItem('finder-fakeFS', JSON.stringify(fakeFS));
        }

        function renderPathBar(path) {
            const pathBar = document.querySelector('.finder-path-bar');
            if (!pathBar) return;
            let segments = path.split('/').filter(Boolean);
            let html = `<span class="finder-path-root" data-path="/">/</span>`;
            let runningPath = '';
            segments.forEach((seg, idx) => {
                runningPath += '/' + seg;
                html += `<span class="finder-path-segment" data-path="${runningPath}">${seg}</span>`;
                if (idx < segments.length - 1) html += '<span class="finder-path-separator">›</span>';
            });
            pathBar.innerHTML = html;
            // Path bar click navigation
            pathBar.querySelectorAll('[data-path]').forEach(el => {
                el.onclick = (e) => {
                    e.stopPropagation();
                    renderFileList(el.dataset.path);
                };
            });
        }

        function renderFileList(path, focusNewName = null, focusType = null) {
            const fileList = document.getElementById('finder-file-list');
            if (!fileList) return;
            fileList.innerHTML = '';
            currentPath = path;
            renderPathBar(path);
            let items = fakeFS[path] || [];
            items = items.slice().sort((a, b) => {
                if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
                return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
            });
            // Removed lastHoveredIdx and hover logic
            items.forEach((item, idx) => {
                const el = document.createElement('div');
                el.className = 'finder-file-item ' + item.type;
                el.dataset.originalIdx = fakeFS[path].findIndex(f => f.name === item.name && f.type === item.type);
                if (focusNewName && item.name === focusNewName && item.type === focusType) {
                    el.innerHTML = `<span class="finder-file-icon">${item.type === 'folder' ? '📁' : '📄'}</span> <input type="text" class="finder-rename-input" value="${focusNewName}" autofocus />`;
                    const input = el.querySelector('input');
                    setTimeout(() => { input.focus(); input.select(); }, 0);
                    let finished = false;
                    function finishRename(ev) {
                        if (finished) return;
                        if (ev.type === 'blur' || (ev.type === 'keydown' && ev.key === 'Enter')) {
                            finished = true;
                            let newName = input.value.trim() || (item.type === 'folder' ? 'New Folder' : 'Untitled');
                            let baseName = newName;
                            let i = 1;
                            while (fakeFS[path].some((f, j) => f.name === newName && f.type === item.type && j !== idx)) {
                                newName = `${baseName} ${i++}`;
                            }
                            if (newName !== item.name) {
                                fakeFS[path][idx].name = newName;
                                if (item.type === 'folder') {
                                    const oldPath = path === '/' ? `/${focusNewName}` : `${path}/${focusNewName}`;
                                    const newPath = path === '/' ? `/${newName}` : `${path}/${newName}`;
                                    fakeFS[newPath] = fakeFS[oldPath] || [];
                                    delete fakeFS[oldPath];
                                    Object.keys(fakeFS).forEach(k => {
                                        if (k.startsWith(oldPath + '/')) {
                                            fakeFS[k.replace(oldPath, newPath)] = fakeFS[k];
                                            delete fakeFS[k];
                                        }
                                    });
                                }
                            }
                            saveFS();
                            renderFileList(path);
                        }
                    }
                    input.addEventListener('blur', finishRename);
                    input.addEventListener('keydown', finishRename);
                } else {
                    el.innerHTML = item.type === 'folder'
                        ? `<span class="finder-file-icon">📁</span> <span class="finder-file-name" title="${item.name}">${item.name}</span>`
                        : `<span class="finder-file-icon">📄</span> <span class="finder-file-name" title="${item.name}">${item.name}</span>`;
                    const nameSpan = el.querySelector('.finder-file-name');
                    if (item.type === 'folder') {
                        // Double-click to open folder
                        el.addEventListener('dblclick', (e) => {
                            e.stopPropagation();
                            const newPath = path === '/' ? `/${item.name}` : `${path}/${item.name}`;
                            renderFileList(newPath);
                        });
                    }
                }
                // Right click: show dropdown menu for item
                el.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showFinderDropdownMenu(e.clientX, e.clientY, item, idx, true);
                });
                fileList.appendChild(el);
            });
            // Removed Delete key handler for hovered item
            fileList.tabIndex = 0;
        }

        // Finder dropdown menu logic
        let finderDropdownMenu = null;
        function showFinderDropdownMenu(x, y, item = null, idx = null, isItem = false) {
            if (finderDropdownMenu) finderDropdownMenu.remove();
            finderDropdownMenu = document.createElement('div');
            finderDropdownMenu.className = 'finder-dropdown-menu';
            let menuHTML = '';
            if (isItem && item) {
                menuHTML += `<button class="finder-dropdown-item" data-action="open">Open</button><br>`;
                menuHTML += `<button class="finder-dropdown-item" data-action="rename">Rename</button><br>`;
                menuHTML += `<button class="finder-dropdown-item" data-action="delete">Delete</button><br>`;
                if (item.type === 'file') {
                    menuHTML += `<button class="finder-dropdown-item" data-action="download">Download</button><br>`;
                }
            } else {
                menuHTML += `<button class="finder-dropdown-item" data-action="new-folder">New Folder</button><br>`;
                menuHTML += `<button class="finder-dropdown-item" data-action="upload">Upload File/Folder</button><br>`;
                menuHTML += `<button class="finder-dropdown-item" data-action="refresh">Refresh</button><br>`;
            }
            finderDropdownMenu.innerHTML = menuHTML;
            finderDropdownMenu.style.left = `${x}px`;
            finderDropdownMenu.style.top = `${y}px`;
            document.body.appendChild(finderDropdownMenu);
            finderDropdownMenu.querySelectorAll('.finder-dropdown-item').forEach(menuItem => {
                // Fix: ensure mouse click focus and prevent menu from closing before click
                menuItem.onmousedown = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    menuItem.focus();
                };
                menuItem.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const action = menuItem.dataset.action;
                    if (action === 'open' && item) {
                        if (item.type === 'folder') {
                            const newPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
                            renderFileList(newPath);
                        } else {
                            const blob = new Blob([`This is a fake file: ${item.name}`], {type: 'text/plain'});
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(blob);
                            a.download = item.name;
                            a.click();
                        }
                    } else if (action === 'rename' && item && idx !== null) {
                        // Start renaming by replacing the file/folder name with an input
                        const fileList = document.getElementById('finder-file-list');
                        const fileItem = fileList.children[idx];
                        const itemType = item.type;
                        const oldName = item.name;
                        fileItem.innerHTML = `<span class="finder-file-icon">${itemType === 'folder' ? '📁' : '📄'}</span> <input type="text" class="finder-rename-input" value="${oldName}" autofocus />`;
                        const input = fileItem.querySelector('input');
                        setTimeout(() => { input.focus(); input.select(); }, 0);
                        let finished = false;
                        function finishRename(ev) {
                            if (finished) return;
                            if (ev.type === 'blur' || (ev.type === 'keydown' && ev.key === 'Enter')) {
                                finished = true;
                                let newName = input.value.trim() || (itemType === 'folder' ? 'New Folder' : 'Untitled');
                                let baseName = newName;
                                let i = 1;
                                while (fakeFS[currentPath].some((f, j) => f.name === newName && f.type === itemType && j !== idx)) {
                                    newName = `${baseName} ${i++}`;
                                }
                                if (newName !== oldName) {
                                    fakeFS[currentPath][idx].name = newName;
                                    if (itemType === 'folder') {
                                        const oldPath = currentPath === '/' ? `/${oldName}` : `${currentPath}/${oldName}`;
                                        const newPath = currentPath === '/' ? `/${newName}` : `${currentPath}/${newName}`;
                                        fakeFS[newPath] = fakeFS[oldPath] || [];
                                        delete fakeFS[oldPath];
                                        Object.keys(fakeFS).forEach(k => {
                                            if (k.startsWith(oldPath + '/')) {
                                                fakeFS[k.replace(oldPath, newPath)] = fakeFS[k];
                                                delete fakeFS[k];
                                            }
                                        });
                                    }
                                }
                                saveFS();
                                renderFileList(currentPath);
                            }
                        }
                        input.addEventListener('blur', finishRename);
                        input.addEventListener('keydown', finishRename);
                    } else if (action === 'delete' && item && idx !== null) {
                        function deleteConfirmationBox(message, onConfirm, onCancel) {
                            // Remove any existing box
                            const existing = document.getElementById('delete-confirmation-box');
                            if (existing) existing.remove();

                            const boxDiv = document.createElement('div');
                            boxDiv.id = 'finder-delete-dialog-overlay';
                            boxDiv.style.cssText = `
                                position: fixed;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(0, 0, 0, 0.5);
                                z-index: 1000;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                transform: none;
                            `;
                            boxDiv.innerHTML = `
                                <div class='finder-delete-dialog-box'>
                                    <div style="margin-bottom: 0.7em;">
                                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Warning" style="width:48px;height:48px;"/>
                                    </div>
                                    <div class='finder-delete-dialog-message'>${message}</div>
                                    <button class='finder-delete-dialog-delete' id="delete-confirmation-box-ok">Delete</button>
                                    <button class='finder-delete-dialog-cancel' id="delete-confirmation-box-cancel">Cancel</button>
                                </div>
                            `;
                            document.body.appendChild(boxDiv);

                            document.getElementById('delete-confirmation-box-ok').onclick = () => {
                                boxDiv.remove();
                                if (onConfirm) onConfirm();
                            };
                            document.getElementById('delete-confirmation-box-cancel').onclick = () => {
                                boxDiv.remove();
                                if (onCancel) onCancel();
                            };
                        }

                        deleteConfirmationBox(
                            `Are you sure you want to delete <b>${item.name}</b>?`,
                            () => {
                                if (item.type === 'folder') {
                                    const folderPath = currentPath === '/' ? `/${item.name}` : `${currentPath}/${item.name}`;
                                    Object.keys(fakeFS).forEach(k => {
                                        if (k === folderPath || k.startsWith(folderPath + '/')) delete fakeFS[k];
                                    });
                                }
                                fakeFS[currentPath].splice(idx, 1);
                                saveFS();
                                renderFileList(currentPath);
                            },
                            () => {
                                // Cancelled, do nothing
                            }
                        );
                    } else if (action === 'download' && item && item.type === 'file') {
                        const blob = new Blob([`This is a fake file: ${item.name}`], {type: 'text/plain'});
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = item.name;
                        a.click();
                    } else if (action === 'new-folder') {
                        const folderName = 'New Folder';
                        let baseName = folderName;
                        let i = 1;
                        // Find unique name by appending number if needed
                        while (fakeFS[currentPath].some(f => f.name === baseName && f.type === 'folder')) {
                            baseName = `${folderName} ${i++}`;
                        }
                        fakeFS[currentPath].push({ name: baseName, type: 'folder' });
                        fakeFS[currentPath === '/' ? `/${baseName}` : `${currentPath}/${baseName}`] = [];
                        saveFS();
                        renderFileList(currentPath, baseName, 'folder');
                    } else if (action === 'upload') {
                        const input = document.querySelector('.finder-upload-input');
                        input.value = '';
                        input.onchange = async () => {
                            await handleUploadInput(input.files);
                        };
                        input.click();
                    } else if (action === 'refresh') {
                        renderFileList(currentPath);
                    }
                    if (finderDropdownMenu) finderDropdownMenu.remove();
                };
            });
            setTimeout(() => {
                document.addEventListener('mousedown', hideFinderDropdownMenu, { once: true });
            }, 0);
        }
        function hideFinderDropdownMenu(e) {
            if (finderDropdownMenu) {
                finderDropdownMenu.remove();
                finderDropdownMenu = null;
            }
        }

        async function handleUploadInput(fileList) {
            // Accepts FileList from input[type=file] (can be files or folders)
            for (let file of fileList) {
                // For folder upload, file.webkitRelativePath is set
                let relPath = file.webkitRelativePath || file.name;
                let parts = relPath.split('/').filter(Boolean);
                let parent = currentPath;
                for (let i = 0; i < parts.length - 1; i++) {
                    let folder = parts[i];
                    let folderPath = parent === '/' ? `/${folder}` : `${parent}/${folder}`;
                    if (!fakeFS[parent].some(f => f.name === folder && f.type === 'folder')) {
                        fakeFS[parent].push({ name: folder, type: 'folder' });
                        fakeFS[folderPath] = [];
                    }
                    parent = folderPath;
                }
                // Add file
                let fname = parts[parts.length - 1];
                if (!fakeFS[parent].some(f => f.name === fname && f.type === 'file')) {
                    fakeFS[parent].push({ name: fname, type: 'file' });
                }
            }
            saveFS();
            renderFileList(currentPath);
        }

        setTimeout(() => {
            document.querySelectorAll('.finder-sidebar li').forEach(li => {
                li.onclick = function() {
                    document.querySelectorAll('.finder-sidebar li').forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    renderFileList(this.dataset.path);
                };
            });
            renderFileList('/');
        }, 100);

        setTimeout(() => {
            const fileListDiv = document.getElementById('finder-file-list');
            const dropOverlay = document.getElementById('finder-drop-overlay');
            fileListDiv.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropOverlay.style.display = 'flex';
            });
            fileListDiv.addEventListener('dragleave', (e) => {
                dropOverlay.style.display = 'none';
            });
            fileListDiv.addEventListener('drop', async (e) => {
                e.preventDefault();
                dropOverlay.style.display = 'none';
                const items = e.dataTransfer.items;
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item.kind === 'file') {
                        const entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
                        if (entry && entry.isDirectory) {
                            await readDirectory(entry, currentPath);
                        } else if (entry && entry.isFile) {
                            if (!fakeFS[currentPath]) fakeFS[currentPath] = [];
                            fakeFS[currentPath].push({ name: entry.name, type: 'file' });
                        }
                    }
                }
                saveFS();
                renderFileList(currentPath);
            });
        }, 100);

        async function readDirectory(entry, parentPath) {
            return new Promise((resolve) => {
                const reader = entry.createReader();
                reader.readEntries(async (entries) => {
                    const folderName = entry.name;
                    const folderPath = parentPath === '/' ? `/${folderName}` : `${parentPath}/${folderName}`;
                    if (!fakeFS[folderPath]) fakeFS[folderPath] = [];
                    if (!fakeFS[parentPath].some(f => f.name === folderName && f.type === 'folder')) {
                        fakeFS[parentPath].push({ name: folderName, type: 'folder' });
                    }
                    for (const ent of entries) {
                        if (ent.isDirectory) {
                            await readDirectory(ent, folderPath);
                        } else if (ent.isFile) {
                            await new Promise((res) => {
                                ent.file((file) => {
                                    fakeFS[folderPath].push({ name: file.name, type: 'file' });
                                    res();
                                });
                            });
                        }
                    }
                    saveFS();
                    resolve();
                });
            });
        }

        setTimeout(() => {
            const finder = document.querySelector('.finder-content');
            const finderFileList = document.getElementById('finder-file-list')
            // Prevent default context menu always
            finder.addEventListener('contextmenu', (e) => {
            // Always prevent default browser context menu
            e.preventDefault();
            // Only show custom menu if right-clicked on empty space
            if (e.target === finder || e.target === finderFileList) {
                showFinderDropdownMenu(e.clientX, e.clientY, null, null, false);
            }
            });
        }, 100);

        setInterval(() => setupDraggable('finder'), 1)

        localStorage.setItem('currentFocus', 'Finder')
        document.querySelector('.currently-focused-instance-name').textContent = localStorage.getItem('currentFocus');
    } else if (name == 'safari' && localStorage.getItem('safariMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window safari-window">
                <div class="window-top-bar safari-window-top-bar">
                    <button class="window-top-bar-button safari-window-top-bar-button close" style="margin-left: 20px;"></button>
                    <button class="window-top-bar-button safari-window-top-bar-button minimize"></button>
                    <button class="window-top-bar-button safari-window-top-bar-button expand"></button>
                </div>
                <div class="safari-url-bar">
                    <input type="text" class="safari-url-input" value="https://example.com" />
                    <button class="safari-go-btn">Go</button>
                    <button class="safari-refresh-btn" title="Refresh">⟳</button>
                </div>
                <div class="safari-iframe-container">
                    <iframe class="safari-iframe" src="https://example.com" width="100%" height="100%" frameborder="0"></iframe>
                    <div class="safari-iframe-error"></div>
                </div>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.safari-window .safari-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.safari-window .safari-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.safari-window .safari-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('safari-window', 'safariMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('safari-window', 'safariMinimized', 'Safari');
            if (expandBtn) expandBtn.onclick = () => handleExpand('safari-window', 'safariMinimized');
        }, 50);

        // Safari URL bar logic
        const urlInput = document.querySelector('.safari-url-input');
        const goBtn = document.querySelector('.safari-go-btn');
        const refreshBtn = document.querySelector('.safari-refresh-btn');
        const iframe = document.querySelector('.safari-iframe');
        const errorDiv = document.querySelector('.safari-iframe-error');
        let lastURL = urlInput.value.trim();

        function loadSafariURL(forceReload = false) {
            let url = urlInput.value.trim();
            if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
            // Hide error overlay
            errorDiv.style.display = 'none';
            iframe.style.display = '';
            iframe.src = url;
            lastURL = url;
        }
        goBtn.onclick = () => loadSafariURL();
        urlInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') loadSafariURL();
        });
        refreshBtn.onclick = () => {
            // Reload current iframe src
            if (iframe.src) {
                // Force reload by resetting src
                let src = iframe.src;
                iframe.src = '';
                setTimeout(() => { iframe.src = src; }, 10);
            } else {
                loadSafariURL(true);
            }
            errorDiv.style.display = 'none';
        };
        // Handle iframe load errors (X-Frame-Options/CSP)
        iframe.onload = function() {
            // Try to detect if the site loaded, but can't access cross-origin content
            setTimeout(() => {
                try {
                    // If we can access contentDocument, it's loaded and embeddable
                    let _ = iframe.contentDocument;
                    errorDiv.style.display = 'none';
                    iframe.style.display = '';
                } catch (e) {
                    // If error, likely due to cross-origin, but still loaded
                    errorDiv.style.display = 'none';
                    iframe.style.display = '';
                }
            }, 200);
        };
        iframe.onerror = function() {
            showIframeError(lastURL);
        };
        // Fallback: after 1s, if iframe is blank, show error for known blocked sites
        iframe.addEventListener('load', function() {
            setTimeout(() => {
                // Try to detect blocked sites (YouTube, Google, etc.)
                const blockedSites = [
                    'youtube.com', 'accounts.google.com', 'facebook.com', 'instagram.com', 'twitter.com', 'tiktok.com', 'netflix.com', 'linkedin.com', 'github.com', 'paypal.com', 'dropbox.com', 'discord.com', 'openai.com', 'chat.openai.com', 'vercel.com', 'amazon.com', 'apple.com', 'microsoft.com', 'outlook.com', 'office.com', 'drive.google.com', 'docs.google.com', 'mail.google.com', 'zoom.us', 'slack.com', 'figma.com', 'notion.so', 'medium.com', 'reddit.com', 'quora.com', 'pinterest.com', 'tumblr.com', 'soundcloud.com', 'spotify.com', 'deezer.com', 'icloud.com', 'yahoo.com', 'duckduckgo.com', 'bing.com', 'baidu.com', 'aliexpress.com', 'ebay.com', 'booking.com', 'airbnb.com', 'uber.com', 'lyft.com', 'doordash.com', 'grubhub.com', 'coursera.org', 'edx.org', 'khanacademy.org', 'udemy.com', 'udacity.com', 'pluralsight.com', 'codecademy.com', 'stackoverflow.com', 'wikipedia.org', 'imdb.com', 'rottentomatoes.com', 'espn.com', 'bbc.com', 'cnn.com', 'nytimes.com', 'washingtonpost.com', 'theguardian.com', 'forbes.com', 'bloomberg.com', 'wsj.com', 'ft.com', 'reuters.com', 'cnbc.com', 'foxnews.com', 'nbcnews.com', 'abcnews.go.com', 'news.google.com', 'news.yahoo.com', 'news.bbc.co.uk', 'news.sky.com', 'news.com.au', 'cbc.ca', 'globalnews.ca', 'ctvnews.ca', 'aljazeera.com', 'dw.com', 'france24.com', 'lemonde.fr', 'spiegel.de', 'zeit.de', 'elpais.com', 'elmundo.es', 'corriere.it', 'repubblica.it', 'lefigaro.fr', 'liberation.fr', 'marca.com', 'as.com', 'livescore.com', 'goal.com', 'transfermarkt.com', 'espncricinfo.com', 'nba.com', 'nfl.com', 'mlb.com', 'nhl.com', 'fifa.com', 'uefa.com', 'olympics.com', 'formula1.com', 'motogp.com', 'nascar.com', 'indycar.com', 'wrc.com', 'motorsport.com', 'cyclingnews.com', 'velonews.com', 'procyclingstats.com', 'cyclingweekly.com', 'bikeradar.com', 'pinkbike.com', 'mtbr.com', 'singletracks.com', 'bicycling.com', 'road.cc', 'youtube.com', 'youtu.be'
                ];
                let url = urlInput.value.trim();
                let isBlocked = blockedSites.some(domain => url.includes(domain));
                // Only show error for known blocked domains
                if (isBlocked) {
                    showIframeError(url);
                } else {
                    errorDiv.style.display = 'none';
                    iframe.style.display = '';
                }
            }, 1000);
        });
        function showIframeError(url) {
            errorDiv.innerHTML = `<div style="max-width:420px;margin:0 auto;">
                <div style="font-size:2.2em;margin-bottom:0.5em;">🚫</div>
                <div style="margin-bottom:1em;">This site cannot be displayed in Safari because it prevents embedding in other apps.<br><br><b>URL:</b> <span style='word-break:break-all;'>${url}</span></div>
                <button style="background:#0078d4;color:#fff;border:none;border-radius:7px;padding:8px 28px;font-size:1em;cursor:pointer;" onclick="window.open('${url.replace(/'/g, '')}','_blank')">Open in New Tab</button>
            </div>`;
            errorDiv.style.display = 'flex';
            iframe.style.display = 'none';
        }

        setInterval(() => setupDraggable('safari'), 1)

        localStorage.setItem('currentFocus', 'Safari')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'vscode' && localStorage.getItem('vscodeMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window vscode-window">
            <div class="window-top-bar vscode-window-top-bar">
                <button class="window-top-bar-button vscode-window-top-bar-button close" style="margin-left: 20px;"></button>
                <button class="window-top-bar-button vscode-window-top-bar-button minimize"></button>
                <button class="window-top-bar-button vscode-window-top-bar-button expand"></button>
            </div>
            <iframe src="https://stackblitz.com/github/raedhashmi/macsimulation?embed=1&file=README.md&hideNavigation=1&theme=dark&view=editor" width="100%" height="100%" frameborder="0"></iframe>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.vscode-window .vscode-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.vscode-window .vscode-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.vscode-window .vscode-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('vscode-window', 'vscodeMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('vscode-window', 'vscodeMinimized', 'VSCode');
            if (expandBtn) expandBtn.onclick = () => handleExpand('vscode-window', 'vscodeMinimized');
        }, 50);

        setInterval(() => setupDraggable('vscode'), 1)

        localStorage.setItem('currentFocus', 'VSCode')
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'calculator' && localStorage.getItem('calculatorMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window calculator-window">
                <div class="window-top-bar calculator-window-top-bar">
                    <button class="window-top-bar-button calculator-window-top-bar-button close" style="margin-left: 20px;"></button>
                    <button class="window-top-bar-button calculator-window-top-bar-button minimize"></button>
                    <button class="window-top-bar-button calculator-window-top-bar-button expand"></button>
                </div>
                <div class="calculator-body">
                    <div class="calculator-display" id="calculator-display">0</div>
                    <div class="calculator-buttons">
                        <button class="calc-btn" data-value="C">C</button>
                        <button class="calc-btn" data-value="/">÷</button>
                        <button class="calc-btn" data-value="*">×</button>
                        <button class="calc-btn" data-value="back">⌫</button>
                        <button class="calc-btn" data-value="7">7</button>
                        <button class="calc-btn" data-value="8">8</button>
                        <button class="calc-btn" data-value="9">9</button>
                        <button class="calc-btn" data-value="-">−</button>
                        <button class="calc-btn" data-value="4">4</button>
                        <button class="calc-btn" data-value="5">5</button>
                        <button class="calc-btn" data-value="6">6</button>
                        <button class="calc-btn" data-value="+">+</button>
                        <button class="calc-btn" data-value="1">1</button>
                        <button class="calc-btn" data-value="2">2</button>
                        <button class="calc-btn" data-value="3">3</button>
                        <button class="calc-btn equal" data-value="=">=</button>
                        <button class="calc-btn zero" data-value="0">0</button>
                        <button class="calc-btn" data-value=".">.</button>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.calculator-window .calculator-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.calculator-window .calculator-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.calculator-window .calculator-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('calculator-window', 'calculatorMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('calculator-window', 'calculatorMinimized', 'Calculator');
            if (expandBtn) expandBtn.onclick = () => handleExpand('calculator-window', 'calculatorMinimized');
        
            const display = document.getElementById('calculator-display');
            const buttons = document.querySelectorAll('.calculator-buttons .calc-btn');
            let current = '0';
            let operator = null;
            let operand = null;
            let resetNext = false;
            function updateDisplay() {
                display.textContent = current;
            }
            buttons.forEach(btn => {
                btn.onclick = () => {
                    const val = btn.dataset.value;
                    if (val === 'C') {
                        current = '0'; operator = null; operand = null; resetNext = false;
                    } else if (val === 'back') {
                        if (current.length > 1) current = current.slice(0, -1);
                        else current = '0';
                    } else if ('+-*/'.includes(val)) {
                        if (operator && !resetNext) {
                            current = String(eval(operand + operator + current));
                        }
                        operator = val;
                        operand = current;
                        resetNext = true;
                    } else if (val === '=') {
                        if (operator) {
                            current = String(eval(operand + operator + current));
                            operator = null; operand = null;
                        }
                        resetNext = true;
                    } else if (val === '.') {
                        if (!current.includes('.')) current += '.';
                    } else {
                        if (current === '0' || resetNext) current = val;
                        else current += val;
                        resetNext = false;
                    }
                    updateDisplay();
                };
            });
            updateDisplay();
        }, 50);

        setInterval(() => setupDraggable('calculator'), 1)

        localStorage.setItem('currentFocus', 'Calculator');
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'ultragpt' && localStorage.getItem('ultragptMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window ultragpt-window">
                <div class="window-top-bar ultragpt-window-top-bar">
                    <button class="window-top-bar-button ultragpt-window-top-bar-button close" style="margin-left: 20px;"></button>
                    <button class="window-top-bar-button ultragpt-window-top-bar-button minimize"></button>
                    <button class="window-top-bar-button ultragpt-window-top-bar-button expand"></button>
                </div>
                <iframe class='ultragpt-iframe' src="https://ultragpt-rust.vercel.app/" style='height: 100%; width: 100%;' frameborder="0"></iframe>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.ultragpt-window .ultragpt-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.ultragpt-window .ultragpt-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.ultragpt-window .ultragpt-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('ultragpt-window', 'ultragptMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('ultragpt-window', 'ultragptMinimized', 'UltraGPT');
            if (expandBtn) expandBtn.onclick = () => handleExpand('ultragpt-window', 'ultragptMinimized');
        }, 50);

        setInterval(() => setupDraggable('ultragpt'), 1);

        localStorage.setItem('currentFocus', 'UltraGPT');
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'reminders' && localStorage.getItem('remindersMinimized') != 'true') {
        windowsSection.innerHTML += `
            <div class="window reminders-window">
                <div class="window-top-bar reminders-window-top-bar">
                    <button class="window-top-bar-button reminders-window-top-bar-button close" style="margin-left: 20px;"></button>
                    <button class="window-top-bar-button reminders-window-top-bar-button minimize"></button>
                    <button class="window-top-bar-button reminders-window-top-bar-button expand"></button>
                </div>

                <div class="reminders-body">
                    <div class="reminders-list" id="reminders-list"></div>
                    <div class="reminders-add-bar">
                        <input type="text" id="reminder-input" placeholder="Add a reminder..." />
                        <button id="add-reminder-btn">Add</button>
                    </div>
                </div>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.reminders-window .reminders-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.reminders-window .reminders-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.reminders-window .reminders-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('reminders-window', 'remindersMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('reminders-window', 'remindersMinimized', 'reminders');
            if (expandBtn) expandBtn.onclick = () => handleExpand('reminders-window', 'remindersMinimized');

            // Reminders logic
            const remindersKey = 'reminders-list';
            let reminders = JSON.parse(localStorage.getItem(remindersKey)) || [];
            const listDiv = document.getElementById('reminders-list');
            const input = document.getElementById('reminder-input');
            const addBtn = document.getElementById('add-reminder-btn');

            function renderReminders() {
                listDiv.innerHTML = '';
                if (reminders.length === 0) {
                    listDiv.innerHTML = '<div style="color:#aaa;text-align:center;margin-top:40px;">No reminders yet.</div>';
                    return;
                }
                reminders.forEach((rem, idx) => {
                    const item = document.createElement('div');
                    item.className = 'reminder-item' + (rem.completed ? ' completed' : '');
                    item.innerHTML = `
                        <span style="flex:1;cursor:pointer;">${rem.text}</span>
                        <button class="reminder-delete" title="Delete">✕</button>
                    `;
                    // Toggle complete on click
                    item.querySelector('span').onclick = () => {
                        reminders[idx].completed = !reminders[idx].completed;
                        saveReminders();
                        renderReminders();
                    };
                    // Delete
                    item.querySelector('.reminder-delete').onclick = () => {
                        reminders.splice(idx, 1);
                        saveReminders();
                        renderReminders();
                    };
                    listDiv.appendChild(item);
                });
            }
            function saveReminders() {
                localStorage.setItem(remindersKey, JSON.stringify(reminders));
            }
            addBtn.onclick = () => {
                const val = input.value.trim();
                if (val) {
                    reminders.push({ text: val, completed: false });
                    saveReminders();
                    renderReminders();
                    input.value = '';
                    input.focus();
                }
            };
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter') addBtn.onclick();
            });
            renderReminders();
        }, 50);

        setInterval(() => setupDraggable('reminders'), 1);

        localStorage.setItem('currentFocus', 'Reminders');
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else if (name == 'settings' && localStorage.getItem('settingsMinimized') != 'true') {
        const username = localStorage.getItem('account-username') || 'User 1';
        windowsSection.innerHTML += `
            <div class="window settings-window">
            <div class="window-top-bar settings-window-top-bar">
                <button class="window-top-bar-button settings-window-top-bar-button close" style="margin-left: 20px;"></button>
                <button class="window-top-bar-button settings-window-top-bar-button minimize"></button>
                <button class="window-top-bar-button settings-window-top-bar-button expand"></button>
            </div>
            <div class="settings-body">
                <nav class="settings-sidebar">
                <ul>
                    <li class="active" data-section="users"><img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Profile" style="width:24px; height:24px"/> <span>${username}</span></li>
                    <hr style="border: none; border-bottom: 1px solid #232323; margin: 12px 12px 12px 12px;" />
                    <li data-section="about"><img src="resources/appleLightVersion.png" alt="About" style="width:24px; height:24px"/> <span>About This Mac</span></li>
                    <li data-section="general"><img src="https://cdn-icons-png.flaticon.com/512/2040/2040504.png" alt="General" style="width:24px; height:24px"/> <span>General</span></li>
                    <li data-section="battery"><img src="https://cdn-icons-png.flaticon.com/512/664/664883.png" alt="Battery" style="width:24px; height:24px"/> <span>Battery</span></li>
                </ul>
                </nav>
                <main class="settings-content">
                    <div class="settings-section" id="users-section">
                        <h2>${username}</h2>
                        <div class="user-profile">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Profile" class="user-profile-img"/>
                            <div class="user-profile-info">
                                <h3>${username}</h3>
                                <p>Administrator</p>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="settings-button" id="edit-profile-btn">Edit Profile</button>
                            <button class="settings-button" id="change-password-btn">Change Password</button>
                        </div>
                    </div>
                    <div class="settings-section" id="about-section" style="display:none">
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
                </main>
            </div>
            </div>
        `;

        // Attach event listeners to the buttons
        setTimeout(() => {
            const closeBtn = document.querySelector('.settings-window .settings-window-top-bar-button.close');
            const minimizeBtn = document.querySelector('.settings-window .settings-window-top-bar-button.minimize');
            const expandBtn = document.querySelector('.settings-window .settings-window-top-bar-button.expand');
            if (closeBtn) closeBtn.onclick = () => handleClose('settings-window', 'settingsMinimized');
            if (minimizeBtn) minimizeBtn.onclick = () => handleMinimize('settings-window', 'settingsMinimized', 'Settings');
            if (expandBtn) expandBtn.onclick = () => handleExpand('settings-window', 'settingsMinimized');
        }, 50);

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

            // Edit Profile button logic
            const editBtn = document.getElementById('edit-profile-btn');
            if (editBtn) {
                editBtn.onclick = function() {
                    const userSection = document.getElementById('users-section');
                    userSection.innerHTML = `
                        <h2>Edit Profile</h2>
                        <div class="user-profile">
                            <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Profile" class="user-profile-img"/>
                            <div class="user-profile-info">
                                <input type="text" id="edit-username-input" value="${username}" class="settings-modal-field" style="font-size:16px; padding:8px; border-radius:6px; border:1px solid #3a3a3c; background:#1c1c1e; color:white;" />
                                <p>Administrator</p>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="settings-button" id="save-username-btn">Save</button>
                            <button class="settings-button" id="cancel-edit-btn">Cancel</button>
                        </div>
                    `;
                    document.getElementById('save-username-btn').onclick = function() {
                        const newName = document.getElementById('edit-username-input').value.trim();
                        if (newName) {
                            localStorage.setItem('account-username', newName);
                            openApp('settings');
                        }
                    };
                    document.getElementById('cancel-edit-btn').onclick = function() {
                        openApp('settings');
                    };
                };
            }
            // Change Password button logic
            const passBtn = document.getElementById('change-password-btn');
            if (passBtn) {
                passBtn.onclick = function() {
                    const userSection = document.getElementById('users-section');
                    userSection.innerHTML = `
                        <h2>Change Password</h2>
                        <div class="settings-modal-field">
                            <label>New Password</label>
                            <input type="password" id="new-password-input" class="settings-modal-field" style="font-size:16px; padding:8px; border-radius:6px; border:1px solid #3a3a3c; background:#1c1c1e; color:white;" />
                            <label>Confirm Password</label>
                            <input type="password" id="confirm-password-input" class="settings-modal-field" style="font-size:16px; padding:8px; border-radius:6px; border:1px solid #3a3a3c; background:#1c1c1e; color:white;" />
                            <div id="password-error" class="settings-modal-error" style="display:none; color:red; margin-top:10px;">Passwords do not match.</div>
                        </div>
                        <div class="user-actions">
                            <button class="settings-button" id="save-password-btn">Save</button>
                            <button class="settings-button" id="cancel-password-btn">Cancel</button>
                        </div>
                    `;
                    document.getElementById('save-password-btn').onclick = function() {
                        const newPass = document.getElementById('new-password-input').value;
                        const confirmPass = document.getElementById('confirm-password-input').value;
                        if (newPass && newPass === confirmPass) {
                            localStorage.setItem('account-password', newPass);
                            openApp('settings');
                        } else {
                            document.getElementById('password-error').style.display = 'block';
                        }
                    };
                    document.getElementById('cancel-password-btn').onclick = function() {
                        openApp('settings');
                    };
                };
            }
        }, 100);

        setInterval(() => setupDraggable('settings'), 1);

        localStorage.setItem('currentFocus', 'Settings');
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus');
    } else {
        document.querySelector('.window').style.animation = 'fadeIn 0.1s ease-in-out'
        document.querySelector('.window').hidden = false;
        document.querySelector(".currently-focused-instance-name").textContent = localStorage.getItem('currentFocus')
    }
}