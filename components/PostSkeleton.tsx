interface PostSkeletonProps {
  count?: number;
}

const PostSkeleton: React.FC<PostSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-500 dark:border-gray-700 p-6">
          {/* Post header with avatar and user info */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24 mb-2" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
            </div>
          </div>
          
          {/* Post title */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-3 w-3/4" />
          
          {/* Post content lines */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6" />
          </div>
          
          {/* Post image placeholder */}
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4" />
          
          {/* Post actions/stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-600">
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-12" />
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;