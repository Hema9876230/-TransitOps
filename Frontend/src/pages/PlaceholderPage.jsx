import React from "react";

function PlaceholderPage({ title }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 glass rounded-2xl">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-sm">
        This section is coming soon. Connect it to your backend once the API is
        ready.
      </p>
    </div>
  );
}

export default PlaceholderPage;
