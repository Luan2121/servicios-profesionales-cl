import { useField } from 'formik';
import React from 'react';
import { CalendarPickerProps, CalendarPicker } from "../../calendar-picker/calendar-picker";

interface CalendarPickerFieldProps extends Omit<CalendarPickerProps,'onChange'> {
    name: string
}

const CalendarPickerField = ({
    name,
    format,
    ...restProps
} : CalendarPickerFieldProps ) => {
    const [ field, meta, helpers ] = useField(name);
    return (
        <CalendarPicker
            {...restProps}
            onChange = {( date ) => {
                helpers.setValue( format ? date.format(format || defaultFormat) : date.toISOString() );
            }}
        />
    );
};

const defaultFormat = "DD/MM/YYYY HH:mm";

export { CalendarPickerField };