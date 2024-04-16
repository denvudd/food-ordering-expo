import { TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../constants/Colors';
import { Link, Stack } from 'expo-router';
import { Text, View } from '@/components/Themed';
import Button from '@/components/ui/Button';
import { DismissKeyboardView } from '@/components/common/DismissKeyboard';

const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <DismissKeyboardView style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

      <Button
        onPress={() => {}}
        disabled={loading}
        text={loading ? 'Signing in...' : 'Sign in'}
      />
      <Link href="/sign-up" style={styles.textButton}>
        Create an account
      </Link>
    </DismissKeyboardView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    color: 'gray',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default SignInScreen;