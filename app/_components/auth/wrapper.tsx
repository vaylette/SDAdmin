
export default function AuthWrapper({
    children, 
    path,
}: {
    children: React.ReactNode,
    path: string
}) {
    return (
        <div className="w-full h-screen bg-auth bg-no-repeat bg-contain">
            {children}
        </div>
    )
}

