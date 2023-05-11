import { Button, Flex, Select, SelectProps, TextInput } from "@mantine/core";
import { UseFormReturnType, useForm } from "@mantine/form";
import { FormValidateInput } from "@mantine/form/lib/types";

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
	isLoading?: boolean;
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

const validate: FormValidateInput<FormValues> = {
	age: (value) => (+value.length < 1 ? "Age must be a positive number" : null),
	class: (value) =>
		+value.length < 1 ? "Class must be a positive number" : null,
	gpa: (value) => (+value.length < 1 ? "GPA must be a positive number" : null),
	name: (value) =>
		value.length < 3 ? "Name must be at least 3 characters long" : null,
	siblings: (value) =>
		+value.length < 0 ? "Siblings must be a positive number" : null,
	sex: (value) => (!value ? "Please select a gender" : null),
};

export default function StudentForm({
	onSubmit,
	isLoading = false,
	initialValues = defaultValues,
}: StudentFormProps) {
	const form = useForm<FormValues>({ initialValues, validate });

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
				<Button
					type="submit"
					mt="xs"
					loading={isLoading}
					disabled={!form.isValid() || !form.isDirty()}
				>
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
