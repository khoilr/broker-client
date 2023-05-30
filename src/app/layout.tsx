import React from 'react'
import './globals.css'
import Notification from './ notify/notify'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body><Notification/></body>
    </html>
  )
}
