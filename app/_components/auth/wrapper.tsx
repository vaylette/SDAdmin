
export default function AuthWrapper({
    children, 
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full h-full bg-white-default">
            {children}
        </div>
    )
}

