import { useState, createContext, useEffect } from 'react'
import Navbar from '@/Components/Navbar/Navbar'
import Sidebar from '@/Components/Sidebar/Sidebar'
import PageFooter from '@/Components/PageFooter'
import { Head } from '@inertiajs/react'
import { useDarkMode } from '@/Hooks'

export const GlobalContext = createContext()

export default ({ auth, header, children, title }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024)
    const [isSidebarHovered, setSidebarHovered] = useState(false)
    const [isScrollDown, setScrollDown] = useState(false)
    const [isScrollUp, setScrollUp] = useState(false)
    const [isDark, setDarkMode] = useDarkMode()

    const handleSidebarHover = (value) => {
        setSidebarHovered(value)
    }

    const handleWindowResize = () => {
        if (window.innerWidth <= 1024) {
            setSidebarOpen(false)
        } else {
            setSidebarOpen(true)
        }
    }

    let lastScrollTop = 0

    const handleScroll = () => {
        let st = window.pageYOffset || document.documentElement.scrollTop
        if (st > lastScrollTop) {
            // downscroll
            setScrollDown(true)
            setScrollUp(false)
        } else {
            // upscroll
            setScrollDown(false)
            setScrollUp(true)
            if (st == 0) {
                //  reset
                setScrollDown(false)
                setScrollUp(true)
            }
        }
        lastScrollTop = st <= 0 ? 0 : st // For Mobile or negative scrolling
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isSidebarOpen,
                isSidebarHovered,
                isScrollDown,
                isScrollUp,
                setSidebarOpen,
                setSidebarHovered,
                setScrollDown,
                setScrollUp,
                handleSidebarHover,
                isDark,
                setDarkMode,
            }}
        >
            <Head title={title} />

            <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-dark-0 dark:text-gray-100">
                <Sidebar />

                <div
                    className={`flex min-h-screen flex-1 flex-col transition-[margin] duration-150 md:ms-16 ${
                        isSidebarOpen && 'lg:ml-64'
                    }`}
                >
                    <Navbar auth={auth} />

                    <div className="container mx-auto flex flex-1 flex-col items-center gap-4 p-4 sm:gap-6 sm:p-6">
                        {header && <header className="w-full flex-shrink-0">{header}</header>}

                        <main className="w-full flex-1">{children}</main>

                        <PageFooter />
                    </div>
                </div>
            </div>
        </GlobalContext.Provider>
    )
}
