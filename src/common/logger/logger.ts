/**
 * 日志记录器
 */

export type LevelType = 'log' | 'info' | 'warn' | 'error'

export enum LEVEL_ENUM {
  log = 1,
  info,
  warn,
  error,
}

export interface ConsoleTagOptions {
  level?: LevelType
  label?: string
  labelBackground?: string
  labelColor?: string
  value?: string
  valueBackground?: string
  valueColor?: string
}

export type LoggerTrait = {
  [key in LevelType]: (...args: any[]) => void
}

export interface DataActionsOptions {
  level: LevelType
  message?: string
  detail?: any
  stack?: string
}

export interface ErrorData {
  level: LevelType
  /** 错误消息 */
  message?: string
  /** 调用栈 */
  stack?: string
  /** 详细信息，内容不宜过多 */
  detail?: any
  /** 时间戳 */
  time?: number
}

export class Logger implements LoggerTrait {
  constructor(
    /** 应用标识 */
    public appId: string,
    /** 保存等级 */
    public saveLevel: LevelType | 'off' = 'off',
    /** 上传等级 */
    public uploadLevel: LevelType | 'off' = 'error'
  ) {}

  /** 在控制台打印一个标签 */
  tag(options: ConsoleTagOptions | ConsoleTagOptions[], ...args: any[]) {
    if (!console.log) return
    const opts = Array.isArray(options) ? options : [options]

    let level: LevelType = 'log'
    let template = ''
    const arr: string[] = []

    opts.forEach((option) => {
      const {
        level: levelInput,
        label: key,
        labelColor: keyColor = '#fff',
        labelBackground: keyBackground = '#35495e',
        value,
        valueColor = '#fff',
        valueBackground = '#35495e',
      } = option

      if (levelInput) {
        level = levelInput
      }

      template += `%c${key}%c${value}`

      arr.push(
        `background:${keyBackground}; padding: 2px 9px 2px 8px; border-radius: 3px 0 0 3px; color: ${keyColor};`,
        `background:${valueBackground}; padding: 2px 8px; border-radius: 0 3px 3px 0; color: ${valueColor};margin-left: -1px; margin-right: 4px;`
      )
    })

    this[level](template, ...arr, ...args)
  }

  log(message?: string, ...args: any[]): void {
    this.baseLog('log', message, ...args)
  }

  info(message?: string, ...args: any[]): void {
    this.baseLog('info', message, ...args)
  }

  warn(message?: string, ...args: any[]): void {
    this.baseLog('warn', message, ...args)
  }

  error(message?: string, ...args: any[]): void {
    this.baseLog('error', message, ...args)
  }

  baseLog(level: LevelType, message?: string, ...detail: any[]) {
    console[level].call(this, message, ...detail)
    this.dataActions({ level, message, detail })
  }

  dataActions({ level, message, detail, stack }: DataActionsOptions) {
    if (this.saveLevel === 'off' && this.uploadLevel === 'off') return

    const data: ErrorData = {
      level,
      message,
      stack: stack || new Error().stack || '未捕获的异常',
      detail: typeof detail === 'object' ? JSON.stringify(detail) : detail,
      time: Date.now(),
    }

    if (LEVEL_ENUM[level] >= LEVEL_ENUM[this.saveLevel]) {
      this.save(data)
    }

    if (LEVEL_ENUM[level] >= LEVEL_ENUM[this.uploadLevel]) {
      this.upload(data)
    }
  }

  /** 写入本地数据库 */
  save(data: ErrorData) {
    console.log('save TODO...', data)
  }

  /** 上传记录至服务器 */
  upload(data: ErrorData) {
    // TODO...
  }
}
