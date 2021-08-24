import React, { useRef, useState } from 'react';
import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useTheme } from 'bumbag';
import { Group, Button } from 'bumbag-native';
import dayjs from 'dayjs';
import SmoothPicker from "react-native-smooth-picker";

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
    const [ selected , setSelected ] = useState(0);
    const [ ampm, setAmpm ] = useState(ampmProp);
    const [ hour, setHour ] = useState(value);
    const listRef = useRef<FlatList>(null);
    const handleScroll = (event : NativeSyntheticEvent<NativeScrollEvent>) => {
        const { contentOffset, contentSize } = event.nativeEvent;
        const snapRange = 0.5;
        const len = times.length;
        const boxSize = contentSize.height / len;
        const { y } = contentOffset;
        const currentPosition = Math.floor( (y + boxSize * snapRange) / boxSize );
        setSelected(currentPosition);
        setHour( times[currentPosition] );
        onChange( times[currentPosition] , ampm );
    }

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
            <View>
                <SmoothPicker
                    style = {{
                        backgroundColor: '#E5E5E5',
                        width: 80,
                        borderRadius: 16,
                        height: 50,
                        flex: 1,
                        flexGrow: 1
                    }}
                    data = {times}
                    magnet = {true}
                    initialScrollIndex = {0}
                    scrollEnabled = {true}
                    nestedScrollEnabled = {true}
                    showsVerticalScrollIndicator = {false}
                    scrollAnimation
                    offsetSelection = {-20}
                    onSelected = {(data) => {
                        setHour(data.item);
                        onChange(data.item,ampm);
                    }}
                    renderItem = {({ item }) => (
                        <View style = {{
                            width: 80,
                            height: 50,
                            justifyContent: 'center'
                        }}>
                            <Text style = {{
                                fontSize: 18,
                                paddingTop: 70,
                                color: theme.palette.primary,
                                textAlign: 'center'
                            }}>
                                {item}
                            </Text>
                        </View>
                    )}
                />
            </View>
            <Group>
                <Button onPress = {() => {
                    setAmpm("AM");
                    onChange(hour,"AM");
                }} palette = { ampm === "AM" ? "primary" : "default" }>
                    <Button.Text color = { ampm === "AM" ? "body" : "primary" }>
                        AM
                    </Button.Text>
                </Button>
                <Button palette = { ampm === "PM" ? "primary" : "default" } onPress = {() => {
                    setAmpm("PM");
                    onChange(hour,"PM")
                }} >
                    <Button.Text color = { ampm === "PM" ? "body" : "primary" }>
                        PM
                    </Button.Text>
                </Button>
            </Group>
        </View>
    )
}

export  { TimePicker };