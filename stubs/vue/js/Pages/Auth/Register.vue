<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import GuestLayout from '@/Layouts/Guest'
import InputIconWrapper from '@/Components/InputIconWrapper'
import Input from '@/Components/Input'
import Label from '@/Components/Label'
import ValidationErrors from '@/Components/ValidationErrors'
import Button from '@/Components/Button'

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
})

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    })
}
</script>

<template>
    <GuestLayout title="Register">
        <ValidationErrors class="mb-4" />

        <form @submit.prevent="submit">
            <div class="grid gap-6">
                <div class="space-y-2">
                    <Label for="name" value="Name" />

                    <Input icon="tabler--user" id="name" type="text" placeholder="Name" class="block w-full" v-model="form.name" required autofocus autocomplete="name" />
                </div>

                <div class="space-y-2">
                    <Label for="email" value="Email" />

                    <Input icon="tabler--mail" id="email" type="email" class="block w-full" placeholder="Email" v-model="form.email" required autocomplete="username" />
                </div>

                <div class="space-y-2">
                    <Label for="password" value="Password" />

                    <Input icon="tabler--lock" id="password" type="password" class="block w-full" placeholder="Password" v-model="form.password" required autocomplete="new-password" />
                </div>

                <div class="space-y-2">
                    <Label for="password_confirmation" value="Confirm Password" />

                    <Input icon="tabler--lock" id="password_confirmation" type="password" class="block w-full" placeholder="Confirm Password" v-model="form.password_confirmation" required autocomplete="new-password" />
                </div>

                <Button 
                    class="justify-center gap-2 w-full" 
                    :disabled="form.processing" 
                    start-icon="tabler--user-plus"
                    text="Register"
                />

                <p class="text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?
                    <Link :href="route('login')" class="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>

        </form>
    </GuestLayout>
</template>
