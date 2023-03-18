export const ENV_LIST = <const>['dev', 'prod']

const { BUILD_ENV = 'prod', NODE_ENV } = process.env

export type EnvNames = typeof ENV_LIST[number]

export interface EnvVariablesCustom extends Record<string, any> {
  NODE_ENV?: 'development' | 'production'
  /** 当前构建环境 */
  BUILD_ENV: EnvNames
  /** 项目名称 */
  APP_NAME: string
  /** 项目标题 */
  APP_TITLE: string
  /** 网络请求基本地址 */
  API_BASE?: string
}

/** 公共环境变量 */
export const commonEnv: EnvVariablesCustom = {
  NODE_ENV,
  BUILD_ENV: process.env.BUILD_ENV || 'prod',
  APP_NAME: 'tauri-react-starting',
  APP_TITLE: 'Tauri React Starting',
}

export const envs: { [key in EnvNames]: Partial<EnvVariablesCustom> } = {
  dev: {
    API_BASE: 'http://xxx.com',
  },

  prod: {
    API_BASE: 'http://xxx.com',
  },
}

export function getEnv(name: EnvNames = BUILD_ENV) {
  return {
    ...commonEnv,
    ...envs[name],
  }
}

export function getEnvDefines(exEnv?: Partial<EnvVariablesCustom>) {
  const env = getEnv()
  const res: Record<string, string> = {}

  if (exEnv) {
    Object.assign(env, exEnv)
  }

  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key)) {
      const val = env[key]
      if (val === undefined) continue
      res[`process.env.${key}`] = `"${val}"`
    }
  }

  return res as EnvVariablesCustom
}

declare global {
  namespace NodeJS {
    /** 环境变量 */
    interface ProcessEnv extends EnvVariablesCustom {}
  }
}
