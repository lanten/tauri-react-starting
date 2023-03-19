import React from 'react'
import {
  appWindow,
  LogicalSize,
  LogicalPosition,
  type PhysicalSize,
  type PhysicalPosition,
} from '@tauri-apps/api/window'

import { dialog, notification } from '@tauri-apps/api'

import { dispatchGlobalStore } from '@/store'

interface DemoProps extends PageProps {}

const Demo: React.FC<DemoProps> = () => {
  const [nextTitle, setNextTitle] = React.useState<string>('new window title')
  const [windowSize, setWindowSize] = React.useState<PhysicalSize>()
  const [windowPosition, setWindowPosition] = React.useState<PhysicalPosition>()

  const sizeInputWRef = React.useRef<HTMLInputElement>(null)
  const sizeInputHRef = React.useRef<HTMLInputElement>(null)
  const positionInputXRef = React.useRef<HTMLInputElement>(null)
  const positionInputYRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const moveL = appWindow.onMoved((position) => {
      setWindowPosition(position.payload)
    })

    const resizeL = appWindow.onResized((size) => {
      setWindowSize(size.payload)
    })

    return () => {
      moveL.then((unlisten) => unlisten())
      resizeL.then((unlisten) => unlisten())
    }
  }, [])

  return (
    <div className="p-md flex col gap-md">
      <div className="flex row center-v gap-md border bottom-1 pb-md">
        <input
          type="text"
          value={nextTitle}
          onChange={(e) => {
            setNextTitle(e.target.value)
          }}
        />
        <button
          onClick={() => {
            appWindow.setTitle(nextTitle) // 原生窗口标题
            dispatchGlobalStore({ title: nextTitle }) // app-titlebar
          }}
        >
          set title
        </button>
        <button
          onClick={() => {
            $.navigation.navigateTo('Home')
          }}
        >
          to home
        </button>
        <p>right click to open context menu</p>
      </div>

      <p>windowSize: {JSON.stringify(windowSize)}</p>
      <div className="flex row gap-8">
        <button
          onClick={async () => {
            const innerSize = await appWindow.innerSize()
            setWindowSize(innerSize)
            sizeInputWRef.current!.value = innerSize.width + ''
            sizeInputHRef.current!.value = innerSize.height + ''
          }}
        >
          get window size
        </button>
        W:
        <input type="text" style={{ width: 50 }} ref={sizeInputWRef} />
        H:
        <input type="text" style={{ width: 50 }} ref={sizeInputHRef} />
        <button
          onClick={async () => {
            appWindow.setSize(
              new LogicalSize(Number(sizeInputWRef.current!.value), Number(sizeInputHRef.current!.value))
            )
          }}
        >
          set window size
        </button>
      </div>

      <p>windowPosition: {JSON.stringify(windowPosition)}</p>
      <div className="flex row gap-8">
        <button
          onClick={async () => {
            const innerPosition = await appWindow.outerPosition()
            setWindowPosition(innerPosition)
            positionInputXRef.current!.value = innerPosition.x + ''
            positionInputYRef.current!.value = innerPosition.y + ''
          }}
        >
          get window position
        </button>
        X:
        <input type="text" style={{ width: 50 }} ref={positionInputXRef} />
        Y:
        <input type="text" style={{ width: 50 }} ref={positionInputYRef} />
        <button
          onClick={async () => {
            appWindow.setPosition(
              new LogicalPosition(Number(positionInputXRef.current!.value), Number(positionInputYRef.current!.value))
            )
          }}
        >
          set position
        </button>
      </div>

      <div className="border top-1"></div>

      <div className="flex row gap-8">
        <button
          onClick={() => {
            $.window.createWindow({
              name: 'Demo',
              label: 'Demo2',
              title: 'demo2',
            })
          }}
        >
          Demo
        </button>
        <button
          onClick={() => {
            $.window.createWindow({
              name: 'PageParams',
              query: { type: 'query-value' },
              params: { param1: 'param1', param2: 'param2' },
            })
          }}
        >
          PageParams
        </button>
        <button
          onClick={() => {
            $.window.createWindow('Home')
          }}
        >
          Home
        </button>
        <button
          onClick={() => {
            $.window.createWindow('About')
          }}
        >
          About
        </button>
        <button
          onClick={() => {
            $.window.createWindow('IconfontDemo')
          }}
        >
          IconfontDemo
        </button>

        <button
          onClick={() => {
            dialog.message('message dialog', { type: 'error' })
          }}
        >
          message
        </button>

        <button
          onClick={() => {
            dialog.confirm('confirm dialog', 'confirm dialog content')
          }}
        >
          confirm
        </button>
      </div>

      <div className="border top-1"></div>

      <div className="flex row gap-8">
        <button
          onClick={() => {
            /// 通知回调功能暂未实现 see: https://github.com/tauri-apps/tauri/issues/3698
            notification.sendNotification({
              title: 'Notification Title',
              body: '可是，即使是这样，随机一段废话的出现仍然代表了一定的意义.',
            })
          }}
        >
          notification
        </button>
      </div>
    </div>
  )
}

export default Demo
