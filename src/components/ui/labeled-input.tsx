import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { ILabeledInputProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { isDeviceWeb } from '@/constants';

// input component with label

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
  blurOnSubmit,
  editable,
  maxLength = 50,
  multiline,
  numberOfLines,
  onSubmitEditing,
  returnKeyType,
  textAlign,
  textAlignVertical,
  onBlur,
  onFocus,
  showTextCounter,
  error,
  touched,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  // called when an input field looses focus
  const handleOnBlur = () => {
    setSelected(false);
    onBlur?.();
  };

  // called when an input field is focused
  const handleOnFocus = () => {
    setSelected(true);
    onFocus?.();
  };

  const isTextLimit = useMemo(() => value.length >= maxLength, [value, maxLength]);

  return (
    <View style={[styles.container, selected && styles.selected, containerStyle]}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder ?? label}
        secureTextEntry={secureTextEntry ?? false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? 'default'}
        style={[styles.input, isDeviceWeb && webStyles, inputStyle]}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        autoCapitalize={autoCapitalize ?? 'none'}
        autoCorrect={autoCorrect ?? false}
        keyboardAppearance={keyboardAppearance ?? 'default'}
        textContentType={textContentType ?? 'none'}
        multiline={multiline ?? false}
        numberOfLines={numberOfLines ?? 1}
        maxLength={maxLength}
        onSubmitEditing={onSubmitEditing}
        returnKeyType={returnKeyType ?? 'done'}
        blurOnSubmit={blurOnSubmit ?? true}
        editable={editable ?? true}
        textAlign={textAlign ?? 'left'}
        textAlignVertical={textAlignVertical ?? multiline ? 'top' : 'center'}
      />
      {showTextCounter && (
        <Text style={[styles.counter, isTextLimit && styles.counterError]}>
          {value.length}/{maxLength}
        </Text>
      )}
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
  counter: {
    fontSize: FONT_SIZE.EXTRA_SMALL,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.POPPINS_REGULAR,
    marginTop: 5,
    textAlignVertical: 'center',
    alignSelf: 'flex-end',
  },
  counterError: {
    color: COLORS.DANGER,
  },
});

// required for web
const webStyles: any = {
  outline: 'none',
  placeholderTextColor: COLORS.LIGHT,
};
