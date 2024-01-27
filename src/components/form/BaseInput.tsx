import { Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

const BaseInput = ({ type, name, label, defaultValue }: { type: string, name: string, label?: string, defaultValue?: string }) => {
    const { control, formState: { errors } } = useFormContext()
    return (
        <div>
            {label ? <label>{label}</label> : null}
            <Controller
                name={name}
                defaultValue={defaultValue}
                control={control}
                render={({ field }) => (
                    type === 'password' ? <Input.Password {...field} className="my-2" placeholder={label} type={type} /> : <Input {...field} className="my-2" placeholder={label} type={type} />
                )}
            />
            {errors[name] && <span>This field is required</span>}
        </div>
    );
};

export default BaseInput;