import { useContext } from 'react'
import { Link } from '@inertiajs/react'
import { SearchIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Button from '@/Components/Button'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { GlobalContext } from '@/Layouts/Authenticated'

export default () => {
    const { isScrollDown, isScrollUp, isSidebarOpen, setSidebarOpen } =
        useContext(GlobalContext)

    return (
        <div
            className={`fixed inset-x-0 bottom-0 flex items-center justify-between px-4 py-4 transition-transform duration-500 bg-white sm:px-6 md:hidden dark:bg-dark-eval-1 ${
                isScrollDown && 'translate-y-full'
            } ${isScrollUp && 'translate-y-0'}`}
        >
            <Button iconOnly variant="secondary" type="button" srText="Search">
                <SearchIcon aria-hidden="true" className="w-6 h-6" />
            </Button>

            <Link href={route('dashboard')}>
                <ApplicationLogo className="w-10 h-10" />
                <span className="sr-only">K UI</span>
            </Link>

            <Button
                onClick={() => {
                    setSidebarOpen(true)
                }}
                iconOnly
                variant="secondary"
                type="button"
                srText="Open Sidebar"
            >
                {!isSidebarOpen ? (
                    <MenuIcon aria-hidden="true" className="w-6 h-6" />
                ) : (
                    <XIcon aria-hidden="true" className="w-6 h-6" />
                )}
            </Button>
        </div>
    )
}
