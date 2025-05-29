// Sample app data
let apps = [
  {
    id: 1,
    name: "Visual Studio Code",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
    path: "C:/Program Files/Microsoft VS Code/Code.exe",
    category: "development",
    pinned: false,
    favorite: false,
    usageCount: 15,
    dateAdded: new Date(2023, 1, 15).getTime(),
  },
  {
    id: 2,
    name: "Chrome",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
    path: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    category: "productivity",
    pinned: true,
    favorite: true,
    usageCount: 42,
    dateAdded: new Date(2023, 0, 5).getTime(),
  },
  {
    id: 3,
    name: "Spotify",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    path: "C:/Users/AppData/Roaming/Spotify/Spotify.exe",
    category: "media",
    pinned: false,
    favorite: false,
    usageCount: 28,
    dateAdded: new Date(2023, 2, 20).getTime(),
  },
  {
    id: 4,
    name: "Discord",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/9a/Discord_logo.svg",
    path: "C:/Users/AppData/Local/Discord/app-1.0.9003/Discord.exe",
    category: "social",
    pinned: true,
    favorite: true,
    usageCount: 35,
    dateAdded: new Date(2023, 3, 10).getTime(),
  },
  {
    id: 5,
    name: "Steam",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    path: "C:/Program Files (x86)/Steam/steam.exe",
    category: "games",
    pinned: false,
    favorite: false,
    usageCount: 20,
    dateAdded: new Date(2023, 4, 5).getTime(),
  },
  {
    id: 6,
    name: "Photoshop",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    path: "C:/Program Files/Adobe/Adobe Photoshop 2022/Photoshop.exe",
    category: "productivity",
    pinned: false,
    favorite: false,
    usageCount: 8,
    dateAdded: new Date(2023, 5, 15).getTime(),
  },
  {
    id: 7,
    name: "Microsoft Word",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
    path: "C:/Program Files/Microsoft Office/root/Office16/WINWORD.EXE",
    category: "productivity",
    pinned: false,
    favorite: false,
    usageCount: 12,
    dateAdded: new Date(2023, 6, 20).getTime(),
  },
  {
    id: 8,
    name: "OBS Studio",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/14/Open_Broadcaster_Software_Logo.png",
    path: "C:/Program Files/obs-studio/bin/64bit/obs64.exe",
    category: "utilities",
    pinned: false,
    favorite: false,
    usageCount: 5,
    dateAdded: new Date(2023, 7, 10).getTime(),
  },
];

// Function to render app cards
function renderApps() {
  const appGrid = document.getElementById("app-grid");
  const noResults = document.getElementById("no-results");
  if (!appGrid || !noResults) return;

  appGrid.innerHTML = "";

  // Get current view from sidebar
  const currentView =
    document
      .querySelector(".sidebar > div > div.active")
      ?.getAttribute("data-view") || "home";

  // Get search term
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput?.value.toLowerCase() || "";

  // Get active category
  const activeCategory =
    document
      .querySelector("#category-tabs .active")
      ?.getAttribute("data-category") || "all";

  // Filter apps based on search, category, and view
  const filteredApps = apps.filter((app) => {
    // Text search filter
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm) ||
      app.path.toLowerCase().includes(searchTerm);

    // Category filter
    const matchesCategory =
      activeCategory === "all" || app.category === activeCategory;

    // View-specific filtering
    let matchesView = true;
    if (currentView === "favorites") {
      matchesView = app.favorite;
    } else if (currentView === "most-used") {
      // No additional filtering for most-used, we'll sort later
      matchesView = true;
    }

    return matchesSearch && matchesCategory && matchesView;
  });

  // Sort by usage count if in most-used view
  if (currentView === "most-used") {
    filteredApps.sort((a, b) => b.usageCount - a.usageCount);
  }

  // Show no results message if needed
  if (filteredApps.length === 0) {
    appGrid.classList.add("hidden");
    noResults.classList.remove("hidden");
  } else {
    appGrid.classList.remove("hidden");
    noResults.classList.add("hidden");

    // Render the filtered apps
    filteredApps.forEach((app) => {
      const appCard = document.createElement("div");
      appCard.className =
        "app-card bg-[#0a0a0a] rounded-lg p-4 flex flex-col items-center relative border border-[#27282d] transition-all";

      appCard.setAttribute("draggable", "true");
      appCard.setAttribute("data-id", app.id.toString());

      // Pin button icon - filled if pinned, outline if not
      const pinIconSvg = app.pinned
        ? '<img src="icons/icons8-pinned-50.png" class="w-10 h-10 p-2 "/>'
        : '<img src="icons/icons8-pin-75.png" class="w-10 h-10 p-2 "/>';

      // Favorite icon - filled if favorite, outline if not
      const favoriteIconSvg = app.favorite
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>';

      appCard.innerHTML = `
  <div class="app-menu-container absolute top-2 right-2 z-10">
    <button class="app-menu-button  border-none text-gray-400 w-5 h-5 p-4 bg-[#000] rounded-full flex justify-center cursor-pointer items-center cursor-pointer text-xl">⋮</button>
    <div class="app-menu hidden absolute right-0 top-8 bg-[#27282d] border border-[#27282d] rounded-md shadow-lg z-20 w-32">
      <button class="app-favorite-btn w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1d1d1d] flex items-center gap-2" data-id="${
        app.id
      }">
        ${favoriteIconSvg}
        <span>${app.favorite ? "Unfavorite" : "Favorite"}</span>
      </button>
      <button class="app-remove-btn w-full text-left px-3 py-2 text-sm text-white hover:bg-[#1d1d1d] flex items-center gap-2" data-id="${
        app.id
      }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        <span>Remove</span>
      </button>
    </div>
  </div>
  <button class="app-pin absolute top-2 left-2 bg-transparent border-none text-blue-500 cursor-pointer transition-colors z-10 ${
    app.pinned ? "text-blue-500" : "text-gray-400"
  }" data-id="${app.id}">${pinIconSvg}</button>
  <div class="w-16 h-16 mx-auto mb-3 flex items-center truncate justify-center">
    <img src="${app.iconUrl}" alt="${
        app.name
      }" class="max-w-full max-h-full" onerror="this.src='icons/icons8-windows-os-48.png';">
  </div>
  <h3 class="font-semibold mb-1 text-center truncate  overflow-hidden text-ellipsis block max-w-[8rem] text-white text-base">${
    app.name
  }</h3>
  <div class="text-xs text-gray-400 mb-1 truncate w-full text-center">${app.path
    .split("/")
    .pop()}</div>
  <div class="text-xs text-gray-400 mb-3 text-center">Used ${
    app.usageCount
  } times</div>
  <button class="launch-button bg-transparent border border-[#1d1d1d] rounded-md py-2 px-3 text-white text-sm cursor-pointer font-light w-full max-w-fit text-center hover:border-[#00371b] hover:bg-[#00371b] transition duration-300 ease-in-out" data-id="${
    app.id
  }">Launch</button>
`;
      appGrid.appendChild(appCard);
    });
  }

  // Add event listeners after DOM elements are created
  addEventListeners();
}

// Function to add all event listeners
function addEventListeners() {
  // Add event listeners for launch buttons
  document.querySelectorAll(".launch-button").forEach((button) => {
    button.addEventListener("click", function () {
      const appId = Number.parseInt(this.getAttribute("data-id") || "0");
      launchApp(appId);
    });
  });

  // Add event listeners for pin buttons
  document.querySelectorAll(".app-pin").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const appId = Number.parseInt(this.getAttribute("data-id") || "0");
      togglePinApp(appId);
    });
  });

  // Add event listeners for app menu buttons
  document.querySelectorAll(".app-menu-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();

      // Close all other menus first
      document.querySelectorAll(".app-menu").forEach((menu) => {
        if (menu !== button.nextElementSibling) {
          menu.classList.add("hidden");
        }
      });

      // Toggle this menu
      const menu = button.nextElementSibling;
      menu.classList.toggle("hidden");
    });
  });

  // Add event listeners for favorite buttons
  document.querySelectorAll(".app-favorite-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const appId = Number.parseInt(this.getAttribute("data-id") || "0");
      toggleFavoriteApp(appId);

      // Hide the menu after action
      this.closest(".app-menu").classList.add("hidden");
    });
  });

  // Add event listeners for remove buttons
  document.querySelectorAll(".app-remove-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation();
      const appId = Number.parseInt(this.getAttribute("data-id") || "0");
      removeApp(appId);

      // Hide the menu after action
      this.closest(".app-menu").classList.add("hidden");
    });
  });

  // Add drag and drop event listeners
  document.querySelectorAll(".app-card").forEach((card) => {
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragover", handleDragOver);
    card.addEventListener("dragleave", handleDragLeave);
    card.addEventListener("drop", handleDrop);
    card.addEventListener("dragend", handleDragEnd);
  });

  // Close menus when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".app-menu-container")) {
      document.querySelectorAll(".app-menu").forEach((menu) => {
        menu.classList.add("hidden");
      });
    }
  });
}

// Function to toggle favorite status
function toggleFavoriteApp(appId) {
  const app = apps.find((a) => a.id === appId);
  if (app) {
    app.favorite = !app.favorite;

    // Save to localStorage
    saveAppData();

    // Re-render apps
    renderApps();
  }
}

// Function to remove an app
function removeApp(appId) {
  // Ask for confirmation
  if (confirm("Are you sure you want to remove this app?")) {
    // Find the app index
    const appIndex = apps.findIndex((a) => a.id === appId);

    if (appIndex !== -1) {
      // Remove the app from the array
      apps.splice(appIndex, 1);

      // Save to localStorage
      saveAppData();

      // Re-render apps and pinned apps
      renderApps();
      renderPinnedApps();
    }
  }
}

// Function to render pinned apps in sidebar
function renderPinnedApps() {
  const pinnedAppsContainer = document.getElementById("pinned-apps-container");
  if (!pinnedAppsContainer) return;

  pinnedAppsContainer.innerHTML = "";

  const pinnedApps = apps.filter((app) => app.pinned);

  if (pinnedApps.length === 0) {
    const emptyMessage = document.createElement("div");
    emptyMessage.className = "px-4 text-xs text-gray-500";
    emptyMessage.textContent = "No pinned apps";
    pinnedAppsContainer.appendChild(emptyMessage);
    return;
  }

  pinnedApps.forEach((app) => {
    const pinnedApp = document.createElement("div");
    pinnedApp.className =
      "flex items-center p-2 mx-2 my-1 text-white rounded cursor-pointer hover:bg-[#1d1d1d]";
    pinnedApp.setAttribute("data-id", app.id.toString());
    pinnedApp.innerHTML = `
      <div class="w-6 h-6 mr-3 rounded-md overflow-hidden">
        <img src="${app.iconUrl}" alt="${app.name}" onerror="this.src='icons/icons8-windows-os-48.png';">
      </div>
      <span class="truncate text-xs overflow-hidden text-ellipsis block max-w-[8rem]">${app.name}</span>
    `;

    pinnedApp.addEventListener("click", function () {
      const appId = Number.parseInt(this.getAttribute("data-id") || "0");
      launchApp(appId);
    });

    pinnedAppsContainer.appendChild(pinnedApp);
  });
}

// Function to launch an app
function launchApp(appId) {
  const app = apps.find((a) => a.id === appId);
  if (app) {
    // Increment usage count
    app.usageCount = (app.usageCount || 0) + 1;

    // Save to localStorage
    saveAppData();

    // In a real app, you would use Electron or another method to launch the actual application
    console.log(`Launching ${app.name} from path: ${app.path}`);
    alert(`Launching ${app.name} (Used ${app.usageCount} times)`);

    // Re-render to update usage stats
    renderApps();
  }
}

// Function to toggle pin status
function togglePinApp(appId) {
  const app = apps.find((a) => a.id === appId);
  if (app) {
    app.pinned = !app.pinned;

    // Save to localStorage
    saveAppData();

    // Re-render apps and pinned apps
    renderApps();
    renderPinnedApps();
  }
}

// Function to add a custom app
function addCustomApp(name, path, category, iconUrl) {
  // Create a new app object
  const newApp = {
    id: Date.now(), // Use timestamp as unique ID
    name: name,
    iconUrl: iconUrl,
    path: path,
    category: category,
    pinned: false,
    favorite: false,
    usageCount: 0,
    dateAdded: Date.now(),
  };

  // Add to apps array
  apps.push(newApp);

  // Save to localStorage
  saveAppData();

  // Re-render apps
  renderApps();
  renderPinnedApps();
}

// Function to save app data to localStorage
function saveAppData() {
  try {
    localStorage.setItem("appLauncherData", JSON.stringify(apps));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }
}

// Function to load app data from localStorage
function loadAppData() {
  try {
    const savedData = localStorage.getItem("appLauncherData");
    if (savedData) {
      apps = JSON.parse(savedData);
    }
  } catch (e) {
    console.error("Error loading from localStorage:", e);
  }
}

// Drag and Drop functionality
let draggedItem = null;

function handleDragStart(e) {
  draggedItem = this;
  this.classList.add("dragging");

  // Set data for drag operation
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", this.getAttribute("data-id") || "");

  // For Firefox
  if (e.dataTransfer.setDragImage) {
    e.dataTransfer.setDragImage(this, 0, 0);
  }
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary to allow dropping
  }

  e.dataTransfer.dropEffect = "move";
  this.classList.add("drag-over");

  return false;
}

function handleDragLeave(e) {
  this.classList.remove("drag-over");
}

function handleDrop(e) {
  // Stop the browser from redirecting
  if (e.stopPropagation) {
    e.stopPropagation();
  }

  this.classList.remove("drag-over");

  if (draggedItem !== this) {
    // Get the two app IDs
    const draggedAppId = Number.parseInt(
      draggedItem?.getAttribute("data-id") || "0"
    );
    const targetAppId = Number.parseInt(this.getAttribute("data-id") || "0");

    // Find their positions in the array
    const draggedAppIndex = apps.findIndex((app) => app.id === draggedAppId);
    const targetAppIndex = apps.findIndex((app) => app.id === targetAppId);

    if (draggedAppIndex !== -1 && targetAppIndex !== -1) {
      // Reorder the array
      const [movedApp] = apps.splice(draggedAppIndex, 1);
      apps.splice(targetAppIndex, 0, movedApp);

      // Save to localStorage
      saveAppData();

      // Re-render the apps
      renderApps();
    }
  }

  return false;
}

function handleDragEnd(e) {
  // Remove dragging class
  this.classList.remove("dragging");

  // Remove drag-over class from all items
  document.querySelectorAll(".app-card").forEach((item) => {
    item.classList.remove("drag-over");
  });

  draggedItem = null;
}

// Function to detect system color scheme preference
function detectColorScheme() {
  // Check if the user has already set a preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }

  // Check if the browser supports prefers-color-scheme
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  } else {
    return "light";
  }
}

// Function to apply theme based on preference
function applyTheme(theme) {
  const body = document.body;
  const themeIcon = document.getElementById("theme-icon");
  const mainContent = document.getElementById("main-content");
  const categoryTabs = document.getElementById("category-tabs");

  if (theme === "light") {
    // Apply light theme
    body.classList.remove("dark");
    body.classList.add("light");

    // Update icon to sun
    if (themeIcon) {
      themeIcon.innerHTML =
        '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }

    // Set background color for main content
    if (mainContent) {
      mainContent.style.backgroundColor = "#f5f5f5";
    }

    // Set background color for category tabs
    if (categoryTabs) {
      categoryTabs.style.backgroundColor = "#f5f5f5";
    }
  } else {
    // Apply dark theme
    body.classList.remove("light");
    body.classList.add("dark");

    // Update icon to moon
    if (themeIcon) {
      themeIcon.innerHTML =
        '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
    }

    // Set background color for main content
    if (mainContent) {
      mainContent.style.backgroundColor = "#000";
    }

    // Set background color for category tabs
    if (categoryTabs) {
      categoryTabs.style.backgroundColor = "#000";
    }
  }

  // Re-render apps to apply theme to dynamically created elements
  renderApps();
  renderPinnedApps();
}

// Function to toggle theme
function toggleTheme() {
  const body = document.body;

  if (body.classList.contains("light")) {
    // Switch to dark theme
    applyTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    // Switch to light theme
    applyTheme("light");
    localStorage.setItem("theme", "light");
  }
}

// Function to toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const fixedHeader = document.querySelector(".fixed");
  const appGrid = document.getElementById("app-grid");
  if (!sidebar || !mainContent) return;

  sidebar.classList.toggle("w-60");
  sidebar.classList.toggle("w-16");

  // Update toggle button icon
  const toggleButton = document.getElementById("sidebar-toggle");
  if (toggleButton) {
    if (sidebar.classList.contains("w-16")) {
      toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>';
      localStorage.setItem("sidebar", "collapsed");

      // Hide labels
      document.querySelectorAll(".sidebar span").forEach((span) => {
        span.classList.add("hidden");
      });

      // Center icons
      document
        .querySelectorAll(".sidebar .flex.items-center")
        .forEach((item) => {
          item.classList.add("justify-center");
          item.classList.remove("px-4");
          item.classList.add("px-0");
        });

      // Adjust main content width
      mainContent.classList.remove("w-[calc(100%-15rem)]");
      mainContent.classList.add("w-[calc(100%-4rem)]");

      // Adjust fixed header position
      if (fixedHeader) {
        fixedHeader.style.left = "4rem";
      }

      // Adjust grid columns for collapsed sidebar
      if (appGrid) {
        if (sidebar.classList.contains("w-16")) {
          appGrid.classList.remove("grid-cols-4");
          appGrid.classList.add("grid-cols-5");
        } else {
          appGrid.classList.add("grid-cols-4");
          appGrid.classList.remove("grid-cols-5");
        }
      }
    } else {
      toggleButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"></path></svg>';
      localStorage.setItem("sidebar", "expanded");

      // Show labels
      document.querySelectorAll(".sidebar span").forEach((span) => {
        span.classList.remove("hidden");
      });

      // Left align icons
      document
        .querySelectorAll(".sidebar .flex.items-center")
        .forEach((item) => {
          item.classList.remove("justify-center");
          item.classList.add("px-4");
          item.classList.remove("px-0");
        });

      // Adjust main content width
      mainContent.classList.add("w-[calc(100%-15rem)]");
      mainContent.classList.remove("w-[calc(100%-4rem)]");

      // Adjust fixed header position
      if (fixedHeader) {
        fixedHeader.style.left = "15rem";
      }

      // Adjust grid columns for expanded sidebar
      if (appGrid) {
        appGrid.classList.add("grid-cols-4");
        appGrid.classList.remove("grid-cols-5");
      }
    }
  }
}

// Icon gallery data
// const iconGallery = {
//   social: [
//     {
//       name: "Facebook",
//       url: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
//     },
//     {
//       name: "Twitter",
//       url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
//     },
//     {
//       name: "Instagram",
//       url: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
//     },
//     {
//       name: "LinkedIn",
//       url: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
//     },
//     {
//       name: "YouTube",
//       url: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg",
//     },
//     {
//       name: "Discord",
//       url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Discord_logo.svg",
//     },
//     {
//       name: "Reddit",
//       url: "https://upload.wikimedia.org/wikipedia/en/5/58/Reddit_logo_new.svg",
//     },
//     {
//       name: "Slack",
//       url: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
//     },
//   ],
//   tech: [
//     {
//       name: "Chrome",
//       url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg",
//     },
//     {
//       name: "Firefox",
//       url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg",
//     },
//     {
//       name: "VS Code",
//       url: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
//     },
//     {
//       name: "GitHub",
//       url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
//     },
//     {
//       name: "Windows",
//       url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg",
//     },
//     {
//       name: "Linux",
//       url: "https://upload.wikimedia.org/wikipedia/commons/3/35/Tux.svg",
//     },
//   ],
//   productivity: [
//     {
//       name: "Microsoft Word",
//       url: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
//     },
//     {
//       name: "Microsoft Excel",
//       url: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
//     },
//     {
//       name: "Photoshop",
//       url: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
//     },
//     {
//       name: "Notion",
//       url: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg",
//     },
//   ],
//   entertainment: [
//     {
//       name: "Spotify",
//       url: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
//     },
//     {
//       name: "Netflix",
//       url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
//     },
//     {
//       name: "Steam",
//       url: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
//     },
//     {
//       name: "YouTube Music",
//       url: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg",
//     },
//   ],
// };

// Function to render icon gallery
function renderIconGallery(category) {
  const iconGalleryGrid = document.getElementById("icon-gallery-grid");
  if (!iconGalleryGrid) return;

  iconGalleryGrid.innerHTML = "";

  const icons = iconGallery[category] || [];

  icons.forEach((icon) => {
    const iconItem = document.createElement("div");
    iconItem.className =
      "flex flex-col items-center p-2 rounded-lg cursor-pointer border border-[#27282d] bg-[#121212] transition-all hover:bg-[#1d1d1d] hover:border-[#27282d]";
    iconItem.dataset.url = icon.url;
    iconItem.innerHTML = `
      <img src="${icon.url}" alt="${icon.name}" class="w-12 h-12 object-contain mb-2">
      <span class="text-xs text-center text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap w-full">${icon.name}</span>
    `;

    // Add click event to select icon
    iconItem.addEventListener("click", function () {
      // Remove selected class from all icons
      document.querySelectorAll(".icon-gallery-grid > div").forEach((item) => {
        item.classList.remove(
          "border-blue-500",
          "bg-[#27282d]",
          "bg-opacity-10"
        );
      });

      // Add selected class to clicked icon
      this.classList.add("border-blue-500", "bg-[#27282d]", "bg-opacity-10");

      // Store selected icon URL
      window.selectedIconUrl = this.dataset.url || "";

      // Update icon preview
      const iconPreview = document.getElementById("icon-preview");
      if (iconPreview) {
        iconPreview.innerHTML = `<img src="${window.selectedIconUrl}" alt="Icon Preview" class="max-w-full max-h-full">`;
      }

      // Close the modal
      const iconGalleryModal = document.getElementById("icon-gallery-modal");
      if (iconGalleryModal) {
        iconGalleryModal.style.display = "none";
      }
    });

    iconGalleryGrid.appendChild(iconItem);
  });
}

// Initialize the app when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Load app data from localStorage
  loadAppData();

  // Apply theme based on preference
  const preferredTheme = detectColorScheme();
  applyTheme(preferredTheme);
  document.body.classList.add(preferredTheme); // Ensure the class is added to body

  // Listen for system theme changes
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem("theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  if (savedTheme === "light") {
    // Apply light theme
    body.classList.remove("dark");
    body.classList.add("light");
    // Update icon to sun
    if (themeIcon) {
      themeIcon.innerHTML =
        '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    }
  }

  // Check for saved sidebar state
  const savedSidebar = localStorage.getItem("sidebar");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  const fixedHeader = document.querySelector(".fixed");
  const toggleButton = document.getElementById("sidebar-toggle");
  const appGrid = document.getElementById("app-grid");

  if (savedSidebar === "collapsed" && sidebar && toggleButton) {
    // Collapse sidebar
    sidebar.classList.remove("w-60");
    sidebar.classList.add("w-16");

    toggleButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>';

    // Hide labels
    document.querySelectorAll(".sidebar span").forEach((span) => {
      span.classList.add("hidden");
    });

    // Center icons
    document.querySelectorAll(".sidebar .flex.items-center").forEach((item) => {
      item.classList.add("justify-center");
      item.classList.remove("px-4");
      item.classList.add("px-0");
    });

    // Adjust main content width
    if (mainContent) {
      mainContent.classList.remove("w-[calc(100%-15rem)]");
      mainContent.classList.add("w-[calc(100%-4rem)]");
    }

    // Adjust fixed header position
    if (fixedHeader) {
      fixedHeader.style.left = "4rem";
    }

    // Adjust grid columns for collapsed sidebar
    if (appGrid) {
      if (savedSidebar === "collapsed") {
        appGrid.classList.remove("grid-cols-4");
        appGrid.classList.add("grid-cols-5");
      } else {
        appGrid.classList.add("grid-cols-4");
        appGrid.classList.remove("grid-cols-5");
      }
    }
  } else {
    // Set grid columns for expanded sidebar
    if (appGrid) {
      appGrid.classList.add("grid-cols-4");
      appGrid.classList.remove("grid-cols-5");
    }
  }

  // Set the first category tab as active
  const categoryTabs = document.querySelectorAll("#category-tabs > div");
  if (categoryTabs.length > 0) {
    categoryTabs[0].classList.add("active", "bg-[#1d1d1d]");
    categoryTabs[0].classList.remove("bg-[#121212]");
  }

  // Initial render of apps
  renderApps();
  renderPinnedApps();

  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle?.addEventListener("click", toggleTheme);

  // Sidebar toggle functionality
  const sidebarToggle = document.getElementById("sidebar-toggle");
  sidebarToggle?.addEventListener("click", toggleSidebar);

  // Sidebar navigation items
  const navItems = document.querySelectorAll(".sidebar > div > div[data-view]");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      navItems.forEach((i) => i.classList.remove("active", "bg-[#27282d]"));

      // Add active class to clicked item
      this.classList.add("active", "bg-[#27282d]");

      // Re-render apps based on the selected view
      renderApps();
    });
  });

  // Category tabs functionality
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      categoryTabs.forEach((t) => {
        t.classList.remove("active", "bg-[#1d1d1d]", "text-white");
        t.classList.add("bg-[#121212]", "text-gray-400");
      });

      // Add active class to clicked tab
      this.classList.add("active", "bg-[#1d1d1d]", "text-white");
      this.classList.remove("bg-[#121212]", "text-gray-400");

      // Re-render apps with the selected category
      renderApps();
    });
  });

  // Search input functionality
  const searchInput = document.getElementById("search-input");
  searchInput?.addEventListener("input", renderApps);

  // Reset search button
  const resetSearchButton = document.getElementById("reset-search");
  resetSearchButton?.addEventListener("click", () => {
    // Reset search input
    document.getElementById("search-input").value = "";

    // Re-render apps
    renderApps();
  });

  // Add app modal functionality
  const addAppButton = document.getElementById("add-app-button");
  const addAppModal = document.getElementById("add-app-modal");
  const closeModalButton = document.getElementById("close-modal");
  const cancelAddAppButton = document.getElementById("cancel-add-app");
  const confirmAddAppButton = document.getElementById("confirm-add-app");
  let selectedAppPath = "";
  // File input change handlers
  const chooseExeBtn = document.getElementById("choose-exe-btn");
  const selectedFileDisplay = document.getElementById("selected-file");

  chooseExeBtn?.addEventListener("click", async () => {
    const result = await window.electronAPI.openFileDialog();

    if (result?.path) {
      selectedAppPath = result.path;
      selectedIconUrl = result.icon || ""; // fallback to default handled later

      // Display file path
      document.getElementById("selected-file").textContent = result.path;
      // Display the file path
      // if (selectedFileDisplay) {
      //   selectedFileDisplay.textContent = selectedAppPath;
      // }

      // Update icon preview
      const iconPreview = document.getElementById("icon-preview");
      iconPreview.innerHTML = selectedIconUrl
        ? `<img src="${selectedIconUrl}" class="w-8 h-8 rounded" />`
        : `<div class="text-gray-500">No icon</div>`;
      // Show the icon preview if available
      // const iconPreview = document.getElementById("icon-preview");
      // if (iconPreview && selectedIconUrl) {
      //   iconPreview.innerHTML = `<img src="${selectedIconUrl}" class="w-8 h-8 rounded" />`;
      // }
    }
  });
  // Icon gallery functionality
  const chooseIconBtn = document.getElementById("choose-icon-btn");
  const iconGalleryModal = document.getElementById("icon-gallery-modal");
  const closeIconGalleryButton = document.getElementById("close-icon-gallery");
  const cancelIconSelectButton = document.getElementById("cancel-icon-select");
  window.selectedIconUrl = ""; // Declare selectedIconUrl in the global scope

  // Open icon gallery modal
  chooseIconBtn?.addEventListener("click", () => {
    if (iconGalleryModal) {
      iconGalleryModal.style.display = "flex";
    }

    // Default to social category
    renderIconGallery("social");

    // Set social tab as active
    document.querySelectorAll(".icon-gallery-tab").forEach((tab) => {
      tab.classList.remove(
        "active",
        "bg-[#1d1d1d]",
        "text-white",
        "border-[#27282d]"
      );
      tab.classList.add("bg-[#121212]", "text-gray-400", "border-[#27282d]");

      if (tab.dataset.category === "social") {
        tab.classList.add(
          "active",
          "bg-[#1d1d1d]",
          "text-white",
          "border-[#27282d]"
        );
        tab.classList.remove(
          "bg-[#121212]",
          "text-gray-400",
          "border-[#27282d]"
        );
      }
    });
  });

  // Icon gallery tab functionality
  document.querySelectorAll(".icon-gallery-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      document.querySelectorAll(".icon-gallery-tab").forEach((t) => {
        t.classList.remove("active", "bg-[#1d1d1d]", "text-white");
        t.classList.add("bg-[#121212]", "text-gray-400");
      });

      // Add active class to clicked tab
      this.classList.add("active", "bg-[#1d1d1d]", "text-white");
      this.classList.remove("bg-[#121212]", "text-gray-400");

      // Render icons for selected category
      renderIconGallery(this.dataset.category || "social");
    });
  });

  // Close icon gallery modal
  function closeIconGallery() {
    if (iconGalleryModal) {
      iconGalleryModal.style.display = "none";
    }
  }

  closeIconGalleryButton?.addEventListener("click", closeIconGallery);
  cancelIconSelectButton?.addEventListener("click", closeIconGallery);

  // Close modal when clicking outside
  iconGalleryModal?.addEventListener("click", (e) => {
    if (e.target === iconGalleryModal) {
      closeIconGallery();
    }
  });

  // Open modal
  addAppButton?.addEventListener("click", () => {
    if (addAppModal) {
      addAppModal.style.display = "flex";
    }

    // Reset form
    const appNameInput = document.getElementById("app-name");
    const appPathInput = document.getElementById("app-path");
    const appCategoryInput = document.getElementById("app-category");
    const iconPreview = document.getElementById("icon-preview");
    const selectedFileDisplay = document.getElementById("selected-file");

    if (appNameInput) appNameInput.value = "";
    if (appPathInput) appPathInput.value = "";
    if (appCategoryInput) appCategoryInput.value = "social";
    window.selectedIconUrl = ""; // Reset selectedIconUrl

    if (iconPreview) {
      iconPreview.innerHTML = `<img src="icons/icons8-windows-os-48.png"/>`;
    }

    if (selectedFileDisplay) {
      selectedFileDisplay.textContent = "No file selected";
    }
  });

  // Close modal
  function closeModal() {
    if (addAppModal) {
      addAppModal.style.display = "none";
    }
  }

  closeModalButton?.addEventListener("click", closeModal);
  cancelAddAppButton?.addEventListener("click", closeModal);

  // Close modal when clicking outside
  addAppModal?.addEventListener("click", (e) => {
    if (e.target === addAppModal) {
      closeModal();
    }
  });

  // Add app
  confirmAddAppButton?.addEventListener("click", () => {
    const appNameInput = document.getElementById("app-name");
    const appCategoryInput = document.getElementById("app-category");

    const appName = appNameInput?.value.trim() || "";
    const appPath = selectedAppPath; // 🧠 full path here
    const appCategory = appCategoryInput?.value || "social";
    let iconUrl = selectedIconUrl || "yourBase64FallbackIconHere";

    if (!appName || !appPath) {
      alert("Please fill out all fields and choose an application");
      return;
    }

    // // Use selected icon or default
    // let iconUrl = window.selectedIconUrl || defaultIconDataURL;

    // Add the app
    addCustomApp(appName, appPath, appCategory, iconUrl);

    // Reset icon & path
    // window.selectedIconUrl = "";
    selectedAppPath = "";
    selectedIconUrl = "";

    // Close modal
    closeModal();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const minimizeBtn = document.getElementById("min-button");
  const maximizeBtn = document.getElementById("max-button");
  const closeBtn = document.getElementById("close-button");

  minimizeBtn?.addEventListener("click", () => {
    window.electronAPI?.minimize();
  });

  maximizeBtn?.addEventListener("click", () => {
    window.electronAPI?.maximize();
  });

  closeBtn?.addEventListener("click", () => {
    window.electronAPI?.close();
  });
});
