import Button from '@/Components/Button'
import Guest from '@/Layouts/Guest'
import { Link, useForm } from '@inertiajs/react'

export default ({ status }) => {
    const { post, processing } = useForm()

    const submit = (e) => {
        e.preventDefault()

        post(route('verification.send'))
    }

    return (
        <Guest title="Email Verification">
            <div className="mb-4 text-sm text-gray-600">
                Thanks for signing up! Before getting started, could you verify
                your email address by clicking on the link we just emailed to
                you? If you didn't receive the email, we will gladly send you
                another.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    A new verification link has been sent to the email address
                    you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between mt-4">
                    <Button processing={processing}>
                        Resend Verification Email
                    </Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Log Out
                    </Link>
                </div>
            </form>
        </Guest>
    )
}
