import React from 'react'

import { FullScreenLoading } from '@/components'
import { useRequest } from '@/hooks'

export interface IconFontDemoProps extends PageProps {}

interface IconFontJsonItem {
  font_class: string
  icon_id: string
  name: string
  unicode: string
  unicode_decimal: number
}

const IconFontDemo: React.FC<IconFontDemoProps> = () => {
  const { data, update, loading } = useRequest($.api.common.getIconfontJson, undefined, true)

  React.useEffect(() => {
    update()
  }, [])

  if (loading) {
    return <FullScreenLoading />
  }

  return (
    <div className="iconfont-demo p-md">
      <div className="flex row gap-md border bottom-1 pb-md mb-md">
        <div className="flex-none flex col gap-8">
          <div>font_family</div>
          <div>css_prefix_text</div>
        </div>
        <div className="flex-1 flex col gap-8">
          <b>{data.font_family}</b>
          <b>{data.css_prefix_text}</b>
        </div>
      </div>

      <div className="flex row flex-wrap gap-md">
        {data?.glyphs?.map((item: IconFontJsonItem) => {
          return (
            <button
              key={item.icon_id}
              className="iconfont-demo-item flex col center-v p-md br-10"
              style={{ width: 128 }}
            >
              <i className={`iconfont fs-24 ${data.css_prefix_text}${item.font_class}`} />
              <div className="color-gray mt-12">{item.font_class}</div>
              <div className="color-light mt-4">{item.unicode}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default IconFontDemo
