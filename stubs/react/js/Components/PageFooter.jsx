import ApplicationLogo from './ApplicationLogo'

export default () => {
    return (
        <footer className="flex w-full flex-shrink-0 flex-col items-center gap-2 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-1">
            <ApplicationLogo className="h-6 w-auto" />

            <p className="text-sm text-gray-500 dark:text-gray-400">
                &#169;
                <span>{new Date().getFullYear()}</span> K UI, All rights
                reserved
            </p>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>Hand-crafted & Made with</span>
            <div className="inline-flex">
                <span className="sr-only">love</span>
                <span
                    aria-hidden="true"
                    className="iconify h-5 w-5 text-red-500 tabler--heart-filled"
                ></span>
            </div>

            <span>by</span>

            <a
                href="https://github.com/Kamona-WD"
                target="_blank"
                className="text-blue-600 hover:underline"
            >
                Ahmed Kamel
            </a>
        </div>
    </footer>
    )
}
