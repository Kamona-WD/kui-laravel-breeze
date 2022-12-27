import Authenticated from '@/Layouts/Authenticated'
import Button from '@/Components/Button'
import { GithubIcon } from '@/Components/Icons/brands'

export default (props) => {
    return (
        <Authenticated
            title="Dashboard"
            auth={props.auth}
            errors={props.errors}
            header={
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <h2 className="text-xl font-semibold leading-tight">
                        Dashboard
                    </h2>

                    <Button
                        external
                        variant="black"
                        target="_blank"
                        className="justify-center gap-2 max-w-xs"
                        href="https://github.com/kamona-wd/kui-laravel-breeze"
                    >
                        <GithubIcon aria-hidden="true" className="w-6 h-6" />
                        <span>Star on Github</span>
                    </Button>
                </div>
            }
        >
            <div className="p-6 overflow-hidden bg-white rounded-md shadow-md dark:bg-dark-eval-1">
                You're logged in!
            </div>
        </Authenticated>
    )
}
