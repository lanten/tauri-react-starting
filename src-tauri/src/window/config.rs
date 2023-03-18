/**
 * 新窗口选项
 */
#[derive(Debug)]
pub struct WindowConfig {
    /** 是否可见 */
    pub visible: bool,
    /** 窗口宽度 */
    pub width: f64,
    /** 窗口高度 */
    pub height: f64,
    /** 居中 */
    pub center: bool,
    /** 是否可缩放 */
    pub resizable: bool,
    /** 是否透明 */
    pub transparent: bool,
    /** 是否显示标题栏 */
    pub decorations: bool,
    /** 窗口标题 */
    pub title: String,
    /** 模糊背景 */
    pub blur: bool,
    /** 显示窗口阴影，win 11 下附加圆角，仅在透明窗口下生效 */
    pub shadow: bool,
}

impl Default for WindowConfig {
    fn default() -> Self {
        WindowConfig {
            title: "".to_string(),
            width: 800.0,
            height: 600.0,
            center: true,
            resizable: true,
            blur: false,
            shadow: true,
            visible: false,
            transparent: true,
            decorations: false,
        }
    }
}
