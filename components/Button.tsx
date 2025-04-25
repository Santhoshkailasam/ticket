import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps
} from 'react-native';
import Colors from '@/constants/colors';
import Dimensions from '@/constants/dimensions';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  style,
  textStyle,
  ...props
}) => {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      borderRadius: Dimensions.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.6 : 1,
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = Dimensions.spacing.xs;
        baseStyle.paddingHorizontal = Dimensions.spacing.md;
        break;
      case 'large':
        baseStyle.paddingVertical = Dimensions.spacing.md;
        baseStyle.paddingHorizontal = Dimensions.spacing.xl;
        break;
      default: // medium
        baseStyle.paddingVertical = Dimensions.spacing.sm;
        baseStyle.paddingHorizontal = Dimensions.spacing.lg;
    }

    // Width style
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle.backgroundColor = Colors.dark.secondary;
        break;
      case 'outline':
        baseStyle.backgroundColor = 'transparent';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = Colors.dark.primary;
        break;
      case 'text':
        baseStyle.backgroundColor = 'transparent';
        break;
      default: // primary
        baseStyle.backgroundColor = Colors.dark.primary;
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle: TextStyle = {
      color: Colors.dark.text,
      fontWeight: '600',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle.fontSize = Dimensions.fontSize.sm;
        break;
      case 'large':
        baseStyle.fontSize = Dimensions.fontSize.lg;
        break;
      default: // medium
        baseStyle.fontSize = Dimensions.fontSize.md;
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        baseStyle.color = Colors.dark.primary;
        break;
      case 'text':
        baseStyle.color = Colors.dark.primary;
        break;
      default: // primary and secondary
        baseStyle.color = Colors.dark.text;
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'text' ? Colors.dark.primary : Colors.dark.text} />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});