import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface ICustomText {
   // Text style
   style?: TextStyle;
   // Number of lines of the text
   numberOfLines?: number;
   // Function to trigger if text is pressed
   onPress?: () => void;
   // Id used for testing automation purposes
   testID?: string;
}

const styles = StyleSheet.create({
   text: {
      fontSize: 18,
   },
});

const CustomText: React.FunctionComponent<ICustomText> = ({
   style,
   testID,
   ...props
}) => {

   return (
      <Text
         testID={testID}
         accessibilityLabel={testID}
         style={{
            ...styles.text,
            ...style,
         }}
         {...props}
      >
      </Text>
   );
};

export default CustomText;
