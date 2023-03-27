#[tauri::command]
pub fn log_info(detail: &str) {
    log::info!("{}", detail);
}

#[tauri::command]
pub fn log_warn(detail: &str) {
    log::warn!("{}", detail);
}

#[tauri::command]
pub fn log_error(detail: &str) {
    log::error!("{}", detail);
}
