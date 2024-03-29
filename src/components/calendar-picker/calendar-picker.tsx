import React , { useState } from 'react';
import { useTheme } from 'bumbag';
import { Button } from 'bumbag-native';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Calendar, { CalendarPickerProps as ICalendarPickerProps } from 'react-native-calendar-picker';
import { TimePicker } from '../time-picker/time-picker';
import dayjs from 'dayjs';

export interface CalendarPickerProps extends ICalendarPickerProps {
    onChange: (date:dayjs.Dayjs) => void,
    showTime ?: boolean,
    format?: string | null
}

const CalendarPicker = ( {
    onChange,
    showTime = true,
    ...props
} : CalendarPickerProps ) => {
    const { theme } = useTheme();
    const [ date, setDate ] = useState<dayjs.Dayjs>();
    const [ hour ] = useState("12:00");
    const [ ampm ] = useState<'AM' | 'PM'>("AM");

    return (
        <View>
            <Calendar
                {...props}
                minDate = {new Date()}
                onDateChange = { selectedDate => {   
                    const finalDate = dayjs( selectedDate.toISOString() );
                    if( date ){
                        const newDate = dayjs(date)
                            .year( finalDate.year() )
                            .month( finalDate.month() )
                            .date( finalDate.date() );
                        setDate(newDate);
                        onChange(newDate)
                    }else {
                        setDate(finalDate);
                        onChange(finalDate);
                    }
                }}
                previousComponent = {<CalendarHeaderButton type = "previous" />}
                nextComponent = {<CalendarHeaderButton type = "next" />}                      
                customDatesStyles = {(date) => ({
                    style: {
                        borderRadius: 16
                    }
                })}
            />
            { showTime && (
                <TimePicker
                    value = {date?.toISOString() || ""}
                    ampm = {ampm}
                    onChange = {( currentHour, currentAmpm ) => {
                        if(date){
                            const dateFromTimePicker = dayjs(currentHour);
                            let hour = dateFromTimePicker.hour();
                            if( hour > 12 && currentAmpm === 'AM' ){
                                hour = hour - 12;
                            }
                            else if ( hour <= 12 && currentAmpm === 'PM' ){
                                hour = hour + 12;
                            }
                            const newDate = dayjs( date )
                                .hour( hour )
                                .minute( dateFromTimePicker.minute() );
                            onChange(newDate);
                            setDate( newDate );
                        };
                    }}
                />
            )}
        </View>
    );
}

const CalendarHeaderButton = (props : any) => {
    const { theme } = useTheme();
    return (
        <Button {...props} >
            <Entypo 
                name={`chevron-${props.type === "next" ? "right" : "left"}`}
                size={18} 
                color={theme.palette.primary}  
            />
        </Button>
    )
}

export { CalendarPicker };