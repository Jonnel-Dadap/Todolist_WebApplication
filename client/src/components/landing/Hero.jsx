export default function Hero() {
    return (
        <section id="home" className="min-h-[80vh] flex items-center px-8 py-16">
            <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
                <div>
                    <p>Simple Task Management</p>

                    <h1 className="mt-2 text-5xl font-bold">
                        Get Things Done.
                    </h1>

                    <p className="mt-4 max-w-lg">
                        Organize your tasks, stay focused, and keep track of what matters.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <a href="/register">Get Started</a>
                        <a href="#features">Learn More</a>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="flex h-80 w-full max-w-md items-center justify-center border rounded-lg ">
                        <p>Todo App Preview</p>
                    </div>
                </div>

            </div>
        </section>
    );
}