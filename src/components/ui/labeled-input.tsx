import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { ILabeledInputProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';

export const LabeledInput: React.FC<ILabeledInputProps> = ({
  label,
  onChangeText,
  value,
  containerStyle,
  inputStyle,
  labelStyle,
  placeholder,
  secureTextEntry,
  keyboardType,
  textContentType,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  return (
    <View style={[styles.container, selected && styles.selected, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder ?? label}
        secureTextEntry={secureTextEntry ?? false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? 'default'}
        style={[styles.input, inputStyle]}
        onFocus={() => setSelected(true)}
        onBlur={() => setSelected(false)}
        textContentType={textContentType ?? 'none'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: COLORS.WHITE,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowOffset: { width: 0, height: 0 },
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  selected: {
    borderColor: COLORS.PRIMARY,
  },
  label: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_BOLD,
  },
  input: {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
  },
});
