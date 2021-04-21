import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import colors from '../styles/colors'

import { Header } from '../components/Header'
import fonts from '../styles/fonts'
import { EnviromentoButton } from '../components/EnviromentButton'
import api from '../services/api'
import { PlantCardPrimary } from '../components/PlantCardPrimary'

import { Load } from '../components/load'



interface EnviromentsProps {
    key: string,
    title: string,
}

interface PlantProps {
    id: string,
    name: string,
    about: string,
    water_tips: string,
    photo: string,
    environments: [string],
    frequency: {
        times: number,
        repeat_every: string
    },
}


export function PlantSelect() {

    const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([])
    const [plants, setPlants] = useState<PlantProps[]>([])
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [enviromentSelected, setEnviromentSelected] = useState('all')
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)
    const [loadedAll, setLoadedAll] = useState(false)

    async function fetchPlants() {
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)

        if(!data)
            return setLoading(true)

        if(page>1){
            setPlants(oldvalue => [...oldvalue, ...data])
            setFilteredPlants(oldvalue => [...oldvalue, ...data])
        }else{
            setPlants( data )
            setFilteredPlants(data)
        }
            
        setLoading(false)
        setLoadingMore(false)
    }


    function handleEnviromentSelected(environment: string){
        setEnviromentSelected(environment)

        if(environment == 'all')
            return setFilteredPlants(plants)

        const filtered = plants.filter(plant => 
                plant.environments.includes(environment)
            )

        setFilteredPlants(filtered)
    }


    function handleFetchMore(distance: number){
        if(distance<1)
            return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants()
    }



    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')

            setEnviroments([
                {
                    key: 'all',
                    title: 'Todos',
                },

                ...data
            ])
        }

        fetchEnviroment()
    }, [])

    useEffect(() => {
        
        fetchPlants()
    }, [])

    if(loading)
        return <Load />
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subTitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={enviroments}
                    renderItem={({ item }) => (
                        <EnviromentoButton
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    contentContainerStyle={styles.enviromentList}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.plants}>
                <FlatList 
                
                data={filteredPlants}
                renderItem={({ item }) => (
                    <PlantCardPrimary 
                        data = { item }
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) => handleFetchMore(distanceFromEnd)}
                ListFooterComponent={
                    loadingMore ?
                    <ActivityIndicator color={colors.green}/>
                    :
                    null
                }
                />
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },

    subTitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    header: {
        paddingHorizontal: 30,

    },

    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },

    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },


})