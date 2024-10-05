import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import teacherSignup from '../teacher/Signup';
import Home from '../Home';
import teacherLogin from '../teacher/Login';
import Dashboard from '../student/Studenthome';
import studentLogin from '../student/Login'
import studentSignup from '../student/Signup';
import Odform from '../student/Odform';
import hodLogin from '../hod/Login';
import hodSignup from '../hod/Signup';
import ODInformation from '../student/Previousod';
import Teacherhome from '../teacher/Teacherhome'
import registeredodadvisor from '../teacher/registeredod';
import advisorviewdetails from '../teacher/viewdetails';
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
      <Stack.Screen name="Previousod" component={ODInformation}options={{ headerShown: false }}/>




     {/*teacher routes */}

     <Stack.Screen name="teacherLogin" component={teacherLogin} options={{ headerShown: false }} />
      <Stack.Screen name="teacherSignup" component={teacherSignup} options={{ headerShown: false }} />
      <Stack.Screen name="teacherHome" component={Teacherhome} options={{ headerShown: false }} />
      <Stack.Screen name="registeredodadvisor" component={registeredodadvisor} options={{headerShown:false}}/>
      <Stack.Screen name="viewdetails" component={advisorviewdetails} options={{headerShown:false}}/>
    
     
    
    {/* hod routes */}
      <Stack.Screen name="hodLogin" component={hodLogin}options={{ headerShown: false }}/>
      <Stack.Screen name="hodSignup" component={hodSignup}options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default Main;
