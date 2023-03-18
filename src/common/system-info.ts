import { os, app, path } from '@tauri-apps/api'

type OsType = 'Linux' | 'Darwin' | 'Windows_NT'

type OsArch =
  | 'x86'
  | 'x86_64'
  | 'arm'
  | 'aarch64'
  | 'mips'
  | 'mips64'
  | 'powerpc'
  | 'powerpc64'
  | 'riscv64'
  | 's390x'
  | 'sparc64'

type OsPlatform =
  | 'linux'
  | 'darwin'
  | 'ios'
  | 'freebsd'
  | 'dragonfly'
  | 'netbsd'
  | 'openbsd'
  | 'solaris'
  | 'android'
  | 'win32'

export interface SystemInfo {
  /** 操作系统内核版本 */
  osVersion: string
  /** 操作系统类型 */
  osType: OsType
  /** 操作系统CPU架构 */
  osArch: OsArch
  /** 系统默认缓存目录 */
  osTempdir: string
  /** 操作系统信息 */
  osPlatform: OsPlatform
  /** 系统默认换行符`\n` on POSIX, `\r\n` on Windows */
  osEOL: string

  /** 应用名称 */
  appName: string
  /** 应用版本 */
  appVersion: string
  /** Tauri版本 */
  tauriVersion: string

  /** 应用数据目录 */
  appDataDir: string
  /** 应用缓存目录 */
  appCacheDir: string
  /** 应用日志目录 */
  appLogDir: string
  /** 用户主目录 */
  homeDir: string
  /** 应用数据目录 */
  dataDir: string
}

export async function getSystemInfo(): Promise<SystemInfo> {
  const [
    osVersion,
    osType,
    osArch,
    osTempdir,
    osPlatform,
    appName,
    appVersion,
    tauriVersion,
    appDataDir,
    appCacheDir,
    appLogDir,
    homeDir,
    dataDir,
  ] = await Promise.all([
    os.version(),
    os.type(),
    os.arch(),
    os.tempdir(),
    os.platform(),

    app.getName(),
    app.getVersion(),
    app.getTauriVersion(),

    path.appDataDir(),
    path.appCacheDir(),
    path.appLogDir(),
    path.homeDir(),
    path.dataDir(),
  ])

  return {
    osVersion,
    osType,
    osArch,
    osTempdir,
    osPlatform,
    osEOL: os.EOL,

    appName,
    appVersion,
    tauriVersion,

    appDataDir,
    appCacheDir,
    appLogDir,
    homeDir,
    dataDir,
  }
}

/**
 * 系统信息
 *
 * 在初始化之前，该值为空对象
 */
export const systemInfo: Partial<SystemInfo> = {}

/** 初始化系统信息 */
export async function initSystemInfo() {
  const res = await getSystemInfo()
  Object.assign(systemInfo, res)
  return systemInfo
}
