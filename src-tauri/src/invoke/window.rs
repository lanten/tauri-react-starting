use crate::window::{config::WindowConfig, manager};

/// 在 windows 中必须是异步函数，否则窗口无法创建
#[cfg(windows)]
#[tauri::command]
pub async fn open_window(
    app_handle: tauri::AppHandle,
    label: String,
    url: String,

    visible: bool,
    width: f64,
    height: f64,
    center: bool,
    resizable: bool,
    transparent: bool,
    decorations: bool,
    title: String,
    blur: bool,
    shadow: bool,
) -> Result<(), String> {
    let conf = Some(WindowConfig {
        visible,
        width,
        height,
        center,
        resizable,
        transparent,
        decorations,
        title,
        blur,
        shadow,
    });

    manager::open_window(&app_handle, label.into(), url.into(), conf);

    // 必须是异步返回，否则创建操作在 windows 中会挂起无响应 see: https://github.com/tauri-apps/tauri/issues/4121
    return Ok(());
}

// 在 macos 中必须是同步函数，否则 apply_vibrancy 无效
#[cfg(not(windows))]
#[tauri::command]
pub fn open_window(
    app_handle: tauri::AppHandle,
    label: String,
    url: String,

    visible: bool,
    width: f64,
    height: f64,
    center: bool,
    resizable: bool,
    transparent: bool,
    decorations: bool,
    title: String,
    blur: bool,
    shadow: bool,
) {
    let conf = Some(WindowConfig {
        visible,
        width,
        height,
        center,
        resizable,
        transparent,
        decorations,
        title,
        blur,
        shadow,
    });

    manager::open_window(&app_handle, label.into(), url.into(), conf);
}
