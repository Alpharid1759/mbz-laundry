export default function PageHero({ title, text }: { title: string; text?: string }) {
  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="container-x py-14 sm:py-20">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">{text}</p>}
      </div>
    </section>
  );
}
