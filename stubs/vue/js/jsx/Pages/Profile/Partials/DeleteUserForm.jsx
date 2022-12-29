import { defineComponent, nextTick, ref, withKeys } from 'vue'
import { useForm } from '@inertiajs/inertia-vue3'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import Modal from '@/Components/Modal'
import Button from '@/Components/Button'

export default defineComponent({
    setup() {
        const confirmingUserDeletion = ref(false)
        const passwordInput = ref(null)

        const form = useForm({
            password: '',
        })

        const confirmUserDeletion = () => {
            confirmingUserDeletion.value = true

            nextTick(() => passwordInput.value?.$el.focus())
        }

        const deleteUser = () => {
            form.delete(route('profile.destroy'), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => passwordInput.value?.$el.focus(),
                onFinish: () => form.reset(),
            })
        }

        const closeModal = () => {
            confirmingUserDeletion.value = false

            form.reset()
        }

        return () => (
            <section class="space-y-6">
                <header>
                    <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Delete Account
                    </h2>

                    <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting your
                        account, please download any data or information that
                        you wish to retain.
                    </p>
                </header>

                <Button
                    variant="danger"
                    onClick={() => {
                        confirmUserDeletion()
                    }}
                >
                    Delete Account
                </Button>

                <Modal
                    show={confirmingUserDeletion.value}
                    onClose={() => {
                        closeModal()
                    }}
                >
                    <div class="p-6">
                        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Are you sure you want to delete your account?
                        </h2>

                        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            Once your account is deleted, all of its resources
                            and data will be permanently deleted. Please enter
                            your password to confirm you would like to
                            permanently delete your account.
                        </p>

                        <div class="mt-6 space-y-2">
                            <Label
                                for="password"
                                value="Password"
                                class="sr-only"
                            />

                            <Input
                                id="password"
                                ref={passwordInput}
                                v-model={form.password}
                                type="password"
                                class="block w-3/4"
                                placeholder="Password"
                                onKeyup={withKeys(deleteUser, ['enter'])}
                            />

                            <InputError
                                message={form.errors.password}
                            />
                        </div>

                        <div class="mt-6 flex justify-end gap-3">
                            <Button
                                variant="secondary"
                                onClick={() => {
                                    closeModal()
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="danger"
                                disabled={form.processing}
                                onClick={() => {
                                    deleteUser()
                                }}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </Modal>
            </section>
        )
    },
})
