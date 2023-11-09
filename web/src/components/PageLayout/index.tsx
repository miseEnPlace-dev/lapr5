import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({children}) => {
  return (
    <div>
      <div>Navbar</div>
      {children}
    </div>
  )
}

export default PageLayout