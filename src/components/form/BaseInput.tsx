import { Input, InputNumber, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const BaseInput = ({ type, name, label, defaultValue, ...rest }: { type: string, name: string, label?: string, defaultValue?: string }) => {
    const { control, formState: { errors } } = useFormContext()
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                rules={{ required:true}}
                render={({ field }) => (
                    type === 'password' ? <Input.Password {...field} className="my-2" placeholder={label} type={type} /> :
                    type === 'select' ? <Select
                    className="my-2"
                    style={{ width: '100%' }}
                    {...field}
                    {...rest}
                  />
                     : type === 'number' ? <InputNumber {...field} className="my-2" {...rest} /> :
                    <Input {...rest} {...field} className="my-2" placeholder={label} type={type} />
                )}
            />
            {errors[name] && <span style={{color: 'red'}}
            >This field is required</span>}
        </div>
    );
};

export default BaseInput;