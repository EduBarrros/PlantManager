import { useNavigation, useRoute } from '@react-navigation/core'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { Button } from '../components/Button'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface Params{
    title: string,
    subTitle: string,
    buttonTitle: string,
    icon: 'smile' | 'hug',
    nextScreem: string
}

const emojis = {
    hug: '🤗',
    smile: '😁'
}

export function Confirmation() {
    const navigation = useNavigation()
    const routes = useRoute()

    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreem

    } = routes.params as Params

    function handleMoveOn(){
        navigation.navigate(nextScreem)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>

                <Text style={styles.title}>
                    {title}
                </Text>

                <Text style={styles.subTitle}>
                    {subTitle}
                </Text>

                <View style={styles.footer}>
                    <Button 
                     title={buttonTitle}
                     onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    emoji: {
        fontSize: 78,
    },

    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },

    subTitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingHorizontal: 10,
        color: colors.heading
    },

    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    }

})