export default function Custom404() {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center px-12">
      <h1 className="text-center mb-10 text-3xl font-semibold sm:text-4xl md:text-4xl">
        Page not found...
      </h1>
      <h1 className="text-9xl font-bold text-primary sm:text-[200px] md:text-[220px]">
        404
      </h1>

      <p className="text-center text-2xl font-thin">
        Return to{" "}
        <a href="/" className="font-normal text-primary">
          HomePage
        </a>
      </p>
    </section>
  );
}
