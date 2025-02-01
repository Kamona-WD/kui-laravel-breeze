import { useContext } from 'react'
import { Link } from '@inertiajs/react'
import Button from '@/Components/Button'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { GlobalContext } from '@/Layouts/Authenticated'

export default () => {
    const { isScrollDown, isScrollUp, setSidebarOpen } =
        useContext(GlobalContext)

    return (
        <div
            className={`fixed z-10 inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 transition-transform duration-500 bg-white sm:px-6 md:hidden dark:bg-dark-1 ${
                isScrollDown && 'translate-y-full'
            } ${isScrollUp && 'translate-y-0'}`}
        >
            <Button 
                type="button" 
                variant="transparent" 
                srText="Search" 
                icon="tabler--search"
            />
                
            <Link href={route('dashboard')}>
                <ApplicationLogo className="w-10 h-10" />
                <span className="sr-only">Dashboard</span>
            </Link>

            <Button 
                type="button" 
                variant="transparent" 
                srText="Open Sidebar" 
                icon="tabler--menu-3"
                onClick={() => {
                    setSidebarOpen(true)
                }}
            />
        </div>
    )
}
