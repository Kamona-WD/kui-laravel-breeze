import { useForm } from '@inertiajs/react'
import { MailIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import Guest from '@/Layouts/Guest'
import ValidationErrors from '@/Components/ValidationErrors'
import InputIconWrapper from '@/Components/InputIconWrapper'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import Button from '@/Components/Button'

export default ({ status }) => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.email'))
    }

    return (
        <Guest title="Forgot Password">
            <div className="mb-4 text-sm leading-normal text-gray-500">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" value="Email" />

                        <InputIconWrapper
                            icon={
                                <MailIcon
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <Input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                className="block w-full mt-1"
                                isFocused={true}
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    <Button
                        className="justify-center w-full gap-2"
                        processing={processing}
                    >
                        <PaperAirplaneIcon
                            aria-hidden="true"
                            className="w-6 h-6"
                        />
                        <span>Email Password Reset Link</span>
                    </Button>
                </div>
            </form>
        </Guest>
    )
}
