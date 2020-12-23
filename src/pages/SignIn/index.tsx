import React, { useCallback, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Icon from 'react-native-vector-icons/Feather';


import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText,
} from './styles';

import logoImg from '../../assets/logo.png'; // tem q criar o @types.d.ts
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView,
    TextInput 
} from 'react-native';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return(
    <>  
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1}}
        >  
          <Container>
            <Image source={logoImg} />
            <Title>Faça seu Logon</Title>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input 
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email" 
                icon="mail" 
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input 
                ref={passwordInputRef}
                secureTextEntry
                name="password" 
                icon="lock" 
                placeholder="Password"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm()
                }}
              />
              <Button onPress={() => {
                  formRef.current?.submitForm();
                }}
                >
                  Entrar
              </Button>
            </Form>  
            <ForgotPassword onPress={() => {}} >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView> 
      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>Criar uma Conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  )
};

export default SignIn;

