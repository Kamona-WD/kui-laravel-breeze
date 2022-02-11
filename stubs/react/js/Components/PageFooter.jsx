import { HeartIcon } from '@heroicons/react/solid';

export default () => {
    return (
        <footer className="flex-shrink-0 px-6 py-4">
            <p className="flex items-center justify-center gap-1 text-sm text-gray-600">
                <span>Made with</span>
                <span>
                    <HeartIcon
                        aria-hidden="true"
                        className="w-6 h-6 text-red-500"
                    />
                    <span className="sr-only">Love</span>
                </span>
                <span>by</span>
                <a
                    href="https://github.com/Kamona-WD"
                    target="_blank"
                    className="text-blue-600 hover:underline"
                >
                    Ahmed Kamel
                </a>
            </p>
        </footer>
    );
};
