import { Text, TextInput, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import { ILabeledInputProps } from '@/interfaces';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '@/typography';
import { isDeviceWeb } from '@/constants';
import tw from 'twrnc';

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
    <View
      style={[
        tw`rounded-md p-2 bg-white elevation-3 shadow-md my-1 mx-2.5 border-2 border-white`,
        selected && { borderColor: COLORS.PRIMARY },
        containerStyle,
      ]}
    >
      <Text style={[tw`text-sm text-black`, { fontFamily: FONT_FAMILY.POPPINS_BOLD }, labelStyle]}>{label}</Text>
      <TextInput
        placeholder={placeholder ?? label}
        secureTextEntry={secureTextEntry ?? false}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType ?? 'default'}
        style={[
          tw`text-base text-black`,
          { fontFamily: FONT_FAMILY.POPPINS_REGULAR },
          isDeviceWeb && webStyles,
          inputStyle,
        ]}
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
        <Text
          style={[
            tw`text-xs text-black mt-1 text-right`,
            { fontFamily: FONT_FAMILY.POPPINS_REGULAR },
            isTextLimit && { color: COLORS.DANGER },
          ]}
        >
          {value.length}/{maxLength}
        </Text>
      )}
      {error && touched && (
        <Text style={[tw`mt-1 text-xs`, { color: COLORS.DANGER, fontFamily: FONT_FAMILY.POPPINS_REGULAR }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

// required for web
const webStyles: any = {
  outline: 'none',
  placeholderTextColor: COLORS.LIGHT,
};
