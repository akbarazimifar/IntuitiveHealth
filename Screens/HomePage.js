import React, {useEffect} from 'react';
import { View, StyleSheet,AsyncStorage,Alert, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DescriptionCard from '../Components/DescpCard';
import Logo from '../assets/sliders/images/home.svg';
import Logo1 from '../assets/sliders/images/home1.svg';
import MyAppText from '../Components/MyAppText';
import Arrow from '../assets/sliders/images/arrow2.svg';
import axios from 'axios';
// import Card from '../assets/sliders/images/placard.svg'

const HomeScreen = (props) => {
    const [firstname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [doctors, setDoctors] = React.useState([]);
    const name = AsyncStorage.getItem('firstname').then(
        res => {
           setFirstName(res)
        }
      ).catch(err => console.log(err));
      const last_name = AsyncStorage.getItem('lastname').then(
        res => {
           setLastName(res)
        }
      ).catch(err => console.log(err));
      useEffect(() => {
        const id = AsyncStorage.getItem('Mytoken').then(
            res => {
               console.log('home', res)
                axios.get('https://conduit.detechnovate.net/public/api/conduithealth/doctors/1', {headers: {Authorization: res}})
                .then(
                    res => {
                        console.log("home", res.data)
                        const doctors = res.data.data;
                        setDoctors(doctors);
                        // const profile = res.data.data;
                        // const lastname = profile.last_name;
                        // const firstname = profile.name;
                        // const email = profile.email;
                        // const occupation = profile.occupation;
                        // const location = profile.location;
                        // setFirstname(firstname);
                        // setLastname(lastname);
                        // setEmail(email);
                        // setOccupation(occupation)
                        // setLocation(location)
                       
                    }
                )
                .catch(err => {
                    const code = err.response.status;
                    if (code === 401) {
                        Alert.alert(
                            'Error!',
                            'Expired Token',
                            [
                              {text: 'OK', onPress: () => signOut()},
                            ],
                            { cancelable: false }
                          )
                      
                    } else {
                        showLoaded(true)
                        Alert.alert(
                            'Network Error',
                            'Please Try Again',
                            [
                              {text: 'OK', onPress: () => setShowBtn(true)},
                            ],
                            { cancelable: false }
                          )
                    }
    
                      
                      console.log(err.response.status)
    
                })
            }
        )
        .catch( err => {console.log(err)}) 
        
    
      }, []);
      const fullname = `${firstname.slice(0, 1).toUpperCase()}${lastname.slice(0, 1).toUpperCase()}`
    return (
        <ScrollView style= {styles.container}>
        <TouchableOpacity onPress= {()=> props.navigation.navigate('Profile')}>
        <View style= {styles.firstCont}>
                    <View style= {styles.circle}>
                        <Text style= {styles.circleText}>
                            {fullname}
                        </Text>
                    </View>
                <View>
                    <MyAppText style= {styles.textStyle1}>
                        {firstname.toUpperCase()}
                    </MyAppText>
                    <MyAppText style= {styles.textStyle2}>View and edit profile</MyAppText>
                    <MyAppText style= {styles.textStyle3}>100% complete</MyAppText>
                </View>
                <Arrow width= {35} height= {35} />
           </View>
        </TouchableOpacity>
        <View style= {styles.secondCont}>
            <TouchableOpacity onPress= {()=> props.navigation.navigate('Practise')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                            <Logo width= {100} height= {120} />
                        </View>
                        <View style= {styles.textContainer}>
                            <MyAppText style= {styles.boldText}>Find a doctor</MyAppText>
                            <MyAppText style= {styles.textStyle4}>Get virtual consultation online with doctors on the go.</MyAppText>
                            <MyAppText style= {styles.textStyle2}>Find Doctor</MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        <View style= {styles.secondCont}>
            <TouchableOpacity  onPress= {()=> props.navigation.navigate('Medical Records')}>
                    <View style= {styles.card}>
                        <View style= {styles.imgCont}>
                            <Logo1 width= {100} height= {120} />
                        </View>
                        <View style= {styles.textContainer}>
                            <MyAppText style= {styles.boldText}>View Medical Records</MyAppText>
                            <MyAppText style= {styles.textStyle2}>View Now</MyAppText>
                        </View>
                    </View>
            </TouchableOpacity>
        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <MyAppText style= {{...styles.bolderText, ...styles.textColor}}>Doctors You Have Contacted</MyAppText>
                <MyAppText onPress= {()=> props.navigation.navigate('My Doctors')} style= {{...styles.bolderText, ...styles.textStyle2}}>View All</MyAppText>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                {doctors.map(
                    (doctor, index) => {
                        return (
                            <View key= {index}>
                                <DescriptionCard source= {{uri: doctor.image}}
                                name= {`${doctor.name} ${doctor.last_name}`}
                                thumbimg = {styles.thumbimg}
                            />
                            </View>
                        )
                    }
                )}
            </ScrollView>
        </View>
        <View style= {styles.imageStyleContainer}>
            <TouchableOpacity>
            <Image 
                style= {styles.imageDim}
                source= {require('../assets/sliders/images/plan_card.png')} />
            </TouchableOpacity>

        </View>
        <View style= {styles.lowerContainer}>
            <View style= {styles.pageDesc}>
                <MyAppText style= {{...styles.bolderText, ...styles.textColor}}>Chat with Top Doctors</MyAppText>
            </View>
            <ScrollView showsHorizontalScrollIndicator= {false}  horizontal>
                <DescriptionCard source={require('../assets/sliders/images/thumbs6.png')}
                name= "Having issues with you skin?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumbs7.png')}
                name= "Not sure of your hormone system?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
                <DescriptionCard source={require('../assets/sliders/images/thumbs8.png')}
                name= "Not sure of your hormone system?"
                title= "Dermatologists"
                consult= "Consult Now"
                thumbimg = {styles.biggerThumb}
                />
            </ScrollView>
        </View>
        

            
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7FA',
    },
    biggerThumb: {
        width: '100%',
        height: 80
    },
    imageStyleContainer: {
        marginVertical: 10
    },
    thumbimg: {
        width: 80,
        height: 80,
        borderRadius: 80,
        marginTop: 20,
        resizeMode: 'contain'
    },
    bolderText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    imageDim: {
        width: '100%',
        height: 240
    },
    textContainer: {
        width: '60%'
    },
    pageDesc: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    firstCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 15
    },
    secondCont: {
        paddingHorizontal: 30
    },
    lowerContainer: {
        paddingHorizontal: 30,
        marginVertical: 10
    },
    card: {
        backgroundColor: 'white',
        minHeight: 120,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 30,
        marginBottom: 20,
    },
    imageStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    imageStyle2: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    },
    imageStyle3: {
        width: 150,
        height: 100,
        resizeMode: 'contain'
    },
    colorText: {
        color: '#6C0BA9'
    },
    boldText: {
        fontSize: 18,
        marginBottom: 3,
        fontWeight: 'bold',
        color: '#464646'
    },
    textStyle1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F1F1F',

    },
    textStyle2: {
        color: '#6C0BA9',
        marginVertical: 3
    },
    textStyle3: {
        color: '#9B9B9B'
    },
    textStyle4: {
        color: '#9B9B9B',
        marginVertical: 2,
        fontSize: 15
    },
    circleText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white'
    },
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.18,
        height: Dimensions.get('window').width * 0.18,
        backgroundColor:'#6C0BA9',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default HomeScreen