import React from 'react'

const Flashcard = ({ flashcards = [] }) => {
  return (
    <div>
      {flashcards.length > 0 && (
  <div className="mt-6 grid gap-4 max-w-2xl">
    {flashcards.map((card, index) => (
      <div key={index} className="bg-white p-4 rounded-lg shadow">
        <p className="font-bold">{card.question}</p>
        <p className="text-gray-600">{card.answer}</p>
      </div>
    ))}
  </div>
)}
    </div>
  )
}

export default Flashcard
