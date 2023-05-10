import { useQuery } from "@tanstack/react-query";
import api from ".";
import { Student } from "./students.types";

export function useGetAllStudents() {
	return useQuery(["students"], () =>
		api.get("students").json<Array<Student>>()
	);
}
