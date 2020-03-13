import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'react-native-paper';
import Home from './Home';
const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.background,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: 'Amiibo Shopping'}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
