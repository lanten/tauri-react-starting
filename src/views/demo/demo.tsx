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
import { openMenuPopup } from '@/components'

interface DemoProps extends PageProps {}

const Demo: React.FC<DemoProps> = () => {
  const [nextTitle, setNextTitle] = React.useState<string>('New window title')
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
          Set title
        </button>
        <button
          onClick={() => {
            $.navigation.navigateTo('Home')
          }}
        >
          Back to home
        </button>
        <p>Right click to open context menu</p>
      </div>

      <p>WindowSize: {JSON.stringify(windowSize)}</p>
      <div className="flex row center-v gap-8">
        <button
          onClick={async () => {
            const innerSize = await appWindow.innerSize()
            setWindowSize(innerSize)
            sizeInputWRef.current!.value = innerSize.width + ''
            sizeInputHRef.current!.value = innerSize.height + ''
          }}
        >
          Get window size
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
          Set window size
        </button>
      </div>

      <p>WindowPosition: {JSON.stringify(windowPosition)}</p>
      <div className="flex row center-v gap-8">
        <button
          onClick={async () => {
            const innerPosition = await appWindow.outerPosition()
            setWindowPosition(innerPosition)
            positionInputXRef.current!.value = innerPosition.x + ''
            positionInputYRef.current!.value = innerPosition.y + ''
          }}
        >
          Get window position
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
          Set position
        </button>
      </div>

      <div className="border top-1"></div>

      <div>Create Window</div>
      <div className="flex row center-v gap-8">
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
      </div>

      <div className="border top-1"></div>

      <div className="flex row gap-8">
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

      <div className="flex row gap-8 border top-1 pt-md">
        <button
          onClick={(e) => {
            openMenuPopup({ children: 'bottom-left content', target: e.target, position: 'bottom-left' })
          }}
        >
          menu
        </button>

        <button
          onClick={(e) => {
            openMenuPopup({ children: 'top-left content', target: e.target, position: 'top-left' })
          }}
        >
          top-left
        </button>

        <button
          onClick={(e) => {
            openMenuPopup({ children: 'bottom-right content', target: e.target, position: 'bottom-right' })
          }}
        >
          bottom-right
        </button>

        <button
          onClick={(e) => {
            openMenuPopup({ children: 'top-right content', target: e.target, position: 'top-right' })
          }}
        >
          top-right
        </button>
      </div>
    </div>
  )
}

export default Demo
