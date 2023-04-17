// simplelog: https://crates.io/crates/simplelog
// doc: https://docs.rs/simplelog/0.12.1/simplelog/

use simplelog::{
    ColorChoice, CombinedLogger, ConfigBuilder, LevelFilter, TermLogger, TerminalMode, WriteLogger,
};

// use std::path::Path;
use tauri::{api::path::app_log_dir, generate_context};
use time::{macros::format_description, OffsetDateTime};

/// ## 初始化日志记录器
///
/// - 日志文件名为应用启动时的日期，格式为：[year]-[month]-[day].log
/// - 使用 tauri 提供的 app_log_dir 作为默认日志目录
///
pub fn init_logger() {
    let context = generate_context!();

    let date_now = OffsetDateTime::now_utc();
    let log_path = app_log_dir(context.config()).unwrap();
    let log_file_fmt = format_description!("[year]-[month]-[day].log");
    let log_file_name = date_now.format(log_file_fmt).unwrap();
    let log_file_path = log_path.join(log_file_name);

    let config = ConfigBuilder::new()
        .set_time_format_custom(format_description!(
            "[year]-[month]-[day] [hour]:[minute]:[second].[subsecond digits:3]"
        ))
        .build();

    // 判断日志文件夹是否存在，不存在则创建
    if !log_path.exists() {
        std::fs::create_dir_all(&log_path).unwrap();
    } else {
        // clear_logs(log_path, 90); // TODO: 未实现
    }

    CombinedLogger::init(vec![
        TermLogger::new(
            LevelFilter::Info,
            config.clone(),
            TerminalMode::Mixed,
            ColorChoice::Auto,
        ),
        WriteLogger::new(
            LevelFilter::Info,
            config.clone(),
            // std::fs::File::create("tauri.log").unwrap(),
            std::fs::OpenOptions::new()
                .create(true) // to allow creating the file, if it doesn't exist
                .append(true) // to not truncate the file, but instead add to it
                .open(&log_file_path)
                .unwrap(),
        ),
    ])
    .unwrap();

    log::info!("Logger initialized. {:?}", log_file_path);
}

// 清理日志文件
// pub async fn clear_logs<P: AsRef<Path>>(log_path: P, day: i32) -> Result<(), ()> {
//     let log_files = std::fs::read_dir(&log_path).unwrap();

//     println!("log_files: {:?}", log_files);

//     Ok(())
// }
