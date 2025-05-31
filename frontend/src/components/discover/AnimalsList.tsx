import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards"

const row1 = [
  { name: 'Lion', emoji: '🦁' },
  { name: 'Wolf', emoji: '🐺' },
  { name: 'Raccoon', emoji: '🦝' },
  { name: 'Deer', emoji: '🦌' },
  { name: 'Monkey', emoji: '🐒' },
  { name: 'Cow', emoji: '🐮' },
]

const row2 = [
  { name: 'Fox', emoji: '🦊' },
  { name: 'Koala', emoji: '🐨' },
  { name: 'Tiger', emoji: '🐯' },
  { name: 'Horse', emoji: '🐎' },
  { name: 'Pig', emoji: '🐷' },
  { name: 'Bear', emoji: '🐻' },
]

const row3 = [
  { name: 'Panda', emoji: '🐼' },
  { name: 'Elephant', emoji: '🐘' },
  { name: 'Camel', emoji: '🐪' },
  { name: 'Penguin', emoji: '🐧' },
  { name: 'Giraffe', emoji: '🦒' },
  { name: 'Dog', emoji: '🐕' },
]

const AnimalsList = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 pb-16">
      <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">
        Our Animals List
      </h2>
      
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row1}
            direction="right"
            speed="normal"
          />
        </div>
        <div className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row2}
            direction="left"
            speed="normal"
          />
        </div>
        <div className="w-full overflow-hidden">
          <InfiniteMovingCards
            items={row3}
            direction="right"
            speed="normal"
          />
        </div>
      </div>
    </section>
  )
}

export default AnimalsList 