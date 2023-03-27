use tauri::{
    AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

use crate::window::manager;

pub fn create_app_tray_menu() -> SystemTrayMenu {
    let tray_menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new(
            "show_main_window".to_string(),
            "Main Window",
        ))
        .add_item(CustomMenuItem::new(
            "show_demo_window".to_string(),
            "Demo Window",
        ))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("about".to_string(), "About"))
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("quit".to_string(), "Quit"));
    tray_menu
}

pub fn create_app_tray() -> SystemTray {
    SystemTray::new().with_menu(create_app_tray_menu())
}

pub fn tray_event_handler(handle: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a left click");
        }
        SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a right click");
        }
        SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
        } => {
            println!("system tray received a double click");
            manager::open_main(handle);
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "show_main_window" => {
                manager::open_main(handle);
            }
            "show_demo_window" => {
                manager::open_demo(handle);
            }
            "about" => {
                manager::open_about(handle);
            }
            "quit" => {
                std::process::exit(0);
            }

            _ => {}
        },
        _ => {}
    }
}
