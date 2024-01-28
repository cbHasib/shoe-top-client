import { Input, InputNumber, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

interface IBaseInput {
    type: string,
    name: string,
    label?: string,
    defaultValue?: string,
    [key: string]: any
}

const BaseInput = ({ type, name, label, defaultValue, ...rest }: IBaseInput) => {
    const { control, formState: { errors } } = useFormContext()
    return (
        <div>
            {label ? <label>{label} {rest.required ? <span style={{ color: 'red' }}>*</span> : null} </label> : null}
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                rules={{ required: rest.required }}
                render={({ field }) => (
                    type === 'password' ? <Input.Password {...field} className="my-2" placeholder={label} type={type} /> :
                        type === 'select' ? <Select
                            className="my-2"
                            style={{ width: '100%' }}
                            {...field}
                            {...(delete rest.required,
                                rest)}
                        />
                            : type === 'number' ? <InputNumber {...field} className="my-2" {...(delete rest.required,
                                rest)} placeholder={label} type={type} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }} /> :
                                <Input {...(
                                    // remove required from input
                                    delete rest.required,
                                    rest
                                )} {...field} className="my-2" placeholder={label} type={type} />
                )}
            />
            {errors[name] && <span style={{ color: 'red' }}
            >{label} is required</span>}
        </div>
    );
};

export default BaseInput;