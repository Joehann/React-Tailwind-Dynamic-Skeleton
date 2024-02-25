import { ReactElement, useEffect, useRef,PropsWithChildren } from 'react'
import { skeletonConfig, SkeletonType } from './skeletonConfig'

const Skeleton = ({
  children,
  isLoading,
  loadingComponent,
  type,
}: PropsWithChildren<{
  isLoading: boolean
  loadingComponent?: ReactElement
  type?: SkeletonType
}>): ReactElement => {
  const skeletonRef = useRef(null)
  const currentRef = skeletonRef.current as HTMLElement | null

  useEffect(() => {
    if (isLoading && currentRef) {
      const elementsToReplace = currentRef?.querySelectorAll('.skeleton')
      const elementsToReplaceX = currentRef?.querySelectorAll('[class*="skeleton-"]')

      if (elementsToReplace?.length) {
        elementsToReplace.forEach((element: Element) => {
          const skeleton = document.createElement('div')
          if (
            ['div', 'button'].includes(element.tagName.toLowerCase()) &&
            element.className.includes('bg') &&
            !element.className.includes('bg-white')
          ) {
            skeleton.className = `animate-pulse ${element.className.replace(
              /\b(?:hover:|cursor-)\w+\s*/g,
              ''
            )} ${element.tagName.toLowerCase() !== 'div' ? 'min-w-[120px]' : ''}`

            skeleton.innerHTML = '&nbsp;'
          } else {
            skeleton.className = `animate-pulse rounded ${
              skeletonConfig[element.tagName.toLowerCase()]
            }}`
            skeleton.innerHTML = '&nbsp;'
          }
          element.replaceWith(skeleton)
        })
      } else if (elementsToReplaceX?.length) {
        elementsToReplaceX.forEach((element: Element) => {
          const skeletonCount = parseInt(element.className.match(/skeleton-(\d+)/)[1], 10)
          const skeletons = Array.from({ length: skeletonCount }, () => {
            const skeleton = document.createElement('div')
            let className = `animate-pulse rounded mb-4 ${
              skeletonConfig[type][element.tagName.toLowerCase()]
            }`
            if (element.className.match(/skeleton-\d+-(\d+|(\[\d+px\]))/)) {
              const height = element.className.match(/skeleton-\d+-(\d+|(\[\d+px\]))/)[1]
              className = className.replace(/h-(\d+|(\[\d+px\]))/, `h-${height}`)
            }
            skeleton.className = className
            skeleton.innerHTML = '&nbsp;'
            return skeleton
          })
          element.replaceWith(...skeletons)
        })
      }
    }
  }, [isLoading])
  
  if (isLoading && loadingComponent) return loadingComponent
  if (isLoading) return <div ref={skeletonRef}>{children}</div>
  return <>{children}</>
}

export default Skeleton