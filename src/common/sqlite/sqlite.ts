import { invoke } from '@tauri-apps/api/tauri'

enum SqliteCommands {
  /** 打开数据库 */
  OPEN = 'plugin:sqlite|open',
  /** 关闭数据库 */
  CLOSE = 'plugin:sqlite|close',
  /** 执行sql语句 */
  EXECUTE = 'plugin:sqlite|execute',
}

export class Sqlite {
  private connected = false

  constructor(public name: string) {}

  /** 打开数据库 */
  open() {
    return invoke(SqliteCommands.OPEN, { name: this.name })
  }

  /** 关闭数据库 */
  close() {}

  /** 执行sql语句 */
  execute(sql: string) {
    return invoke(SqliteCommands.EXECUTE, {
      name: this.name,
      sql,
    })
  }
}
