use tauri::Window;
use window_shadows::set_shadow;

#[cfg(target_os = "windows")]
use window_vibrancy::apply_acrylic;

#[cfg(target_os = "macos")]
use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};

/// 模糊背景
pub fn vibrancy(win: &Window) {
    #[cfg(target_os = "macos")]
    apply_vibrancy(&win, NSVisualEffectMaterial::HudWindow, None, Some(12.0))
        .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

    #[cfg(target_os = "windows")]
    apply_acrylic(&win, None)
        .expect("Unsupported platform! 'apply_acrylic' is only supported on Windows");
}

/// 显示窗口阴影
pub fn shadow(win: &Window) {
    // #[cfg(target_os = "windows")] // windows 下附加圆角窗口，mac 下优化圆角阴影
    set_shadow(&win, true).unwrap();
}
