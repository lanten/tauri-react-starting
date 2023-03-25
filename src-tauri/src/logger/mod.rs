// simplelog: https://crates.io/crates/simplelog
// doc: https://docs.rs/simplelog/0.12.1/simplelog/

use simplelog::{
    ColorChoice, CombinedLogger, ConfigBuilder, LevelFilter, TermLogger, TerminalMode,
    WriteLogger,
};

use time::macros::format_description;

pub fn init_logger() {
    let config = ConfigBuilder::new()
        .set_time_format_custom(format_description!(
            "[month]-[day] [hour]:[minute]:[second].[subsecond]"
        ))
        .build();

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
                .open("tauri.log")
                .unwrap(),
        ),
    ])
    .unwrap();

    log::info!("Logger initialized.");
}
