function Features() {
  return (
    <section id="features" className="px-8 py-20">
     
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold">
          Features
        </h2>

        <p className="mt-3">
          Everything you need to organize and manage your daily tasks.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">

        <div className="border p-6 rounded-md">
          <h3 className="text-xl font-semibold">
            Create Tasks
          </h3>

          <p className="mt-3">
            Easily create or add tasks that you need to accomplish.
          </p>
        </div>

        <div className="border p-6 rounded-md ">
          <h3 className="text-xl font-semibold">
            Track Progress
          </h3>

          <p className="mt-3">
            Keep track of your completed and unfinished tasks.
          </p>
        </div>

        <div className="border p-6 rounded-md">
          <h3 className="text-xl font-semibold">
            Stay Organized
          </h3>

          <p className="mt-3">
            Organize your tasks and manage your daily activities.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;