import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TBaseFormProps = {
    onSubmit: SubmitHandler<FieldValues>,
    children: ReactNode,
    defaultValues?: any
}

type TFormConfig = {
    defaultValues?: Record<string, any>
}

const BaseForm = ({ onSubmit, children, defaultValues }: TBaseFormProps) => {
    const formConfig:TFormConfig = {}

    if(defaultValues) {
        formConfig['defaultValues'] = defaultValues
    } 

    const methods = useForm<TBaseFormProps>(formConfig);

    return (
        <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{width: '100%', marginTop: '8px', marginBottom: '8px'}}>
            {children}
        </form>
        </FormProvider>
    );
};

export default BaseForm;