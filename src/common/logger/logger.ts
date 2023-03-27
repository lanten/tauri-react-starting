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
    this.mainLog('info', message, ...args)
    this.devLog('log', message, ...args)
  }

  info(message?: string, ...args: any[]): void {
    this.mainLog('info', message, ...args)
    this.devLog('info', message, ...args)
  }

  warn(message?: string, ...args: any[]): void {
    this.mainLog('warn', message, ...args)
    this.devLog('warn', message, ...args)
  }

  error(message?: string, ...args: any[]): void {
    this.mainLog('error', message, ...args)
    this.devLog('error', message, ...args)
  }

  devLog(level: LevelType, message?: string, ...detail: any[]) {
    console[level].call(this, message, ...detail)
  }

  mainLog(level: 'info' | 'warn' | 'error', message?: string, ...detail: any[]) {
    let detailStr = ''

    if (detail.length) {
      detailStr = detail
        .map((item) => {
          if (typeof item === 'object') {
            return JSON.stringify(item)
          }
          return item
        })
        .join(', ')
    }

    $.invoke(`log_${level}`, { detail: `${message} -> ${detailStr}` })
  }
}
