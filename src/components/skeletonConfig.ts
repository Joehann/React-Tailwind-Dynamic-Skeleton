/////////////
// Config //
///////////

export const skeletonConfig = {
  main: {
     div: 'bg-[#F2F4F7] h-8 min-w-[120px] w-full',
     h1: 'bg-[#D8E0EA] min-h-[24px] min-w-[120px] w-full',
     h2: 'bg-[#F2F4F7] min-w-[2/3] h-[20px] w-full',
     h3: 'bg-[#62769D] min-w-[2/3] h-[18px] w-full',
     h4: 'bg-[#A0ACCB] min-w-[2/3] h-[16px] w-full',
     h5: 'bg-[#A0ACCB] min-w-[2/3] h-[14px] w-full',
     input:
      'bg-[#F2F4F7] min-w-[150px] h-[48px] w-[150px] border-[1px] border-[#62769D] p-2 rounded',
     p: 'bg-[#F2F4F7] h-6 min-w-[120px] w-full',
  },
}

///////////
// Type //
/////////

export const SkeletonTypeEnum = {
  Main: 'main',
} as const

export type SkeletonType = typeof SkeletonTypeEnum[keyof typeof SkeletonTypeEnum]
