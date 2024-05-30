import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TaskPage from './TaskPage';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {DATA.map((section, index) => (
        <Button
          key={index}
          title={section.title}
          onPress={() => {
            // Update the selected section and close the drawer
            props.navigation.navigate('TaskPage', { selectedSection: section.title });
            props.navigation.closeDrawer();
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="TaskPage">
      <Drawer.Screen name="TaskPage" component={TaskPage} />
    </Drawer.Navigator>
  );
}