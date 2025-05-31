const animals = [
  { name: 'Cow', emoji: '🐮' },
  { name: 'Lion', emoji: '🦁' },
  { name: 'Wolf', emoji: '🐺' },
  { name: 'Raccoon', emoji: '🦝' },
  { name: 'Tiger', emoji: '🐯' },
  { name: 'Horse', emoji: '🐎' },
  { name: 'Pig', emoji: '🐷' },
  { name: 'Dog', emoji: '🐕' },
  { name: 'Panda', emoji: '🐼' },
  { name: 'Elephant', emoji: '🐘' },
  { name: 'Camel', emoji: '🐪' }
]

const AnimalsList = () => {
  return (
    <section className="w-full flex flex-col items-center px-6 pb-16">
      <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
        Our Animals List
      </h2>
      
      <div className="w-full max-w-3xl flex flex-wrap justify-center gap-3">
        {animals.map((animal) => (
          <div
            key={animal.name}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100 shadow-sm"
          >
            <span className="text-xl">{animal.emoji}</span>
            <span className="text-gray-600">{animal.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AnimalsList 