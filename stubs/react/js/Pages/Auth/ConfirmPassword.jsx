import { useEffect } from 'react'
import Button from '@/Components/Button'
import Guest from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'
import { useForm } from '@inertiajs/react'
import InputIconWrapper from '@/Components/InputIconWrapper'
import { LockClosedIcon } from '@heroicons/react/outline'

export default () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    })

    useEffect(() => {
        return () => {
            reset('password')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route('password.confirm'))
    }

    return (
        <Guest title="Confirm Password">
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                This is a secure area of the application. Please confirm your
                password before continuing.
            </div>

            <ValidationErrors errors={errors} />

            <form onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label forInput="password" value="Password" />

                        <InputIconWrapper
                            icon={
                                <LockClosedIcon
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                />
                            }
                        >
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={data.password}
                                className="block w-full mt-1"
                                isFocused={true}
                                handleChange={onHandleChange}
                                withIcon
                            />
                        </InputIconWrapper>
                    </div>

                    <Button
                        className="justify-center w-full"
                        processing={processing}
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </Guest>
    )
}
