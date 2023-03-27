import { invoke as invokeRust, type InvokeArgs } from '@tauri-apps/api/tauri'

import type { CreateInvokeOptions } from '../window'

// export async function invoke(cmd: 'log_info', args: { detail: string }): Promise<void>
// export async function invoke(cmd: 'log_warn', args: { detail: string }): Promise<void>
// export async function invoke(cmd: 'log_error', args: { detail: string }): Promise<void>
// /** 创建一个窗口 */
// export async function invoke(cmd: 'open_window', args: CreateInvokeOptions): Promise<boolean>
/** 与 Rust 主进程交互 */
export async function invoke<T>(cmd: string, args?: Record<string, any>): Promise<T> {
  return invokeRust(cmd, args)
}
