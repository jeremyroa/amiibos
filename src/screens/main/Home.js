import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {Title, useTheme, ActivityIndicator} from 'react-native-paper';
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
  const [loading, setLoading] = useState(true);
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

  const changeSelect = async value => {
    value && setLoading(true);
    if ((await getAmiibosForType(value)) !== null) {
      setCurrentPag(1);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await getInitialState();
      setLoading(false);
    };
    fetch();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollView
        style={{backgroundColor: theme.colors.background}}
        contentContainerStyle={styles.innerGrow}>
        {!!amiibos.length && (
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
        )}

        {amiibos.length > 0 &&
          !loading &&
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

        {loading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator />
          </View>
        )}

        <View style={styles.containerMoreButton}>
          {currentPag < amiibos.length && !loading && (
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

          {currentPag >= amiibos.length && !loading && <Text>End Results</Text>}
        </View>
      </ScrollView>
      <Cart />
    </>
  );
};

const styles = StyleSheet.create({
  containerSelect: {paddingHorizontal: 15, paddingTop: 15},
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
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerGrow: {flexGrow: 1},
});

export default Home;
