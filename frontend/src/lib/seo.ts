import { Metadata } from "next"

export function constructMetadata({
  title = "Master UI Platform - Modern UI Kit for React",
  description = "Beautifully designed, accessible, and fully customizable components built with Next.js, Tailwind CSS, and Framer Motion.",
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }]
    },
    icons,
    ...(noIndex && { robots: { index: false, follow: false } })
  }
}