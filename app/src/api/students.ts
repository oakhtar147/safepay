import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from ".";
import { Student } from "./students.types";

export function useGetAllStudents() {
	return useQuery(["students"], () =>
		api.get("students").json<Array<Student>>()
	);
}

export function useGetStudentDetails(studentId?: number) {
	return useQuery(
		["student", studentId],
		() => api.get(`student/${studentId}`).json<Student>(),
		{ enabled: !!studentId }
	);
}

export function useAddStudent() {
	const queryClient = useQueryClient();

	return useMutation(
		(json: Omit<Student, "uuid">) => api.post(`student`, { json }),
		{
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["students"] }),
		}
	);
}

export function useEditStudentDetails() {
	const queryClient = useQueryClient();

	return useMutation(
		({ uuid, ...json }: Student) => api.put(`student/${uuid}`, { json }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: ["students"] });
				queryClient.invalidateQueries({ queryKey: ["student"] });
			},
		}
	);
}

export function useDeleteStudent() {
	const queryClient = useQueryClient();

	return useMutation((uuid: number) => api.delete(`student/${uuid}`), {
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["students"] }),
	});
}
