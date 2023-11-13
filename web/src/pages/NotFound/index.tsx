export default function Custom404() {
  return (
    <section className="flex h-screen w-screen flex-col items-center justify-center px-12">
      <h1 className="text-center mb-10 text-3xl font-semibold sm:text-4xl md:text-4xl">
        Não encontramos a página que estás à procura...
      </h1>
      <h1 className="text-9xl font-bold text-primary sm:text-[200px] md:text-[220px]">
        404
      </h1>

      <p className="text-center text-2xl font-thin">
        Dica: Experimenta voltar à{" "}
        <a href="/" className="font-normal text-primary">
          Página inicial
        </a>
      </p>
    </section>
  );
}
