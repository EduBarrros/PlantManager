import React, { useState } from 'react'
import { StyleSheet, View, Text, Alert, Image, ScrollView, Platform, TouchableOpacity } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { color } from 'react-native-reanimated'
import { SvgFromUri } from 'react-native-svg'
import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import { useNavigation, useRoute } from '@react-navigation/core'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { LoadPlant, PlantProps, savePlant } from '../libs/storage'

export function PlantSave() {

    const [selectedDateTime, setSelectedDateTime] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios')

    interface Params {
        plant: PlantProps

    }

    const route = useRoute()
    const { plant } = route.params as Params;
    const navigation = useNavigation()

    function handleChangeTime(event: Event, dateTime: Date | undefined) {

        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState)
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date())
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }

        if (dateTime)
            setSelectedDateTime(dateTime)


    }


    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }


    async function handleSave() {
        try {
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            })

            navigation.navigate('Confirmation', {
                title: 'Tudo certo',
                subTitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado',
                buttonTitle: 'Muito obrigado',
                icon: 'hug',
                nextScreem: 'MyPlants',
            })
        } catch {
            Alert.alert('Não foi possivel salvar. 😥')
        }
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>

                    <SvgFromUri
                        uri={plant.photo}
                        height={100}
                        width={100}
                    />

                    <Text style={styles.plantName}>
                        {plant.name}
                    </Text>
                    <Text style={styles.plantAbout}>
                        {plant.about}
                    </Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterdrop}
                            style={styles.tipImage}
                        />

                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>


                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrado:
                </Text>

                    {
                        showDatePicker && (
                            <DateTimePicker

                                value={selectedDateTime}
                                mode='time'
                                display='spinner'
                                onChange={handleChangeTime}

                            />
                        )
                    }

                    {

                        Platform.OS === 'android' && (
                            <TouchableOpacity onPress={handleOpenDateTimePickerForAndroid}
                                style={styles.dateTimePickerButton}>
                                <Text style={styles.dateTimePickertext}>
                                    {` Mudar ${format(selectedDateTime, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )

                    }


                    <Button
                        title='Cadastrar planta'
                        onPress={handleSave}
                    />

                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape

    },

    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingBottom: getBottomSpace() || 10,
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 15,
        marginTop: 10,
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 9,
        borderRadius: 20,
        position: 'relative',
        bottom: 20
    },

    tipImage: {
        width: 46,
        height: 46,
    },

    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 15,
        textAlign: 'justify',
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },

    dateTimePickertext: {
        color: colors.heading,
        alignItems: 'center',
        paddingVertical: 40,
        fontFamily: fonts.text,
    },

    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,

    }

})