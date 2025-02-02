import { createContext } from 'react'
import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link, Head } from '@inertiajs/react'
import PageFooter from '@/Components/PageFooter'
import { useDarkMode } from '@/Hooks'
import Button from '@/Components/Button'

export const GlobalContext = createContext()

export default ({ children, title }) => {
    const [isDark, setDarkMode] = useDarkMode()

    return (
        <GlobalContext.Provider
            value={{
                isDark,
                setDarkMode,
            }}
        >
            <Head title={title} />

            <div className="bg-gray-100 text-gray-900 dark:bg-dark-0 dark:text-gray-100">
                <div className="container mx-auto min-h-screen flex flex-col items-center gap-24 p-4 sm:p-6">
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <ApplicationLogo className="w-20 h-20" />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>

                    <main className="flex items-center flex-1 w-full sm:max-w-md">
                        <div className="w-full px-6 py-4 overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-dark-1">
                            {children}
                        </div>
                    </main>

                    <PageFooter />

                    <div className="fixed right-10 top-10">
                        <Button
                            variant="transparent"
                            type="button"
                            srText="Toggle dark mode"
                            onClick={() => {
                                setDarkMode(!isDark)
                            }}
                            className="p-2"
                        >
                            {isDark ? (
                                <span aria-hidden="true" className="iconify tabler--sun w-6 h-6"></span>
                            ) : (
                                <span aria-hidden="true" className="iconify tabler--moon w-6 h-6"></span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </GlobalContext.Provider>
    )
}
