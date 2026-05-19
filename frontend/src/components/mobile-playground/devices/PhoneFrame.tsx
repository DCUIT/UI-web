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
