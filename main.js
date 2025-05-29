const { app, BrowserWindow, ipcMain } = require("electron");
const { execFile } = require("child_process");
const path = require("path");
const { dialog } = require("electron");
const extractIcon = require("extract-file-icon");
const fs = require("fs");

// app.setPath("userData", path.join(__dirname, "user_data"));

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 720,
    minWidth: 800, // ✅ max width it can be resized to
    minHeight: 420,
    frame: false, // ← disables the default OS title bar
    titleBarStyle: "hidden", // ← allows your UI to fill that space
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // ✅ This is key
      contextIsolation: true,
      nodeIntegration: false, // ❗ Must be false for security when using contextBridge
    },
  });

  // win.removeMenu();
  // win.setMenuBarVisibility(false);
  // win.setAutoHideMenuBar(true);

  win.loadFile("index.html");
};
app.whenReady().then(() => {
  createWindow();
});
ipcMain.on("window-minimize", () => {
  BrowserWindow.getFocusedWindow()?.minimize();
});

ipcMain.on("window-maximize", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win?.isMaximized()) {
    win.unmaximize();
  } else {
    win?.maximize();
  }
});

ipcMain.on("window-close", () => {
  BrowserWindow.getFocusedWindow()?.close();
});

ipcMain.on("launch-app", (event, appPath) => {
  console.log("Launching app at path:", appPath);

  execFile(appPath, (error, stdout, stderr) => {
    if (error) {
      console.error("Error launching app:", error.message);
      return;
    }
    console.log("App launched successfully!");
  });
});

ipcMain.handle("select-app", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Executable Files", extensions: ["exe"] }],
  });

  if (result.canceled || result.filePaths.length === 0) return null;

  const filePath = result.filePaths[0];
  console.log("Selected app path:", filePath);

  try {
    const iconBuffer = extractIcon(filePath, 256);

    if (!iconBuffer || iconBuffer.length === 0) {
      console.warn("No icon found in executable:", filePath);
      return { path: filePath, icon: null };
    }

    const base64Icon = iconBuffer.toString("base64");
    const dataUrl = `data:image/png;base64,${base64Icon}`;

    return {
      path: filePath,
      icon: dataUrl,
    };
  } catch (err) {
    console.error("Failed to extract icon:", err.message);
    return { path: filePath, icon: null };
  }
});
