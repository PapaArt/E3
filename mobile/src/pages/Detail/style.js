import {StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

         game: {
         padding: 24,
         borderRadius: 8,
         backgroundColor: '#FFF',
         marginBottom: 16,
         marginTop: 25
     },
     
     gameProperty: {
         fontSize: 14,
         color: '#41414d',
         marginTop: 24,
         fontWeight: 'bold'
     },  

     gameValue: {
         marginTop: 8,
         fontSize: 15,
         color: '#737380'   
     },

     contactBox: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
     },

     incTitle: {
         fontWeight: 'bold',
         fontSize: 20,
         color: '#13131a',
         lineHeight: 30,
     },

     incDescription: {
         fontSize: 15,
         color: '#737380',
         marginTop: 16,
     },

     actions: {
         marginTop: 16,
         flexDirection: 'row',
         justifyContent: 'space-between',
     },

     action: {
         backgroundColor: '#778899',
         borderRadius: 8,
         height: 50,
         width: '48%',
         justifyContent: 'center',
         alignItems: 'center'
     },

     actionText: {
         color: '#F8F8FF',
         fontSize: 15,
         fontWeight: 'bold'
     },
});