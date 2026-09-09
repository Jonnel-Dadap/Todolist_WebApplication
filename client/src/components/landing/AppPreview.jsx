function AppPreview() {
  return (
    <section id="app-preview" className="px-8 py-20">
      
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h2 className="text-3xl font-bold">
          See Your Tasks in One Place
        </h2>

        <p className="mt-3">
          A simple workspace where you can manage your tasks.
        </p>
      </div>

      
      <div className="mx-auto max-w-3xl">
        <div className="border p-6 rounded-lg">
          <h3 className="text-xl font-semibold">
            My Tasks
          </h3>

          <ul className="mt-6 flex flex-col gap-3">
            <li className="border p-3 rounded-md">
              Finish school project
            </li>

            <li className="border p-3 rounded-md">
              Review JavaScript
            </li>

            <li className="border p-3 rounded-md">
              Work on Todo App
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AppPreview;