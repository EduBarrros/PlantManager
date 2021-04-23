import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Welcome } from '../pages/Welcome'
import color from '../styles/colors'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSelect } from '../pages/PlantSelect'
import { PlantSave } from '../pages/PlantSave'
import { MyPlants } from '../pages/MyPlants'
import AuthRouts from './tab.routes'

const stackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: color.white
            }
        }}
    >

        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}

        />

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}

        />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}

        />

        <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRouts}

        />

        <stackRoutes.Screen 
            name="PlantSave"
            component={PlantSave}
        
        />

        <stackRoutes.Screen 
            name="MyPlants"
            component={AuthRouts}
        />


    </stackRoutes.Navigator>
)

export default AppRoutes
