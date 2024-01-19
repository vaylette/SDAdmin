import Aside from "../_components/aside"
import Header from "../_components/header"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='min-w-screen min-h-screen bg-white-100 relative'>
        <div className='w-full flex flex-row h-full'>
            <Aside />
            <div className='w-full flex flex-col'>
                <Header />
                <div className='w-full h-full p-6'>
                  {children}
                </div>
            </div>
        </div>
      </div>
    )
  }