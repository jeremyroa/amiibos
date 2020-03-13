import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import {IconButton, Text} from 'react-native-paper';

import useAmiibos from '../../hooks/useAmiibos';
import ItemAmiibo from '../../components/ItemAmiibo';
import Cart from '../../components/Cart';

const Home = () => {
  const {getAmiibosForType, getInitialState} = useAmiibos();
  const theme = useTheme();
  const [currentPag, setCurrentPag] = useState(1);
  const {amiibos, types} = useSelector(
    state => ({
      amiibos: _.chunk(Object.values(state.amiibos), 10),
      types: Object.values(state.types).map(({key, name}) => ({
        label: name,
        value: key,
      })),
    }),
    isEqual,
  );

  const moreAmiibos = () =>
    currentPag < amiibos.length ? setCurrentPag(currentPag + 1) : null;

  const changeSelect = value => {
    if (getAmiibosForType(value) !== null) {
      setCurrentPag(1);
    }
  };

  useEffect(() => {
    getInitialState();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: theme.colors.background}}>
        <View style={styles.containerSelect}>
          <Title>Select an Amiibo Type</Title>
          {types.length > 0 && (
            <View
              style={[
                styles.borderSelect,
                {borderColor: theme.colors.backdrop},
              ]}>
              <RNPickerSelect
                onValueChange={changeSelect}
                placeholder={{}}
                items={types}
              />
            </View>
          )}
        </View>

        {amiibos.length > 0 &&
          _.take(amiibos, currentPag)
            .flat()
            .map(({head, tail, amiiboSeries, name, type, image, price}) => (
              <ItemAmiibo
                key={head + tail}
                id={head + tail}
                price={price}
                amiiboSeries={amiiboSeries}
                name={name}
                image={image}
                type={type}
              />
            ))}

        <View style={styles.containerMoreButton}>
          {currentPag < amiibos.length && (
            <IconButton
              icon="plus"
              color={theme.colors.primary}
              size={40}
              style={[
                {borderColor: theme.colors.primary},
                styles.borderMoreButton,
              ]}
              onPress={moreAmiibos}
            />
          )}

          {currentPag >= amiibos.length && <Text>End Results</Text>}
        </View>
      </ScrollView>
      <Cart />
    </>
  );
};

const styles = StyleSheet.create({
  containerSelect: {paddingHorizontal: 15, paddingTop: 15},
  inputAndroid: {
    // fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  borderSelect: {
    borderWidth: 1,
    borderRadius: 4,
  },
  containerMoreButton: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 50,
  },
  borderMoreButton: {
    borderWidth: 2,
  },
});

export default Home;
