use once_cell::sync::Lazy;
use os_info::{Info, Version};

pub static OS_INFO: Lazy<Info> = Lazy::new(|| os_info::get());

// pub fn is_win11() -> bool {
//     let edition = OS_INFO.edition();
//     return match edition {
//         Some(edition) => edition.contains("Windows 11"),
//         _ => false,
//     };
// }

/// 是否低于 win11
pub fn lower_than_win11() -> bool {
    let version = OS_INFO.version();
    return match version {
        Version::Semantic(major, minor, patch) => *major <= 10 && *minor == 0 && *patch <= 22000,
        _ => false,
    };
}
