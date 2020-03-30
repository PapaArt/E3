import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import style from './style';

import logoImg from '../../assets/e3.png';

export default function Games() {
    const [games, setGames] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(game) {
        navigation.navigate('Detail', {game});
    }
    async function loadGames() {
        if (loading) {
            return;
        }

        if (total > 0 && games.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('games', {
            params: {page}
        });

        setGames([...games, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadGames();
    }, []);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total of <Text style={style.headerTextBold}>{total} games</Text>.
                </Text>
            </View>

            <Text style={style.title}>Welcome!</Text>
            <Text style={style.description}>Choose one game to buy.</Text>

            <FlatList 
               data= {games}
               style={style.gameList}
               keyExtractor={game => String(game.id)}
               showsVerticalScrollIndicator={false}
               onEndReached={loadGames}
               onEndReachedThreshold={0.2}
               renderItem={({item: game}) => (
                <View style={style.game}>
                    <Text style={style.gameProperty}>ENTERPRISE:</Text>
                    <Text style={style.gameValue}>{game.name}</Text>

                    <Text style={style.gameProperty}>GAME:</Text>
                    <Text style={style.gameValue}>{game.title}</Text>

                    <Text style={style.gameProperty}>VALUE:</Text>
                    <Text style={style.gameValue}>{Intl.NumberFormat('en-US', 
                        {style: 'currency', 
                        currency: 'USD'})
                        .format(game.value)}
                    </Text>

                    <TouchableOpacity style={style.detailsButton} onPress ={() => navigateToDetail(game)}>

                        <Text style={style.detailsButtonText}>More details</Text>
                        <Feather name="arrow-right" size={16} color="#778899" />
                    </TouchableOpacity>
                </View>
               )} 
            />
        </View>
    );
}
