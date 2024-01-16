
export default function AuthWrapper({
    children, 
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-screen bg-auth bg-no-repeat bg-contain">
            {children}
        </div>
    )
}

