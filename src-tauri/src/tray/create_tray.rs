use tauri::{
    AppHandle, CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
};

use crate::window::{config::WindowConfig, create_window};

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

pub fn tray_event_handler(app: &AppHandle, event: SystemTrayEvent) {
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
            create_window::open_window(app, "Main".into(), "/".into(), None);
        }
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "show_main_window" => {
                create_window::open_window(app, "Main".into(), "/".into(), None);
            }
            "show_demo_window" => {
                create_window::open_window(app, "Demo".into(), "/demo".into(), None);
            }
            "about" => {
                create_window::open_window(
                    app,
                    "About".into(),
                    "/about".into(),
                    Some(WindowConfig {
                        width: 400.0,
                        height: 300.0,
                        resizable: false,
                        ..WindowConfig::default()
                    }),
                );
            }
            "quit" => {
                std::process::exit(0);
            }

            _ => {}
        },
        _ => {}
    }
}
