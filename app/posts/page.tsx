'use client'
import getData from '@/api/core/getData';
import { useQuery } from '@tanstack/react-query';
import Post from './modules/posts';
import PostSkeleton from '@/components/PostSkeleton';

const PostsPage = () => {

    const {
        data: tasks,
        isError,
        isLoading,
        error
    } = useQuery({
        queryKey: ['tasks'],
        queryFn: () => getData('/tasks')
    });
    if (isLoading) return <PostSkeleton count={3} />;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Posts</h2>
            <ul className="space-y-2">
                {tasks.data?.map((post: Post) => (
                    <li key={post.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{post.name}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;