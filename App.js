/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [menuData, setMenuData] = useState();
  const [mainMenuSelected, setMainMenuSelected] = useState();
  const [subMenuData, setSubMenuData] = useState();
  const [subMenuSelected, setSubMenuSelected] = useState();
  const [itemsSelected, setItemsSelected] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/menu')
      .then(req => {
        if (req) {
          req
            .json()
            .then(json => {
              setMenuData(json.data.MenuGroups);
              setMainMenuSelected(json.data.MenuGroups[0].id);
              setSubMenuData(json.data.MenuGroups[0].categories);
              setSubMenuSelected(json.data.MenuGroups[0].categories[0].id);
              console.log(json.data.MenuGroups);
            })
            .catch(e => {
              console.log(e, 'error');
            });
        } else {
        }
      })
      .catch(e => {
        console.log(e, 'error');
      });
  }, []);

  const renderMainView = mainMenu => {
    return (
      <View
        style={[
          styles.mainMenu,
          mainMenuSelected === mainMenu.id ? styles.selectedMainMenu : null,
        ]}>
        <TouchableOpacity
          onPress={() => {
            setMainMenuSelected(mainMenu.id);
            setSubMenuData(mainMenu.categories);
            setSubMenuSelected(mainMenu.categories[0].id);
          }}>
          <Text
            style={[
              styles.menuText,
              mainMenuSelected === mainMenu.id ? styles.selectedText : null,
            ]}>
            {mainMenu.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSubMainView = menuData => {
    return (
      <View
        style={[
          styles.submenu,
          subMenuSelected === menuData.id ? styles.selectedSubMenu : null,
        ]}>
        <TouchableOpacity onPress={() => setSubMenuSelected(menuData.id)}>
          <Text
            style={[
              styles.menuText,
              subMenuSelected === menuData.id ? styles.selectedText : null,
            ]}>
            {menuData.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItems = items => {
    return (
      items &&
      items.map(item => {
        const isNotSelected =
          itemsSelected.findIndex(sel => item.id === sel) < 0;
        return (
          <TouchableOpacity
            onPress={() => {
              if (isNotSelected) {
                setItemsSelected([...itemsSelected, item.id]);
              } else {
                setItemsSelected([
                  ...itemsSelected.filter(sel => sel !== item.id),
                ]);
              }
            }}>
            <View
              style={[
                styles.itemContainer,
                isNotSelected ? null : styles.itemSelectedContainer,
              ]}>
              <View style={styles.itemsubContainer}>
                <View style={styles.textContainer}>
                  <Text
                    style={styles.headingStyle}
                    numberOfLines={3}
                    ellipsizeMode={'tail'}>
                    {item.name}
                    {item.name}
                    {item.name}
                  </Text>
                  <Text
                    style={styles.descriptionStyle}
                    numberOfLines={2}
                    ellipsizeMode={'tail'}>
                    {item.description}
                    {item.description}
                    {item.description}
                  </Text>
                </View>
                <View>
                  <Image
                    style={{height: 100, width: 100}}
                    source={{
                      uri:
                        'https://via.placeholder.com/300.png?text=' +
                        subMenuData.filter(i => i.id === subMenuSelected)[0]
                          .name,
                    }}
                  />
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {'$' + parseFloat(item.price).toFixed(2)}
                </Text>
                <Text>{'123 cal'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })
    );
  };

  return (
    <SafeAreaView style={styles.containerStyles}>
      <ScrollView
        style={styles.mainMenuContainer}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {menuData &&
          menuData.map(i => {
            return renderMainView(i);
          })}
      </ScrollView>
      <ScrollView
        style={styles.mainMenuContainer}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {subMenuData &&
          subMenuData.map(i => {
            return renderSubMainView(i);
          })}
      </ScrollView>
      <ScrollView bounces={false}>
        <View style={styles.itemsContainer}>
          {subMenuSelected &&
            renderItems(
              subMenuData.filter(i => i.id === subMenuSelected)[0].items,
            )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyles: {
    backgroundColor: '#fafafa',
    width: '100%',
    height: '100%',
  },
  mainMenuContainer: {
    height: 50,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    margin: 16,
    padding: 16,
    width: 400,
    height: 142,
    backgroundColor: '#ffffe5',
    borderColor: '#ffffe5',
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  headingStyle: {fontWeight: 'bold', marginRight: 10},
  descriptionStyle: {marginTop: 5, marginRight: 10},
  textContainer: {
    flexWrap: 'wrap',
    flex: 1,
    flexDirection: 'row',
  },
  itemSelectedContainer: {
    borderColor: '#c5e1a5',
    backgroundColor: '#ffecb3',
    shadowColor: '#c5e1a5',
  },
  itemsubContainer: {
    flexDirection: 'row',
  },
  priceContainer: {
    flexDirection: 'row',
  },
  price: {
    marginRight: 10,
  },
  mainMenu: {
    width: 200,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c3fdff',
  },
  selectedMainMenu: {
    backgroundColor: '#5d99c6',
  },
  submenu: {
    width: 200,
    maxHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d1d9ff',
  },
  selectedSubMenu: {
    backgroundColor: '#6f79a8',
  },
  menuText: {
    color: 'black',
  },
  selectedText: {
    color: 'white',
  },
});

export default App;
