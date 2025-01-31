<script setup>
import { nextTick, ref } from 'vue'
import { useForm } from '@inertiajs/vue3'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import Modal from '@/Components/Modal'
import Button from '@/Components/Button'

const confirmingUserDeletion = ref(false)
const passwordInput = ref(null)

const form = useForm({
    password: '',
})

const confirmUserDeletion = () => {
    confirmingUserDeletion.value = true

    nextTick(() => passwordInput.value.focus())
}

const deleteUser = () => {
    form.delete(route('profile.destroy'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
        onError: () => passwordInput.value.focus(),
        onFinish: () => form.reset(),
    })
}

const closeModal = () => {
    confirmingUserDeletion.value = false

    form.reset()
}
</script>

<template>
    <section class="space-y-6">
        <header>
            <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Delete Account
            </h2>

            <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will
                be permanently deleted. Before deleting your account, please
                download any data or information that you wish to retain.
            </p>
        </header>

        <Button 
            variant="danger" 
            @click="confirmUserDeletion"
            text="Delete Account"
        />

        <Modal :show="confirmingUserDeletion" @close="closeModal">
            <div class="p-6">
                <h2
                    class="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                    Are you sure you want to delete your account?
                </h2>

                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Please enter your password to
                    confirm you would like to permanently delete your account.
                </p>

                <div class="mt-6 grid gap-2">
                    <Label for="password" value="Password" class="sr-only" />

                    <Input
                        icon="tabler--lock"
                        id="password"
                        ref="passwordInput"
                        v-model="form.password"
                        type="password"
                        placeholder="Password"
                        @keyup.enter="deleteUser"
                    />

                    <InputError :message="form.errors.password" />
                </div>

                <div class="mt-6 flex gap-4 justify-end">
                    <Button 
                        variant="transparent" 
                        @click="closeModal"
                        text="Cancel"
                    />

                    <Button
                        variant="danger"
                        :disabled="form.processing"
                        @click="deleteUser"
                        text="Delete Account"
                    />
                </div>
            </div>
        </Modal>
    </section>
</template>
