import { ReactElement, useEffect, useRef } from 'react'

const SkeletonClassByTagName: Record<string, string> = {
  h1: 'bg-default-grey-200 min-h-[24px] min-w-[120px] w-full',
  h2: 'bg-default-grey-500 min-w-[2/3] h-[20px] w-full',
  h3: 'bg-default-grey-400 min-w-[2/3] h-[18px] w-full',
  h4: 'bg-default-grey-300 min-w-[2/3] h-[16px] w-full',
  h5: 'bg-default-grey-300 min-w-[2/3] h-[14px] w-full',
  p: 'bg-default-grey-200 h-[24px] min-w-[120px] w-full',
  input:
    'bg-default-grey-500 min-w-[150px] h-[48px] w-[150px] border-[1px] border-default-grey-400 p-2 rounded',
}

export const Skeleton = ({
  isLoading,
  children,
}: {
  isLoading: boolean
  children: ReactElement
}): ReactElement => {
  const skeletonRef = useRef(null)
  const currentRef = skeletonRef.current as HTMLElement | null

  useEffect(() => {
    if (isLoading && currentRef) {
      const elementsToReplace = currentRef.querySelectorAll('.skeleton')

      if (elementsToReplace) {
        elementsToReplace.forEach((element: Element) => {
          const skeleton = document.createElement('div')

          if (['div', 'button'].includes(element.tagName.toLowerCase())) {
            skeleton.className = `animate-pulse ${element.className.replace(
              /\b(?:hover:|cursor-)\w+\s*/g,
              ''
            )} ${
              element.tagName.toLowerCase() !== 'div' ? 'min-w-[120px]' : ''
            }`

            skeleton.innerHTML = '&nbsp;'
          } else {
            skeleton.className = `animate-pulse mt-4 rounded ${
              SkeletonClassByTagName[element.tagName.toLowerCase()]
            }}`
            skeleton.innerHTML = '&nbsp;'
          }
          element.replaceWith(skeleton)
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])
  if (isLoading) return <div ref={skeletonRef}>{children}</div>
  return <>{children}</>
}
