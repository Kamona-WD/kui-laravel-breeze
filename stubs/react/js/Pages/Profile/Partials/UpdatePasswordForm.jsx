import { useRef } from 'react'
import { useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import Button from '@/Components/Button'

export default function UpdatePasswordForm({ className }) {
    const passwordInput = useRef()
    const currentPasswordInput = useRef()

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    })

    const updatePassword = (e) => {
        e.preventDefault()

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: () => {
                if (errors.password) {
                    reset('password', 'password_confirmation')
                    passwordInput.current.focus()
                }

                if (errors.current_password) {
                    reset('current_password')
                    currentPasswordInput.current.focus()
                }
            },
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <form onSubmit={updatePassword} className="mt-6 space-y-6">
                <div>
                    <Label
                        for="current_password"
                        value="Current Password"
                    />

                    <Input
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        handleChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label for="password" value="New Password" />

                    <Input
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        handleChange={(e) =>
                            setData('password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <Label
                        for="password_confirmation"
                        value="Confirm Password"
                    />

                    <Input
                        id="password_confirmation"
                        value={data.password_confirmation}
                        handleChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button processing={processing}>Save</Button>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
