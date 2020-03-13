import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, Platform} from 'react-native';
import {Title, useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import isEqual from 'lodash/isEqual';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import {IconButton, Colors, Text} from 'react-native-paper';

import useAmiibos from '../../hooks/useAmiibos';
import useTypes from '../../hooks/useTypes';
import ItemAmiibo from '../../components/ItemAmiibo';
import Cart from '../../components/Cart';

const Home = () => {
  const {getAmiibosForType, getInitialState} = useAmiibos();
  const theme = useTheme();
  const [currentPag, setCurrentPag] = useState(1);
  const {getTypes} = useTypes();
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
        <View style={{paddingHorizontal: 15, paddingTop: 15}}>
          <Title>Select an Amiibo Type</Title>
          {types.length > 0 && (
            <View
              style={{
                borderWidth: 1,
                borderColor: theme.colors.backdrop,
                borderRadius: 4,
              }}>
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

        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          {currentPag < amiibos.length && (
            <IconButton
              icon="plus"
              color={theme.colors.primary}
              size={40}
              style={{borderColor: theme.colors.primary, borderWidth: 2}}
              onPress={moreAmiibos}
            />
          )}

          {currentPag >= amiibos.length && <Text>No More</Text>}
        </View>
      </ScrollView>
      <Cart />
    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
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
  input: {
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
  },
});

export default Home;
