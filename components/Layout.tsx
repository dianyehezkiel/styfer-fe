import { ReactElement } from 'react'
import BottomNav from './BottomNav'
import TopBar from './TopBar'

export default function AppLayout({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <>
      <TopBar />
      <main>{children}</main>
      <BottomNav />
    </>
  )
}
