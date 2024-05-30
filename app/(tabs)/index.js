import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, SectionList, Button  } from 'react-native';
import TaskItem from '@/components/TaskItem';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


export default function TaskPage({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.openDrawer()} title="Filter" />
      ),
    });
  }, [navigation]);

  const [filter, setFilter] = useState(null);
  
  return (
    <SafeAreaView style={styles.content}>
      <ThemedView style={styles.tasksContainer}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section }) => {
            if (filter && item.title !== filter) {
              return null;
            }

            return (
              <View style={index === section.data.length - 1 ? { marginBottom: 30 } : {}}>
                <TaskItem title={item.title} date={item.date} />
              </View>
            );
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View>
              <ThemedText type='title'>{title}</ThemedText>
            </View>
          )}
          stickySectionHeadersEnabled={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  const { navigation } = props;
  const sectionTitles = DATA.map(section => section.title);

  return (
    <DrawerContentScrollView {...props}>
      {sectionTitles.map(title => (
        <DrawerItem
          key={title}
          label={title}
          onPress={() => {
            navigation.closeDrawer();
            setFilter(title);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}





// Styles
const styles = StyleSheet.create({
  tasksContainer: {
    padding: 14,
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 16,
    overflow: 'hidden',
  },
});


const DATA = [
  {
    title: "Today",
    data: [
      { title: "Task 1 is coming up and must be complete asap", date: "Today" },
      { title: "Task 2 is coming up and must be complete asap", date: "Today" },
      { title: "Task 3 is coming up and must be complete asap", date: "Today" }
    ]
  },
  {
    title: "Tomorrow",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 5 is coming up and must be complete asap", date: "Tomorrow" },
      { title: "Task 6 is coming up and must be complete asap", date: "Tomorrow" }
    ]
  },
  {
    title: "Next 7 Days",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Jun 1" },
      { title: "Task 5 is coming up and must be complete asap", date: "Jun 3" },
      { title: "Task 6 is coming up and must be complete asap", date: "Jun 5" }
    ]
  },
  {
    title: "Upcoming",
    data: [
      { title: "Task 4 is coming up and must be complete asap", date: "Aug 27" },
      { title: "Task 5 is coming up and must be complete asap", date: "Sep 4" },
      { title: "Task 6 is coming up and must be complete asap", date: "Sep 19" }
    ]
  }
];
