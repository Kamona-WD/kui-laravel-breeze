import { defineComponent, ref, withModifiers, Transition } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import Button from '@/Components/Button'

export default defineComponent({
    setup() {
        const passwordInput = ref(null)
        const currentPasswordInput = ref(null)

        const form = useForm({
            current_password: '',
            password: '',
            password_confirmation: '',
        })

        const updatePassword = () => {
            form.put(route('password.update'), {
                preserveScroll: true,
                onSuccess: () => form.reset(),
                onError: () => {
                    if (form.errors.password) {
                        form.reset('password', 'password_confirmation')
                        passwordInput.value.focus()
                    }
                    if (form.errors.current_password) {
                        form.reset('current_password')
                        currentPasswordInput.value.focus()
                    }
                },
            })
        }

        return () => (
            <section>
                <header>
                    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Update Password
                    </h2>

                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Ensure your account is using a long, random password to
                        stay secure.
                    </p>
                </header>

                <form
                    onSubmit={withModifiers(updatePassword, ['prevent'])}
                    class="mt-6 space-y-6"
                >
                    <div class="space-y-2">
                        <Label
                            for="current_password"
                            value="Current Password"
                        />

                        <Input
                            id="current_password"
                            ref="currentPasswordInput"
                            v-model={form.current_password}
                            type="password"
                            class="block w-full"
                            autocomplete="current-password"
                        />

                        <InputError
                            message={form.errors.current_password}
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="password" value="New Password" />

                        <Input
                            id="password"
                            ref="passwordInput"
                            v-model={form.password}
                            type="password"
                            class="block w-full"
                            autocomplete="new-password"
                        />

                        <InputError
                            message={form.errors.password}
                        />
                    </div>

                    <div class="space-y-2">
                        <Label
                            for="password_confirmation"
                            value="Confirm Password"
                        />

                        <Input
                            id="password_confirmation"
                            v-model={form.password_confirmation}
                            type="password"
                            class="block w-full"
                            autocomplete="new-password"
                        />

                        <InputError
                            message={form.errors.password_confirmation}
                        />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button disabled={form.processing}>Save</Button>

                        <Transition
                            enter-from-class="opacity-0"
                            leave-to-class="opacity-0"
                            class="transition ease-in-out"
                        >
                            {form.recentlySuccessful && (
                                <p
                                    class="text-sm text-gray-600 dark:text-gray-400"
                                >
                                    Saved.
                                </p>
                            )}
                        </Transition>
                    </div>
                </form>
            </section>
        )
    },
})
