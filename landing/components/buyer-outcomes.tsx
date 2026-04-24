import { Button } from './ui/button';
import { Container } from './ui/container';
import { Eyebrow } from './ui/eyebrow';
import { buyerJourney } from '@/lib/content';

export function BuyerOutcomes() {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL ?? 'mailto:briefing@arcane.id';

  return (
    <section id="outcomes" className="px-7 py-[88px] lg:py-[112px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
          <div className="max-w-[520px]">
            <Eyebrow tone="aether">{buyerJourney.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[36px] font-medium leading-[1.03] tracking-[-0.035em] text-fg-1 md:text-[52px]">
              {buyerJourney.title}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.72] text-fg-2">{buyerJourney.lead}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button as="a" href={bookingHref} icon="→">
                Book a briefing
              </Button>
              <Button as="a" href="/#architecture" variant="ghost">
                See architecture
              </Button>
            </div>
          </div>

          <div className="grid items-stretch gap-4 md:grid-cols-3">
            {buyerJourney.cards.map((card) => (
              <article
                key={card.tag}
                className="group surface-gradient relative isolate flex h-full min-h-[480px] flex-col rounded-[18px] border border-border-1 p-5 lg:min-h-[540px] lg:p-6"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-[18px] bg-[linear-gradient(90deg,transparent,rgba(63,232,196,0.65),transparent)] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                {/* Upper block: fixed ratio of card height so tag + title
                    start at the same Y across all three cards, regardless of
                    how many lines the title wraps to. */}
                <div className="flex shrink-0 basis-[48%] flex-col">
                  <div className="font-mono text-[11px] tracking-[0.18em] text-aether-400 uppercase">
                    {card.tag}
                  </div>
                  <h3 className="mt-3 text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-fg-1 lg:text-[28px]">
                    {card.title}
                  </h3>
                </div>
                {/* Body block: starts at the same Y on every card because the
                    upper block always claims the same fraction of the shared
                    card height. Grows into the remaining space. */}
                <p className="min-h-0 flex-1 text-[17px] leading-[1.6] text-fg-2">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
