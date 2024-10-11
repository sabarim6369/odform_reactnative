import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import teacherSignup from '../teacher/Registeration/Signup';
import Home from '../Home';
import teacherLogin from '../teacher/Registeration/Login';
import Dashboard from '../student/Studenthome';
import studentLogin from '../student/Login'
import studentSignup from '../student/Signup';
import Odform from '../student/Odform';
import hodLogin from '../hod/Login';
import hodSignup from '../hod/Signup';
import ODInformationexternal from '../student/Previousodexternal';
import ODinformationinternal from '../student/previousodinternal'
import Teacherhome from '../teacher/Teacherhome'
import registeredodadvisor from '../teacher/registeredod/registeredod';
import advisorviewdetails from '../teacher/viewdetails';
import acceptedod from './../teacher/history/accepted';
import rejectedod from './../teacher/history/rejected'
import hodhome from '../hod/hodhome';
import registeredhod from '../hod/registeredod'
import coehome from '../COE/coehome';
import coelogin from '../COE/login';
import coesignup from '../COE/signup';
import registeredodcoe from '../COE/registeredod';
import studentlist from '../teacher/studentList/studentlist';
import studentdetails from '../teacher/studentList/studentdetails'
const Stack = createStackNavigator();

function Main() {
  return (
    <Stack.Navigator initialRouteName="Home">
     {/*home route */}

     <Stack.Screen name="Home" component={Home}options={{ headerShown: false }}  />


      {/*students routes*/}
      <Stack.Screen name="studentLogin" component={studentLogin} options={{ headerShown: false }} />
      <Stack.Screen name="studentSignup" component={studentSignup}options={{ headerShown: false }}   />
      <Stack.Screen name="Studenthome" component={Dashboard}options={{ headerShown: false }}/>
      <Stack.Screen name="odform" component={Odform}options={{ headerShown: false }}/>
      <Stack.Screen name="Previousodexternal" component={ODInformationexternal}options={{ headerShown: false }}/>
      <Stack.Screen name="Previousodinternal" component={ODinformationinternal}options={{ headerShown: false }}/>




     {/*teacher routes */}

     <Stack.Screen name="teacherLogin" component={teacherLogin} options={{ headerShown: false }} />
      <Stack.Screen name="teacherSignup" component={teacherSignup} options={{ headerShown: false }} />
      <Stack.Screen name="teacherHome" component={Teacherhome} options={{ headerShown: false }} />
      <Stack.Screen name="registeredodadvisor" component={registeredodadvisor} options={{headerShown:false}}/>
      <Stack.Screen name="viewdetails" component={advisorviewdetails} options={{headerShown:false}}/>
      <Stack.Screen name="acceptedodadvisor" component={acceptedod} options={{headerShown:false}}/>
      <Stack.Screen name="rejectedodadvisor" component={rejectedod} options={{headerShown:false}}/>
      <Stack.Screen name="studentlist" component={studentlist} options={{headerShown:false}}/>
      <Stack.Screen name="studentdetails" component={studentdetails} options={{headerShown:false}}/>
    
     
    
    {/* hod routes */}
      <Stack.Screen name="hodLogin" component={hodLogin}options={{ headerShown: false }}/>
      <Stack.Screen name="hodSignup" component={hodSignup}options={{ headerShown: false }}/>
      <Stack.Screen name="hodhome" component={hodhome}options={{ headerShown: false }}/>
      <Stack.Screen name="registeredodhod" component={registeredhod}options={{ headerShown: false }}/>

     {/* COE routes */}
     <Stack.Screen name="coehome" component={coehome}options={{ headerShown: false }}/>
     <Stack.Screen name="coeLogin" component={coelogin}options={{ headerShown: false }}/>
     <Stack.Screen name="coesignup" component={coesignup}options={{ headerShown: false }}/>
     <Stack.Screen name="registeredodcoe" component={registeredodcoe}options={{ headerShown: false }}/>



    </Stack.Navigator>

      
  );
}

export default Main;
