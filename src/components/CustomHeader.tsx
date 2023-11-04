import React from 'react';
import {
   Dimensions,
   Platform,
   View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Text } from 'react-native-elements';

interface Props {
   // Left side header component
   leftComponent?: JSX.Element;
   // Center side header component
   centerComponent?: JSX.Element;
   // Right side header component
   rightComponent?: JSX.Element | null;
   // Title of the header
   title?: string;
}

const CustomHeader = ({
   leftComponent,
   centerComponent,
   rightComponent,
   title,
}: Props) => {
   const navigation = useNavigation();
   const { height } = Dimensions.get('window');

   const paddingTopHeader = Platform.OS === 'android' ? 21 : 20;
   const headerHeight = height * 0.12;
   const titleAux = !!title && title.length > 25 ? `${title.substring(0, 25)}...` : title;
   
   const centerAux = centerComponent || (
      <Text
         testID="autoTitle"
         style={{
            fontSize: 19,
            color: '#A3A2A2'
         }}
      >
         {titleAux}
      </Text>
   );

   return (
      <>
         <Header
            barStyle="dark-content"
            leftComponent={leftComponent}
            centerComponent={centerAux}
            rightComponent={rightComponent}
            containerStyle={{
               height: headerHeight,
               backgroundColor: '#282828',
            }}
            leftContainerStyle={{
               marginLeft: -4,
               marginTop: 5,
            }}
            rightContainerStyle={{
               marginRight: -4,
               marginTop: 5,
            }}
            centerContainerStyle={{
               justifyContent: 'center',
            }}
         />
         <View style={{borderBottomWidth: 4, borderBottomColor: '#E3E3E3'}}/>
      </>
   );
};

export default CustomHeader;
