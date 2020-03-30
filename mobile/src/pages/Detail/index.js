import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import style from './style';

import logoImg from '../../assets/e3.png';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const game = route.params.game;
    const message = `Hello ${game.name}, I am buying the pre-purchase of your game "${game.title}" for ${Intl.NumberFormat('en-US', 
    {style: 'currency', currency: 'USD'}).format(game.value)}.`

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Game purchase: ${game.title}`,
            recipients: [game.email],
            body: message,
        })
    }

    function sendWP() {
        Linking.openURL(`whatsapp://send?phone=${game.whatsapp}&text=${message}`);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack} >
                    <Feather name="arrow-left" size={28} color='#778899' />
                </TouchableOpacity>
            </View>

            <View style={style.game}>
                    <Text style={[style.gameProperty, {marginTop: 0}]}>ENTERPRISE:</Text>
                    <Text style={style.gameValue}>{game.name} from {game.city}/{game.uf}</Text>

                    <Text style={style.gameProperty}>GAME:</Text>
                    <Text style={style.gameValue}>{game.title}</Text>

                    <Text style={style.gameProperty}>VALUE:</Text>
                    <Text style={style.gameValue}>{Intl.NumberFormat('en-US', 
                        {style: 'currency', 
                        currency: 'USD'})
                        .format(game.value)}
                    </Text>

            </View>

            <View style={style.contactBox}>
                <Text style={style.incTitle}>Buy the game!</Text>   

                <Text style={style.incDescription}>Get in touch:</Text>            

                <View style={style.actions}>
                    <TouchableOpacity style={style.action} onPress={sendWP}>
                        <Text style={style.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.action} onPress={sendMail}>
                        <Text style={style.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}