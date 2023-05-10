import { Button, Flex, Select, SelectProps, TextInput } from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";

type FormValues = {
	age: string;
	class: string;
	gpa: string;
	name: string;
	siblings: string;
	sex: "male" | "female";
};

type StudentFormProps = {
	onSubmit: (
		student: FormValues,
		form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>
	) => void;
	loading?: boolean;
	initialValues?: FormValues;
};

const defaultValues: FormValues = {
	age: "",
	class: "",
	gpa: "",
	name: "",
	siblings: "",
	sex: "male",
};

export default function StudentForm({
	onSubmit,
	loading = false,
	initialValues = defaultValues,
}: StudentFormProps) {
	const form = useForm<FormValues>({ initialValues });

	return (
		<form onSubmit={form.onSubmit((values) => onSubmit(values, form))}>
			<TextInput
				withAsterisk
				label="Name"
				placeholder="John Doe"
				{...form.getInputProps("name")}
			/>
			<Flex gap="md" mt="xs">
				<TextInput
					withAsterisk
					label="Age"
					type="number"
					placeholder="18"
					{...form.getInputProps("age")}
				/>
				<TextInput
					withAsterisk
					label="No. of siblings"
					type="number"
					placeholder="2"
					{...form.getInputProps("siblings")}
				/>
				<ColumnSelect withAsterisk label="Sex" {...form.getInputProps("sex")} />
				<TextInput
					withAsterisk
					label="Class"
					type="number"
					placeholder="1"
					{...form.getInputProps("class")}
				/>
				<TextInput
					withAsterisk
					label="GPA"
					type="number"
					placeholder="4.00"
					{...form.getInputProps("gpa")}
				/>
			</Flex>
			<Flex justify="flex-end">
				<Button type="submit" mt="xs" loading={loading}>
					Submit
				</Button>
			</Flex>
		</form>
	);
}

const GENDERS = [
	{ label: "Male", value: "male" },
	{ label: "Female", value: "female" },
] satisfies Array<{ label: string; value: "male" | "female" }>;

function ColumnSelect(props: Omit<SelectProps, "data" | "placeholder">) {
	return <Select placeholder="Male" data={GENDERS} {...props} />;
}
