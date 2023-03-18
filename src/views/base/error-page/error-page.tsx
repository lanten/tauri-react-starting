import React from 'react'

import { Panel } from '@/components'

import './error-page.less'

interface ErrorInfo {
  /** 页面标题 */
  title: React.ReactNode
  /** 附加文案 */
  desc: React.ReactNode
  /** 图片链接 */
  imgSrc: string
  /** 额外内容 */
  content: React.ReactNode
}

interface Props extends PageProps<unknown, unknown, ErrorPageStates> {}

declare global {
  interface ErrorPageStates {
    /** 来源理由 name */
    name?: string
    /** 错误代码 */
    code?: 404 | 403 | 401
    /** 来源页 pathname */
    from?: string
    /** 是否显示侧边栏 */
    showSidebar?: boolean
  }
}

export default class ErrorPage extends React.Component<Props> {
  private ERROR_CODE_MAP: { [key: string]: ErrorInfo } = {
    404: {
      title: '对不起，页面没有找到！',
      imgSrc: $.images.IMG_404,
      desc: 'Page Not Found',
      content: <button onClick={() => history.go(-1)}>回到前一页</button>,
    },

    403: {
      title: '您没有使用该功能的权限',
      imgSrc: $.images.IMG_403,
      desc: '请联系你的管理员!',
      content: <button onClick={() => history.go(-1)}>回到前一页</button>,
    },
  }

  render() {
    const errInfo = this.ERROR_CODE_MAP[this.props.location?.state?.code || '404']

    return (
      <Panel shadow className="full-screen flex column center error-page">
        <div className="flex center-v">
          <img className="state-img" src={errInfo.imgSrc} alt="Error 403" />
          <div>
            <h2 className="fs-32 text-title">{errInfo.title}</h2>
            <p className="text-light mt-16 mb-24">{errInfo.desc}</p>
            {errInfo.content}
          </div>
        </div>
      </Panel>
    )
  }
} // class ErrorPage end
