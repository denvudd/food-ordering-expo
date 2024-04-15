import React from "react";
import { TouchableWithoutFeedback, Keyboard, View, ViewProps } from "react-native";

const DismissKeyboardHOC = (Comp: typeof View) => {
  return ({ children, ...props }: ViewProps) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Comp {...props}>{children}</Comp>
    </TouchableWithoutFeedback>
  );
};

export const DismissKeyboardView = DismissKeyboardHOC(View);
