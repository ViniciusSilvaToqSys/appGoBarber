import React, { useRef} from 'react';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { 
    Container, 
    Title, 
    BackToSignIn,
    BackToSignInText 
} from './styles';

import logoImg from '../../assets/logo.png'; // tem q criar o @types.d.ts
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
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
            <Title>Crie sua conta</Title>
            <Form ref={formRef} onSubmit={(data) => {
              console.log(data)
            }}>
              <Input 
                name="name" 
                icon="user" 
                placeholder="Nome"
              />
              <Input name="email" icon="mail" placeholder="E-mail"/>
              <Input name="password" icon="lock" placeholder="Password"/>
              <Button onPress={() => {
                formRef.current?.submitForm()
              }}>Entrar</Button>
            </Form>
          </Container>
        </ScrollView>
        </KeyboardAvoidingView> 
        <BackToSignIn onPress={() => navigation.navigate("SignIn")}>
            <Icon name="arrow-left" size={20} color="#fff" />
            <BackToSignInText>Voltar para Logon</BackToSignInText>
        </BackToSignIn>
    </>
  )
};

export default SignUp;

