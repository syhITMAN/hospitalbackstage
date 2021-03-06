import InputContainer from './inputContainer';
import ConfigContainer from './configContainer';

const INITIAL_INPUT_CONFIG = {
    key: '',
    containerWidth: 500,
    isActive: false,
    breakLine: true,
    labelText: '标签',
    labelWeight: 400,
    labelWidth: 50,
    value: '',
    inputWidth: 150
};

export {
    InputContainer as Input,
    ConfigContainer as InputConfig,
    INITIAL_INPUT_CONFIG
};
