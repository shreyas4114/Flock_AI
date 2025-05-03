export default function WishlistCard({ wishlist, onClick, onDelete }) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
        <div className="p-5">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{wishlist.name}</h3>
          
          {wishlist.members && (
            <p className="text-sm text-gray-600 mb-4">
              {wishlist.members.length} {wishlist.members.length === 1 ? 'member' : 'members'}
            </p>
          )}
          
          <div className="flex justify-between mt-4">
            <button
              onClick={onClick}
              className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-md text-sm transition duration-200"
            >
              View Details
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-red-500 hover:text-red-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }