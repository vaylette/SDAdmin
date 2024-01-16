
export default function AuthWrapper({
    children, 
    route,
}: {
    children: React.ReactNode,
    route: string
}) {
    return (
        <div className="w-full h-screen bg-auth bg-no-repeat bg-contain">
            {children}
        </div>
    )
}

