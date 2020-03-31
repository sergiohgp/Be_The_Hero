import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

import 'intl';
import 'intl/locale-data/jsonp/en-CA';

import * as MailComposer from 'expo-mail-composer';

import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Hello, ${incident.name}. I am getting in touch because I\'d like to help with the incident \'${incident.title}\' with the amount of ${Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(incident.value)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Hero of the incident: ${incident.title}`, 
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.phone}&&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <TouchableOpacity 
                    onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color='#e02041'/>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} from {incident.city} {incident.province}</Text>

                <Text style={styles.incidentProperty}>INCIDENT:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Value:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Save the day!</Text>
                <Text style={styles.heroTitle}>Be the Hero.</Text>

                <Text style={styles.description}>Get in touch:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Phone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}