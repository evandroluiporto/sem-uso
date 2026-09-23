import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Flame,
  Home,
  MessageCircle,
  Shirt,
  Sparkles,
  TicketPercent,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";

const whatsappUrl = "https://whats.ly/0dsr7";

const benefits: Array<{
  title: string;
  description: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}> = [
  {
    title: "Cupons que funcionam",
    description: "Cupons exclusivos, testados e atualizados para você economizar de verdade na finalização da compra.",
    icon: TicketPercent,
  },
  {
    title: "Casa & decoração",
    description: "As melhores marcas de decoração, cama, banho e eletrodomésticos com preços que ninguém acredita.",
    icon: Home,
  },
  {
    title: "Moda & beleza",
    description: "Economia real nas roupas, acessórios e produtos de beleza mais desejados do momento.",
    icon: Shirt,
  },
  {
    title: "Ofertas relâmpago",
    description: "Você será a primeira a saber quando o preço cair muito, garantindo as melhores ofertas.",
    icon: Zap,
  },
  {
    title: "Links verificados",
    description: "Segurança total. Apenas lojas oficiais e confiáveis.",
    icon: BadgeCheck,
  },
];

const notifications = [
  "Juliana de SP entrou no grupo",
  "Mariana do RJ entrou no grupo",
  "Camila de Curitiba entrou no grupo",
  "Fernanda de Recife entrou no grupo",
];

const initialOccupancy = 37;
const finalOccupancy = 95;
const occupancySteps = 10;
const groupCapacity = 17;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Comprei e Indico | Promoções, cupons e achadinhos" },
      {
        name: "description",
        content: "Entre para o Grupo VIP Comprei e Indico e receba promoções reais, cupons testados e achadinhos todos os dias.",
      },
      { property: "og:title", content: "Comprei e Indico | Promoções e achadinhos" },
      {
        property: "og:description",
        content: "Promoções reais, cupons que funcionam e achadinhos selecionados para você economizar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [activityStep, setActivityStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActivityStep((current) => {
        if (current >= occupancySteps - 1) {
          window.clearInterval(timer);
          return occupancySteps;
        }

        return current + 1;
      });
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const occupancy = Math.round(
    initialOccupancy + ((finalOccupancy - initialOccupancy) * activityStep) / occupancySteps,
  );
  const remainingVacancies = Math.max(1, Math.round(groupCapacity * (1 - occupancy / 100)));
  const notification = activityStep % notifications.length;

  return (
    <main className="min-h-screen bg-background px-3 py-3 text-foreground sm:px-5 sm:py-8 lg:py-12">
      <div className="mx-auto w-full max-w-[31rem] overflow-hidden rounded-[1.35rem] border border-border/70 bg-card px-4 pb-9 pt-4 shadow-[0_18px_60px_var(--shadow-color)] sm:px-7 sm:pb-10 sm:pt-5">
        <div className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-center text-[0.72rem] font-bold uppercase text-primary-foreground sm:text-xs">
          <Flame className="h-4 w-4 shrink-0 motion-safe:animate-pulse" aria-hidden="true" />
          <span>Últimas vagas disponíveis</span>
          <Flame className="h-4 w-4 shrink-0 motion-safe:animate-pulse" aria-hidden="true" />
        </div>

        <section className="pt-5 text-center sm:pt-6">
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full shadow-sm sm:h-32 sm:w-32">
            <img
              src="/curadora-promocoes.png"
              alt="Curadora do Comprei e Indico sorrindo com o celular"
              className="h-full w-full object-cover"
              width={768}
              height={768}
              fetchPriority="high"
            />
          </div>

          <h1 className="mx-auto mt-5 max-w-[26rem] font-display text-[1.72rem] font-semibold leading-[1.08] text-heading sm:text-[2rem]">
            Amiga, eu garimpo as melhores promoções ocultas, preços bugados e cupons de
            desconto da internet
            <span className="ml-1 inline-block" aria-hidden="true">💖</span>
          </h1>

          <p className="mx-auto mt-4 max-w-[27rem] text-[0.92rem] leading-relaxed text-muted-foreground sm:text-base">
            Entre no meu Grupo VIP e receba todos os dias promoções reais, cupons que funcionam e achadinhos para você pagar pouco sem perder tempo procurando.
          </p>
          <p className="mt-3 text-sm font-semibold text-heading sm:text-[0.95rem]">
            +56.750 mulheres já estão economizando
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-success px-5 py-3 text-base font-extrabold text-success-foreground shadow-[0_8px_24px_var(--success-shadow)] transition duration-200 hover:-translate-y-0.5 hover:bg-success-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:text-lg"
          >
            <MessageCircle className="h-5 w-5 shrink-0 transition-transform group-hover:scale-110" aria-hidden="true" />
            Quero entrar agora
          </a>
          <p className="mt-2 text-xs text-muted-foreground">Grupo gratuito • silencioso • sem spam</p>
        </section>

        <section className="mt-5 rounded-xl bg-soft px-4 py-3.5" aria-label="Disponibilidade de vagas">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-xs font-medium text-heading">
            <span>Vagas preenchidas</span>
            <span>{occupancy}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-track" role="progressbar" aria-label="Vagas preenchidas" aria-valuemin={0} aria-valuemax={100} aria-valuenow={occupancy}>
            <div className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out" style={{ width: `${occupancy}%` }} />
          </div>
          <p className="mt-2 text-right text-xs text-heading">
            Restam apenas <strong>{remainingVacancies} vagas</strong>
          </p>
        </section>

        <section className="mt-6" aria-labelledby="beneficios">
          <div className="mb-4 flex items-center justify-center gap-2 text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <h2 id="beneficios" className="text-xs font-bold uppercase text-heading">O que você recebe</h2>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 gap-3 min-[390px]:grid-cols-2">
            {benefits.map(({ title, description, icon: Icon }, index) => (
              <article
                key={title}
                className={`relative min-h-[11rem] overflow-hidden rounded-lg border border-border/70 bg-card px-4 py-5 text-center shadow-[0_6px_20px_var(--card-shadow)] ${index === benefits.length - 1 ? "min-[390px]:col-span-2 min-[390px]:mx-auto min-[390px]:w-[calc(50%-0.375rem)]" : ""}`}
              >
                <span className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-accent-strong" aria-hidden="true" />
                <Icon className="mx-auto h-7 w-7 text-icon" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-3 text-sm font-semibold text-heading">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <footer className="mt-7 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
          <p>Política de Privacidade <span aria-hidden="true">•</span> Termos de Uso</p>
          <p className="mt-1">Curadoria por @comprei.e.indico 💖</p>
        </footer>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-20 flex justify-center px-4" aria-live="polite">
         <div key={activityStep} className="animate-notification rounded-full bg-primary px-5 py-2.5 text-center text-xs font-medium text-primary-foreground shadow-lg">
          {notifications[notification]}
        </div>
      </div>
    </main>
  );
}
