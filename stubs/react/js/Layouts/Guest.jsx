import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link, Head } from '@inertiajs/react'
import PageFooter from '@/Components/PageFooter'

export default ({ children, title }) => {
    return (
        <>
            <Head title={title} />

            <div className="flex flex-col items-center justify-center min-h-screen gap-6 py-6 bg-gray-100 dark:bg-dark-eval-0">
                <div className="flex-shrink-0">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20" />
                        <span className="sr-only">K UI</span>
                    </Link>
                </div>

                <main className="flex items-center flex-1 w-full sm:max-w-md">
                    <div className="w-full px-6 py-4 overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-dark-eval-1">
                        {children}
                    </div>
                </main>

                <PageFooter />
            </div>
        </>
    )
}
