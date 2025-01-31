<script setup>
import AuthenticatedLayout from '@/Layouts/Authenticated'
import Button from '@/Components/Button'
</script>

<template>
    <AuthenticatedLayout title="Dashboard">
        <template #header>
            <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h2 class="text-xl font-semibold leading-tight">
                    Dashboard
                </h2>

                <Button
                    external
                    variant="black"
                    target="_blank"
                    class="max-w-xs"
                    href="https://github.com/kamona-wd/kui-laravel-breeze"
                    start-icon="tabler--brand-github"
                    text="Star on Github"
                />
            </div>
        </template>

        <div class="p-6 overflow-hidden bg-white rounded-md shadow-md dark:bg-dark-1">
            You're logged in!
        </div>
    </AuthenticatedLayout>
</template>
