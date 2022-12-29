import { useContext } from 'react'
import { GlobalContext } from '@/Layouts/Authenticated'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import Button from '@/Components/Button'
import Dropdown from '@/Components/Dropdown'
import MobileBottomBar from '@/Components/Navbar/MobileBottomBar'

export default ({ auth }) => {
    const { isScrollDown, isScrollUp, isDark, setDarkMode } =
        useContext(GlobalContext)

    return (
        <>
            <nav
                aria-label="Secondary"
                className={`sticky top-0 z-10 flex items-center justify-between px-6 py-4 transition-transform duration-500 bg-white dark:bg-dark-eval-1 ${
                    isScrollDown && '-translate-y-full'
                } ${isScrollUp && 'translate-y-0'}`}
            >
                <div className="flex items-center gap-2">
                    {/* Mobile dark mode button */}
                    <Button
                        iconOnly
                        variant="secondary"
                        type="button"
                        className="md:hidden"
                        srText="Toggle dark mode"
                        onClick={() => {
                            setDarkMode(!isDark)
                        }}
                    >
                        {isDark ? (
                            <SunIcon aria-hidden="true" className="w-6 h-6" />
                        ) : (
                            <MoonIcon aria-hidden="true" className="w-6 h-6" />
                        )}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    {/* Dark mode button */}
                    <Button
                        iconOnly
                        variant="secondary"
                        type="button"
                        className="hidden md:inline-flex"
                        srText="Toggle dark mode"
                        onClick={() => {
                            setDarkMode(!isDark)
                        }}
                    >
                        {isDark ? (
                            <SunIcon aria-hidden="true" className="w-6 h-6" />
                        ) : (
                            <MoonIcon aria-hidden="true" className="w-6 h-6" />
                        )}
                    </Button>

                    {/* User menu */}
                    <Dropdown
                        trigger={
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent rounded-md hover:text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark-eval-1 dark:bg-dark-eval-1 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {auth.user.name}

                                <svg
                                    className="ml-2 -mr-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        }
                    >
                        <Dropdown.Item
                            href={route('profile.edit')}
                            title="Profile"
                        />

                        <Dropdown.Item
                            href={route('logout')}
                            method="post"
                            as="button"
                            title="Log Out"
                        />
                    </Dropdown>
                </div>
            </nav>

            <MobileBottomBar />
        </>
    )
}
