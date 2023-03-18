import React from 'react'

import './about.less'

export interface AboutPageProps extends PageProps {}

const About: React.FC<AboutPageProps> = () => {
  return (
    <div className="page-about full-screen flex col center gap-sm">
      <img src={$.images.APP_ICON_SVG} width="48" />
      <h2 className="mt-md color-title">{process.env.APP_TITLE}</h2>
      <p className="fs-12 color-gray">
        {$.systemInfo.appName} version: {$.systemInfo.appVersion}
      </p>
      <p className="fs-12 color-light mt-md">
        Copyright © {new Date().getFullYear()}{' '}
        <a href="https://github.com/lanten" target="_blank">
          lanten.
        </a>{' '}
        All rights. (demo)
      </p>
    </div>
  )
}

export default About
