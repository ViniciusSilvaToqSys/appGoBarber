import 
    React, 
    { useEffect, 
      useRef, 
      useImperativeHandle, 
      forwardRef 
    } 
from 'react';
import { Container, TextInput, Icon } from './sytels';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';


interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { name, icon, ...rest}, ref,) => {
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({value: defaultValue});
    
    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputElementRef.current.focus();
            },
        };
    });

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value: string) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    },[fieldName, registerField]);

    return (
        <Container>
            <Icon name={icon} size={20} color="#666360"/>

            <TextInput 
                {...rest} 
                ref={inputValueRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360" 
                defaultValue={defaultValue}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}                
            />
        </Container>
    );
};

export default forwardRef(Input);