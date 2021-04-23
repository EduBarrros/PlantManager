import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image} from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'
import waterdrop from '../assets/waterdrop.png'
import { PlantProps, LoadPlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { pt } from 'date-fns/locale'
import { FlatList } from 'react-native-gesture-handler'
import fonts from '../styles/fonts'
import { PlantCardSecundary } from '../components/PlantCardSecundary'
import { PlantCardPrimary } from '../components/PlantCardPrimary'

export function MyPlants(){

    const [myPlants, setMyPlants] =useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()

    useEffect(() => {
        async function loadStoregedData(){

            const plantsStoraged = await LoadPlant()

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            )

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} em aproximandamente ${nextTime}`
            )

                setMyPlants(plantsStoraged)
                setLoading(false)

        }

        loadStoregedData()

    })



    return(
        <View style={styles.container}>
            <Header />  
            <View style={styles.spotLight}>
                <Image  
                source={waterdrop}
                style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>

                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <Text>
                            <PlantCardSecundary
                            
                            data={item}

                            />
                        </Text>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />

            </View>


        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },

    spotLight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    spotLightImage: {
        width: 60,
        height: 60,
    },

    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'center',
    },

    plants: {
        flex: 1,
        width: '100%',
    },

    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }

})