<script setup>
import { useForm } from '@inertiajs/vue3'
import Button from '@/Components/Button'
import GuestLayout from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'

defineProps({
    status: String
})

const form = useForm({
    email: ''
})

const submit = () => {
    form.post(route('password.email'))
}
</script>

<template>
    <GuestLayout title="Forgot Password">
        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
        </div>

        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <ValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="space-y-2">
                    <Label for="email" value="Email" />

                    <Input icon="tabler--mail" id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autofocus autocomplete="username" />
                </div>

                <Button 
                    class="justify-center gap-2 w-full" 
                    :disabled="form.processing" 
                    start-icon="tabler--location"
                    text="Email Password Reset Link"
                />
            </div>
        </form>
    </GuestLayout>
</template>
