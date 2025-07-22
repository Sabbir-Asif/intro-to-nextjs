'use client'
import getData from '@/api/core/getData';
import { useQuery } from '@tanstack/react-query';
import Post from './modules/posts';
import PostSkeleton from '@/components/PostSkeleton';

const PostsPage = () => {

    const {
        data: posts,
        isError,
        isLoading,
        error
    } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getData('/posts')
    });
    if (isLoading) return <PostSkeleton count={3} />;
    if (isError) return <p>Error: {(error as Error).message}</p>;

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Posts</h2>
            <ul className="space-y-2">
                {posts?.map((post: Post) => (
                    <li key={post.id} className="border p-4 rounded shadow">
                        <h3 className="font-bold">{post.title}</h3>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;