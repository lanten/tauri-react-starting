import { invoke as invokeRust, type InvokeArgs } from '@tauri-apps/api/tauri'

import type { CreateInvokeOptions } from '../window'

/** 创建一个窗口 */
export async function invoke(cmd: 'open_window', args: CreateInvokeOptions): Promise<boolean>
/** 与 Rust 主进程交互 */
export async function invoke<T>(cmd: string, args?: Record<string, any>): Promise<T> {
  return invokeRust(cmd, args)
}
