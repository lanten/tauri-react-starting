#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use tauri::Manager;

mod invoke;
mod logger;
mod tools;
mod tray;
mod window;

use tray::create_tray::{create_app_tray, tray_event_handler};
use window::create_window;

fn main() {
    logger::init_logger();

    tauri::Builder::default()
        .system_tray(create_app_tray())
        .on_system_tray_event(tray_event_handler)
        .invoke_handler(tauri::generate_handler![
            invoke::demo::greet,
            invoke::invoke_window::open_window,
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app_handle, event| match event {
            tauri::RunEvent::Ready => {
                // 打开主窗口
                create_window::open_window(app_handle, "Main".into(), "/".into(), None);
            }

            // tauri::RunEvent::WindowEvent { label, event, .. } => {
            //     if label == "Main" {
            //         // 阻止关闭主窗口
            //         match event {
            //             tauri::WindowEvent::CloseRequested { api, .. } => {
            //                 api.prevent_close();
            //                 app_handle.get_window("Main").map(|win| win.hide());
            //             }
            //             _ => {}
            //         }
            //     }
            // }
            tauri::RunEvent::ExitRequested { api, .. } => {
                // 阻止退出程序
                api.prevent_exit();
            }
            _ => {}
        });
}
