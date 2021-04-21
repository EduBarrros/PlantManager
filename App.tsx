import React from 'react'
import { Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import  Routes  from './src/routes'
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,

} from '@expo-google-fonts/jost'

export default function app() {
  const [ fontsloaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  if(!fontsloaded)
    return <AppLoading/>


  return (
    <Routes />
  )
}
