import deleteData from '@/api/core/deleteData';
import postData from '@/api/core/postdata';
import updateData from '@/api/core/updateData';
import { type Task } from '@/app/board/modules/Task';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (newTask: Omit<Task, 'id'>) => postData('/tasks', newTask),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...data }: Partial<Task>) => updateData(`tasks/${id}`, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteData(`/tasks/${id}`),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    })
}