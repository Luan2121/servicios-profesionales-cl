import React, { useRef, useState } from 'react';
import { View, Text, Platform, FlatList, NativeSyntheticEvent, NativeScrollEvent, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'bumbag';
import { Group, Button } from 'bumbag-native';
import dayjs from 'dayjs';
import SmoothPicker from "react-native-smooth-picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, memo, useCallback } from 'react';

type TimePickerProps = {
    value: string,
    ampm: 'AM' | 'PM',
    onChange: ( value: string, ampm: 'AM' | 'PM' ) => void
}

const getHoursInterval = (interval : number) => {
    var x = interval; //minutes interval
    var times : string[] = []; // time array
    var startTime = 0; // start time
    //loop to increment the time and push results in array
    for ( var i=0 ; startTime  < 24*60 / 2; i++ )  {
      var hh = Math.floor( startTime / 60 ); // getting hours of day in 0-24 format
      var mm = ( startTime % 60 ); // getting minutes of the hour in 0-55 format
      times[i] = ( hh === 0 ? '12' :  ("" + (hh % 12)).slice(-2) ) + ':' + ("0" + mm).slice(-2); // pushing data in array in [00:00 - 12:00 AM/PM format]
      startTime = startTime + x;
    }
    return times;
}

const times = getHoursInterval(15);

const TimePicker = ({
    value,
    ampm : ampmProp,
    onChange
} : TimePickerProps ) => {
    const { theme } = useTheme();
    const initialDate = useMemo( () => dayjs().hour(12).minute(0) , [] );
    const [state,setState] = useState({
        date: initialDate,
        ampm: ampmProp
    })
    const { date , ampm } = state;
    //const [date, setDate] = useState( initialDate );
    const [show, setShow] = useState(false);
    const handleChange = useCallback( (event,selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        const d = dayjs(currentDate);
        const newampm = dayjs(currentDate).format("a").includes("am") ? "AM" : "PM";
        setState( s => ({ ...s, date: d, ampm: newampm }) );
        onChange( d.toISOString(), newampm );
    } , [setState, setShow ] );
    return (
        <View style = {{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: theme.spacing.small
        }}>
            <Text style = {{
                fontWeight: 'bold',
                color: theme.palette.primary,
                fontSize: 18
            }}>
                Hora
            </Text>
            <View style = {{
                flex: 1,
                flexGrow: 1,
                justifyContent: 'center',
                width: '100%',
                flexDirection: 'row'
            }}>
                <TouchableWithoutFeedback onPress = { () => {
                    setShow(true);
                }}>
                    <View style = {{
                        backgroundColor: '#E5E5E5',
                        width: 80,
                        borderRadius: 16,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}> 
                        <Text style = {{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: theme.palette.primary
                        }}>
                            { dayjs(date).format("hh:mm") }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <Group>
                <Button onPress = {() => {
                    setState( s => ({ ...s , ampm: "AM" }));
                    onChange(state.date.toISOString(),"AM");
                }} palette = { ampm === "AM" ? "primary" : "default" }>
                    <Button.Text color = { ampm === "AM" ? "body" : "primary" }>
                        AM
                    </Button.Text>
                </Button>
                <Button palette = { ampm === "PM" ? "primary" : "default" } onPress = {() => {
                    setState( s => ({ ...s , ampm: "PM" }));
                    onChange(state.date.toISOString(),"PM");
                }} >
                    <Button.Text color = { ampm === "PM" ? "body" : "primary" }>
                        PM
                    </Button.Text>
                </Button>
            </Group>
            {show && (
                <DateTimePicker 
                    mode = "time" 
                    minuteInterval = {5}
                    value = { date.toDate() }
                    is24Hour = {false}
                    onChange = {handleChange}
                />
            )}
        </View>
    )
}

const TimePickerMemo = memo(TimePicker);

export  { TimePickerMemo as TimePicker };