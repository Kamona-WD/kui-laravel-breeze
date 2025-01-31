<script setup>
import { useForm } from '@inertiajs/vue3'
import Button from '@/Components/Button'
import GuestLayout from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'

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

                    <Input icon="tabler--lock" id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="current-password" autofocus />
                </div>

                <Button 
                    class="w-full" 
                    :disabled="form.processing" 
                    text="Confirm"
                />
            </div>
        </form>
    </GuestLayout>
</template>
