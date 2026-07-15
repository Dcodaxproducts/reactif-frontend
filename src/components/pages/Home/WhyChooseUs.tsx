import Image from "next/image";

const reasons = [
  {
    image: "/assets/home/why-choose/reactivity.png",
    imageAlt: "Fast reaction reference visual",
    title: "Réactivité légendaire",
    description: "Pas de panique ! Nous nous adaptons à vos deadlines",
  },
  {
    image: "/assets/home/why-choose/attention.png",
    imageAlt: "Eye-catching reaction reference visual",
    title: "Des créations qui attirent l'œil",
    description:
      "On ne peut pas garantir que les gens regarderont la route... mais votre pub, oui !",
  },
  {
    image: "/assets/home/why-choose/covering.png",
    imageAlt: "Vehicle covering reference visual",
    title: "Le covering, c'est notre terrain de jeu",
    description:
      "Nous transformons vos véhicules en véritables ambassadeurs de votre marque.",
  },
  {
    image: "/assets/home/why-choose/quality.png",
    imageAlt: "Quality reference visual",
    title: "Une qualité qui tient la route",
    description:
      "Des matériaux professionnels qui vieillissent mieux que certaines tendances TikTok.",
  },
  {
    image: "/assets/home/why-choose/support.png",
    imageAlt: "Human support reference visual",
    title: "Un accompagnement humain",
    description:
      "Si une idée n'est pas bonne, on vous le dira. Même si elle vient de votre cousin qui s'y connaît en design sur caneva",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-black px-6 py-16 text-white sm:px-10 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="mb-14 max-w-xs text-[28px] leading-[1.05] font-black tracking-[-0.04em] uppercase md:mb-16 md:text-[34px]">
          WHY CHOOSE
          <br />
          RÉACTIFPUB?
        </h2>

        <div className="space-y-14 md:space-y-18">
          {reasons.map((reason) => (
            <article
              key={reason.title}
              className="grid items-center gap-6 md:grid-cols-[220px_minmax(150px,220px)_56px_minmax(280px,1fr)] md:gap-10 lg:gap-16"
            >
              <div className="relative h-[112px] w-full max-w-[220px] overflow-hidden bg-zinc-950 shadow-[0_1px_0_rgba(255,255,255,0.22)] md:h-[118px]">
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              </div>

              <h3 className="text-[19px] leading-[1.05] font-extrabold tracking-[-0.02em] md:text-[20px]">
                {reason.title}
              </h3>

              <span className="hidden text-5xl leading-none font-light md:block" aria-hidden="true">
                →
              </span>

              <p className="max-w-[430px] text-[18px] leading-[1.12] font-medium tracking-[-0.02em] text-white md:text-[20px]">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
