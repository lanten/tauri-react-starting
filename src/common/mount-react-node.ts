import { createRoot, type Root } from 'react-dom/client'

export interface MountVDomeOptions {
  /** 指定挂载的节点 */
  mountNode?: HTMLElement | null
  /** 自动创建的挂载容器 ID */
  containerId?: string
  /** 给容器附加的 className */
  containerClassName?: string
  /** 挂载内容 */
  content: JSX.Element
}

const mountNodesMap = new Map<HTMLElement, Root>()

/** 挂载 React 节点 */
export async function mountReactNode({ mountNode, content, containerId, containerClassName }: MountVDomeOptions) {
  let containerNode = mountNode

  if (!containerNode) {
    if (containerId) {
      containerNode = document.getElementById(containerId)
    }

    if (!containerNode) {
      containerNode = document.createElement('div')
      containerNode.id = containerId || $.utils.uuid()
      document.body.appendChild(containerNode)
    }
  }

  const currentMountNode = mountNodesMap.get(containerNode)

  if (currentMountNode) {
    // console.warn(
    //   `The target element(#${containerId}) has mounted ReactNode, and the reload operation will be performed.`
    // )
    currentMountNode.unmount()
    mountNodesMap.delete(containerNode)
  }

  if (containerClassName) {
    containerNode.className = containerClassName
  }

  const root = createRoot(containerNode)
  root.render(content)

  mountNodesMap.set(containerNode, root)

  return Promise.resolve(root) // 返回异步函数，防止线程阻塞
}
