function CTA() {
  return (
    <section
      id="cta"
      className="px-8 py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold">
          Ready to Get Organized?
        </h2>

        <p className="mt-4">
          Start managing your tasks and keep everything organized in one place.
        </p>

        <a
          href="/register"
          className="mt-6 inline-block"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

export default CTA;