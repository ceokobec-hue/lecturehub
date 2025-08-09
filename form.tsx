"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Controller, type ControllerProps, type FieldPath, type FieldValues, FormProvider } from "react-hook-form";
import { cn } from "@/lib/utils";

export function Form<TFieldValues extends FieldValues>({ children, ...props }: React.ComponentProps<typeof FormProvider<TFieldValues>>) {
  return <FormProvider {...props}>{children}</FormProvider>;
}

export type FormFieldContextValue = { id: string };
const FormFieldContext = React.createContext<FormFieldContextValue>({ id: "" });

export const FormField = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>) => {
  const id = String(props.name);
  return (
    <FormFieldContext.Provider value={{ id }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormItem.displayName = "FormItem";

export const FormLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const { id } = React.useContext(FormFieldContext);
  return (
    <label htmlFor={id} className={cn("text-sm font-medium", className)}>
      {children}
    </label>
  );
};

export const FormControl = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(({ className, ...props }, ref) => {
  const { id } = React.useContext(FormFieldContext);
  return <Slot id={id} className={className} ref={ref as any} {...props} />;
});
FormControl.displayName = "FormControl";

export const FormMessage = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="text-sm text-destructive">{children}</p>;
};

export const FormDescription = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

