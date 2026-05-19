import React, { ReactNode } from 'react'

export type DeviceType = 'iphone' | 'android' | 'ipad'

interface PhoneFrameProps {
  children: ReactNode
  device?: DeviceType
  theme?: 'light' | 'dark'
  orientation?: 'portrait' | 'landscape'
}

export default function PhoneFrame({
  children,
  device = 'iphone',
  theme = 'light',
  orientation = 'portrait',
}: PhoneFrameProps) {
  // Determine dimensions based on device and orientation
  const getDeviceClasses = () => {
    switch (device) {
      case 'ipad':
        return orientation === 'portrait' ? 'w-[768px] h-[1024px] rounded-[2rem]' : 'w-[1024px] h-[768px] rounded-[2rem]'
      case 'android':
        return orientation === 'portrait' ? 'w-[360px] h-[800px] rounded-[2.5rem]' : 'w-[800px] h-[360px] rounded-[2.5rem]'
      case 'iphone':
      default:
        return orientation === 'portrait' ? 'w-[375px] h-[812px] rounded-[3rem]' : 'w-[812px] h-[375px] rounded-[3rem]'
    }
  }

  const isPortrait = orientation === 'portrait'

  return (
    <div 
      className={`relative transition-all duration-500 ease-in-out border-[14px] shadow-2xl shrink-0 overflow-hidden flex flex-col
        ${getDeviceClasses()} 
        ${theme === 'dark' ? 'border-slate-800 bg-black' : 'border-slate-900 bg-white'}`
      }
    >
      {/* Notch / Dynamic Island for iPhone */}
      {device === 'iphone' && (
        <div className={`absolute z-20 bg-slate-900 ${
          isPortrait 
            ? 'top-0 inset-x-0 h-7 w-40 mx-auto rounded-b-3xl'
            : 'left-0 inset-y-0 w-7 h-40 my-auto rounded-r-3xl'
        }`} />
      )}
      
      {/* Camera hole for Android */}
      {device === 'android' && (
        <div className={`absolute z-20 bg-slate-900 rounded-full w-4 h-4 ${
          isPortrait
            ? 'top-2 inset-x-0 mx-auto'
            : 'left-2 inset-y-0 my-auto'
        }`} />
      )}

      {/* Screen Content Wrapper */}
      <div className={`relative w-full h-full overflow-hidden flex flex-col ${device === 'iphone' ? 'rounded-[2rem]' : 'rounded-3xl'}`}>
         
         {/* Fake Status Bar */}
         <div className={`absolute top-0 inset-x-0 z-30 flex items-center justify-between pointer-events-none
           ${isPortrait ? 'px-6 pt-3 pb-2' : 'px-8 pt-2 pb-1'} 
           text-[13px] font-semibold tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'} drop-shadow-md`}
         >
           <div className={`flex justify-start ${isPortrait && device === 'iphone' ? 'pl-2' : ''}`}>
             9:41
           </div>
           
           <div className={`flex justify-end items-center gap-1.5 ${isPortrait && device === 'iphone' ? 'pr-2' : ''}`}>
             {/* Signal */}
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2L2 22z"></path></svg>
             {/* Wi-Fi */}
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.01 21.49L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01z"></path></svg>
             {/* Battery */}
             <div className="flex items-center opacity-90">
               <div className="w-[22px] h-[11px] border-[1px] border-current rounded-[3px] p-[1px] flex items-center">
                 <div className="w-[15px] h-full bg-current rounded-[1.5px]"></div>
               </div>
               <div className="w-[1.5px] h-[4px] bg-current rounded-r-[1px] ml-[1px]"></div>
             </div>
           </div>
         </div>

         {children}
      </div>

      {/* Home Indicator for iPhone */}
      {device === 'iphone' && (
        <div className={`absolute z-20 bg-slate-400/50 rounded-full ${
          isPortrait
            ? 'bottom-2 inset-x-0 w-32 h-1 mx-auto'
            : 'right-2 inset-y-0 h-32 w-1 my-auto'
        }`} />
      )}
    </div>
  )
}
