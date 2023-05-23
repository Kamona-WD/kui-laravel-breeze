<script setup>
import { useForm } from '@inertiajs/vue3'
import { LockClosedIcon } from '@heroicons/vue/outline'
import InputIconWrapper from '@/Components/InputIconWrapper.vue'
import Button from '@/Components/Button.vue'
import GuestLayout from '@/Layouts/Guest.vue'
import Input from '@/Components/Input.vue'
import Label from '@/Components/Label.vue'
import ValidationErrors from '@/Components/ValidationErrors.vue'

const form = useForm({
    password: ''
})

const submit = () => {
    form.post(route('password.confirm'), {
        onFinish: () => form.reset(),
    })
}
</script>

<template>
    <GuestLayout title="Confirm Password">
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This is a secure area of the application. Please confirm your password before continuing.
        </div>

        <ValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="grid gap-4">
                <div class="space-y-2">
                    <Label for="password" value="Password" />
                    <InputIconWrapper>
                        <template #icon>
                            <LockClosedIcon aria-hidden="true" class="w-5 h-5" />
                        </template>
                        <Input withIcon id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="current-password" autofocus />
                    </InputIconWrapper>
                </div>

                <div>
                    <Button class="w-full justify-center" :disabled="form.processing">
                        Confirm
                    </Button>
                </div>
            </div>
        </form>
    </GuestLayout>
</template>
