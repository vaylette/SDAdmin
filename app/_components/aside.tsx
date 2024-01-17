'use client'
import Image from 'next/image'
import logo from '../../public/images/vertical_logo.png'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Aside() {
    const pathname = usePathname()
  return (
    <>
      <aside className="min-h-screen lg:w-[354px] 2xl:w-[404px] bg-orange-default flex flex-col items-center px-4">
         <div className="pt-[60px]">
            <Image src={logo} className="w-[159px] h-[91.2px]" alt="SmartDarasa" />
        </div>
        <ul className="flex flex-col pt-14 gap-3 text-lg text-white-default">
            <li>
                <Link href='/dashboard' className={`w-auto h-auto py-[22px] px-4 2xl:px-8 flex flex-row items-center cursor-pointer gap-4 rounded-lg radial ${pathname === '/dashboard' && 'radial_active'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                        <path d="M20 14.9546C20.5523 14.9546 21 15.4023 21 15.9546L21 20.3823C21 20.9346 20.5523 21.3823 20 21.3823L1.10989 21.3823C0.557602 21.3823 0.109886 20.9346 0.109886 20.3823L0.109886 15.9546C0.109886 15.4023 0.557602 14.9546 1.10989 14.9546L20 14.9546Z" fill="white"/>
                        <path d="M11.1619 0.492187C11.7141 0.492187 12.1619 0.939903 12.1619 1.49219L12.1619 11.5442C12.1619 12.0965 11.7141 12.5442 11.1619 12.5442L0.999979 12.5442C0.447695 12.5442 -1.95807e-05 12.0965 -1.95566e-05 11.5442L-2.00709e-05 1.49219C-2.00467e-05 0.939901 0.447695 0.492187 0.99998 0.492187L11.1619 0.492187Z" fill="white"/>
                        <path d="M20.5 7.32178C20.7761 7.32178 21 7.54563 21 7.82178L21 12.0443C21 12.3204 20.7761 12.5443 20.5 12.5443L15.0723 12.5443C14.7961 12.5443 14.5723 12.3204 14.5723 12.0443L14.5723 7.82178C14.5723 7.54563 14.7961 7.32178 15.0723 7.32178L20.5 7.32178Z" fill="white"/>
                        <path d="M20.5 0.492188C20.7761 0.492188 21 0.716045 21 0.992187V5.21472C21 5.49086 20.7761 5.71472 20.5 5.71472L15.0723 5.71472C14.7961 5.71472 14.5723 5.49086 14.5723 5.21472L14.5723 0.992187C14.5723 0.716045 14.7961 0.492188 15.0723 0.492188L20.5 0.492188Z" fill="white"/>
                    </svg>
                    <span>Overview</span>
                </Link>
            </li>
            <li>
                <Link href='/dashboard/user-management' className={`w-auto h-auto py-[22px] px-4 2xl:px-8 flex flex-row items-center gap-4 cursor-pointer radial rounded-lg ${pathname === '/dashboard/user-management' && 'radial_active'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="23" viewBox="0 0 25 23" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.2856 5.35711C14.2856 8.31576 11.8872 10.7142 8.92852 10.7142C5.96987 10.7142 3.57141 8.31576 3.57141 5.35711C3.57141 2.39846 5.96987 0 8.92852 0C11.8872 0 14.2856 2.39846 14.2856 5.35711ZM8.92852 12.4999C3.99743 12.4999 0 16.4973 0 21.4284C0 21.9215 0.399743 22.3212 0.892852 22.3212H16.9642C17.4573 22.3212 17.857 21.9215 17.857 21.4284C17.857 16.4973 13.8596 12.4999 8.92852 12.4999ZM24.1071 22.3212H19.9599C20.0441 22.0383 20.0893 21.7386 20.0893 21.4284C20.0893 17.7836 18.3422 14.547 15.6398 12.5101C15.7828 12.5033 15.9267 12.4999 16.0715 12.4999C21.0026 12.4999 25 16.4973 25 21.4284C25 21.9215 24.6003 22.3212 24.1071 22.3212ZM16.0715 10.7142C15.5327 10.7142 15.0125 10.6347 14.5219 10.4867C15.7614 9.13593 16.5179 7.33487 16.5179 5.35711C16.5179 3.37935 15.7614 1.57829 14.5219 0.227523C15.0125 0.0795418 15.5327 0 16.0715 0C19.0301 0 21.4286 2.39846 21.4286 5.35711C21.4286 8.31576 19.0301 10.7142 16.0715 10.7142Z" fill="white"/>
                    </svg>
                    <span>User Management</span>
                </Link>    
            </li>
            <li>
                <Link href='/dashboard/content-management' className={`w-auto h-auto py-[22px] px-4 2xl:px-8 flex flex-row items-center gap-4 cursor-pointer radial rounded-lg ${pathname === '/dashboard/content-management' && 'radial_active'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                        <path d="M14.4465 0.0163865C13.7157 -0.0985971 13.0306 0.403804 12.9163 1.13853C12.8019 1.87326 13.3016 2.56208 14.0324 2.67707C18.7284 3.41597 22.3214 7.50355 22.3214 12.4324C22.3214 17.8859 17.9242 22.3069 12.5 22.3069C8.35466 22.3069 4.80601 19.7244 3.36502 16.0674C3.09259 15.3761 2.31427 15.0376 1.6266 15.3115C0.938933 15.5854 0.602317 16.368 0.874749 17.0593C2.70661 21.7083 7.21932 25 12.5 25C19.4035 25 25 19.3733 25 12.4324C25 6.15648 20.4259 0.957215 14.4465 0.0163865Z" fill="white"/>
                        <path d="M11.0068 1.05229C11.1912 1.77249 10.76 2.5066 10.0436 2.69196C9.59255 2.80869 9.15401 2.95687 8.73042 3.13405C8.04749 3.41971 7.26355 3.09467 6.97943 2.40805C6.6953 1.72144 7.01859 0.933251 7.70152 0.647591C8.24154 0.421707 8.80075 0.232752 9.37598 0.0838969C10.0923 -0.101469 10.8225 0.332097 11.0068 1.05229Z" fill="white"/>
                        <path d="M5.68785 3.2655C6.20306 3.79909 6.19047 4.65158 5.65975 5.16957C4.99689 5.81652 4.42473 6.55631 3.96402 7.36759C3.59728 8.01341 2.77925 8.23805 2.13691 7.86932C1.49456 7.5006 1.27114 6.67814 1.63788 6.03232C2.22431 4.99962 2.9519 4.05916 3.79402 3.23724C4.32475 2.71925 5.17264 2.7319 5.68785 3.2655Z" fill="white"/>
                        <path d="M1.63601 9.3419C2.36844 9.44569 2.87851 10.1268 2.77528 10.8632C2.7116 11.3174 2.67858 11.7822 2.67858 12.2555C2.67858 12.9992 2.07896 13.602 1.33929 13.602C0.59962 13.602 0 12.9992 0 12.2555C0 11.6561 0.0418361 11.0657 0.122915 10.4873C0.226147 9.75094 0.903585 9.23811 1.63601 9.3419Z" fill="white"/>
                        <path d="M8.03573 15.8112V9.05347C8.03573 7.71882 9.43272 6.85077 10.62 7.44764L17.3414 10.8265C18.6575 11.4881 18.6575 13.3765 17.3414 14.0381L10.62 17.417C9.43272 18.0139 8.03573 17.1458 8.03573 15.8112Z" fill="white"/>
                    </svg>
                    <span>Content Management</span>
                </Link>
            </li>
        </ul>
      </aside>
    </>
  )
}
