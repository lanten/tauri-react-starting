use std::path::PathBuf;

use tauri::{AppHandle, Manager, Window, WindowBuilder, WindowUrl};

use crate::window::{config::WindowConfig, setup};

// use super::super::tools::sys;
use crate::tools::sys;

/**
 * 打开一个窗口
 * 若已存在，则激活该窗口
 * 若不存在，则创建一个新窗口
 */
pub fn open_window(
    handle: &AppHandle,
    label: String,
    url: PathBuf,
    config: Option<WindowConfig>,
) -> Window {
    let current_win = handle.get_window(&label);

    let target_win = match current_win {
        Some(win) => {
            log::info!("Show Window: {}", &label);
            win.show().unwrap();
            win.set_focus().unwrap();
            return win;
        }
        None => create_window(handle, label, url, config),
    };

    return target_win;
}

/**
 * 创建新窗口
 *
 */
pub fn create_window(
    handle: &AppHandle,
    label: String,
    url: PathBuf,
    config: Option<WindowConfig>,
) -> Window {
    let mut conf = match config {
        Some(conf) => conf,
        None => WindowConfig::default(),
    };

    let lower_than_win11 = sys::lower_than_win11();

    if lower_than_win11 {
        log::info!("lower_than_win11!");
        conf.blur = false; // win11 以下模糊背景将导致窗口卡顿
    }

    log::info!("Create Window: [{}] {:?}", &label, &conf);

    let win_builder = WindowBuilder::new(handle, label, WindowUrl::App(url))
        .visible(conf.visible)
        .inner_size(conf.width, conf.height)
        .transparent(conf.transparent)
        .resizable(conf.resizable)
        .decorations(conf.decorations);

    let win = win_builder.build().unwrap();

    win.set_title(&conf.title).unwrap();

    if conf.center {
        win.center().unwrap();
    }

    // win.set_focus().unwrap(); // 创建后激活窗口，事实上这个步骤是自动的，无需手动设置

    if conf.shadow && conf.transparent {
        setup::vibrancy(&win);
    }

    if !conf.decorations {
        setup::shadow(&win)
    }

    return win;
}
