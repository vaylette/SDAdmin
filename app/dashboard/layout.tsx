import Aside from "../_components/aside"
import Header from "../_components/header"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='min-w-screen min-h-screen bg-white-100'>
        <div className='w-full flex flex-row h-full'>
            <Aside />
            <div className='w-full flex flex-col'>
                <Header />
                {children}
            </div>
        </div>
      </div>
    )
  }