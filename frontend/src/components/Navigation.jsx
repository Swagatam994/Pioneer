import React from 'react'

const Navigation = () => {
  return (
    <div>
      <nav className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl font-bold text-gray-800">StudyForge</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg">
            Recent Files
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
