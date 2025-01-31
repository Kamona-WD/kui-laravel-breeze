<script setup>
import { useForm } from '@inertiajs/vue3'
import Button from '@/Components/Button'
import GuestLayout from '@/Layouts/Guest'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'

const props = defineProps({
    email: String,
    token: String,
})

const form = useForm({
    token: props.token,
    email: props.email,
    password: '',
    password_confirmation: '',
})

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
    <GuestLayout title="Reset Password">
        <ValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="grid gap-4">
                <div class="space-y-2">
                    <Label for="email" value="Email" />

                    <Input icon="tabler--mail" id="email" type="email" placeholder="Email" class="block w-full" v-model="form.email" required autofocus autocomplete="username" />
                </div>

                <div class="space-y-2">
                    <Label for="password" value="Password" />

                    <Input icon="tabler--lock" id="password" type="password" placeholder="Password" class="block w-full" v-model="form.password" required autocomplete="new-password" />
                </div>

                <div class="space-y-2">
                    <Label for="password_confirmation" value="Confirm Password" />

                    <Input icon="tabler--lock" id="password_confirmation" type="password" placeholder="Confirm Password" class="block w-full" v-model="form.password_confirmation" required autocomplete="new-password" />
                </div>

                <Button 
                    class="w-full" 
                    :disabled="form.processing" 
                    text="Reset Password"
                />
            </div>
        </form>
    </GuestLayout>
</template>
