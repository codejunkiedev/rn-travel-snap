import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
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
  keyboardAppearance,
  autoCapitalize,
  autoCorrect,
  onBlur,
  onFocus,
  error,
  touched,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleOnBlur = () => {
    setSelected(false);
    onBlur?.();
  };

  const handleOnFocus = () => {
    setSelected(true);
    onFocus?.();
  };

  return (
    <View style={[styles.container, selected && styles.selected, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder ?? label}
        secureTextEntry={secureTextEntry ?? false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? 'default'}
        // required to remove the outline on web
        style={[styles.input, Platform.OS === 'web' && { outline: 'none' }, inputStyle]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoCapitalize={autoCapitalize ?? 'none'}
        autoCorrect={autoCorrect ?? false}
        keyboardAppearance={keyboardAppearance ?? 'default'}
        textContentType={textContentType ?? 'none'}
      />
      {error && touched && <Text style={styles.error}>{error}</Text>}
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
  error: {
    fontSize: FONT_SIZE.EXTRA_SMALL,
    color: COLORS.DANGER,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginTop: 5,
    textAlignVertical: 'center',
  },
});
