"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
	Controller,
	FormProvider,
	useFormContext,
	useFormState,
	type ControllerProps,
	type FieldPath,
	type FieldValues,
} from "react-hook-form";

import { cn } from "@/app/lib/utils";
import { Label } from "@/app/components/ui/label";

const Form = FormProvider;

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
	{} as FormFieldContextValue,
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState } = useFormContext();
	const formState = useFormState({ name: fieldContext.name });
	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
	id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
	{} as FormItemContextValue,
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div
				data-slot="form-item"
				className={cn("grid gap-2", className)}
				{...props}
			/>
		</FormItemContext.Provider>
	);
}

function FormLabel({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	const { error, formItemId } = useFormField();

	return (
		<Label
			data-slot="form-label"
			data-error={!!error}
			className={cn("data-[error=true]:text-destructive", className)}
			htmlFor={formItemId}
			{...props}
		/>
	);
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
	const { error, formItemId, formDescriptionId, formMessageId } =
		useFormField();

	return (
		<Slot
			data-slot="form-control"
			id={formItemId}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
	const { formDescriptionId } = useFormField();

	return (
		<p
			data-slot="form-description"
			id={formDescriptionId}
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

// Row-level coordination to keep grouped fields aligned only when any has an error
type FormRowContextValue = {
	reserve: boolean;
};

const FormRowContext = React.createContext<FormRowContextValue | null>(null);

type FormRowProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	names: TName[];
	className?: string;
	children: React.ReactNode;
};

function FormRow<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ names, className, children }: FormRowProps<TFieldValues, TName>) {
	const { getFieldState } = useFormContext<TFieldValues>();
	const formState = useFormState({
		name: names as unknown as
			| FieldPath<TFieldValues>
			| FieldPath<TFieldValues>[],
	});
	// Determine if any field in the row currently has an error
	const reserve = React.useMemo(() => {
		return names.some((n) => getFieldState(n, formState).error);
	}, [getFieldState, formState, names]);

	return (
		<FormRowContext.Provider value={{ reserve }}>
			<div className={cn(className)}>{children}</div>
		</FormRowContext.Provider>
	);
}

// Extend FormMessage to optionally derive reserve behavior from FormRow context
type ReserveSpaceOpt = boolean | "row";

type FormMessageProps = React.ComponentProps<"p"> & {
	reserveSpace?: ReserveSpaceOpt;
};

function useReserveSpace(reserveSpace?: ReserveSpaceOpt) {
	const row = React.useContext(FormRowContext);
	if (reserveSpace === "row") return !!row?.reserve;
	return !!reserveSpace;
}

// Re-define after helper
function FormMessage({ className, reserveSpace, ...props }: FormMessageProps) {
	const { error, formMessageId } = useFormField();
	const message = error ? String(error?.message ?? "") : props.children;
	const shouldReserve = useReserveSpace(reserveSpace);

	if (!shouldReserve && !message) {
		return null;
	}

	return (
		<p
			data-slot="form-message"
			id={formMessageId}
			className={cn(
				"text-destructive text-sm",
				shouldReserve ? "min-h-0 md:min-h-5" : undefined,
				shouldReserve && !message ? "opacity-0" : undefined,
				className,
			)}
			role={message ? "alert" : undefined}
			aria-live={message ? "polite" : undefined}
			{...props}
		>
			{message as React.ReactNode}
		</p>
	);
}

export {
	useFormField,
	Form,
	FormRow,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
};
