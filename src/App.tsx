import React from 'react';
// createGlobalStyle нужен для создания глобальных стилей
import { createGlobalStyle } from 'styled-components';
// получаем тему персонажа
import { darkSber } from '@sberdevices/plasma-tokens/themes';
// получаем цвета для нашего интерфейса
import {text, background, gradient, accent} from '@sberdevices/plasma-tokens';

import {createAssistant, createSmartappDebugger} from '@sberdevices/assistant-client'

import {Container, Header, Row, Col, Cell, CellIcon, TextBox, Button, Card, CardContent, TextBoxBigTitle, TextBoxSubTitle, TextBoxBiggerTitle} from '@sberdevices/ui';
import { reducer } from "./store";
import { gridMargins } from '@sberdevices/ui/utils';
import { headline1 } from '@sberdevices/plasma-tokens';


const DocStyles = createGlobalStyle`
  html {
    color: ${text};
    background-color: ${background};
    background-image: ${gradient};

    /** необходимо залить градиентом всю подложку */
    min-height: 100vh;
  }
`;

// создаем react-компонент для персонажа
const Theme = createGlobalStyle(darkSber);

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

const App = () => {

    return (
        <div>
            <Theme/>
            <DocStyles/>
            <Container>
                <Header
                    back={true}
                    logo="./logo192.png"
                    logoAlt="Logo"
                    title="Выберите уровень"
                    subtitle="10 слов дня"
                    onBackClick={() => console.log('Back click!')}
                >
                </Header>

                <Row>
                    <Col type="rel" size={1}></Col>
                    <Col type="rel" size={2}>
                        <Card style={{ width: '20rem' }}>
                            <CardContent compact>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <span style={headline1}>
                                Новичок
                                </span>
                                <TextBoxBigTitle></TextBoxBigTitle>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col type="rel" size={2}>
                        <Card style={{ width: '20rem' }}>
                            <CardContent compact>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <span style={headline1}>
                                Средний
                                </span>
                                <TextBoxBigTitle></TextBoxBigTitle>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col type="rel" size={1}></Col>
                </Row>

                <Row style={{margin: "20px"}}>
                    <Col type="rel" size={2}></Col>
                    <Col type="rel" size={2}>
                        <Card style={{ width: '20rem' }}>
                            <CardContent compact>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <TextBoxBigTitle></TextBoxBigTitle>
                                <span style={headline1}>
                                Опытный
                                </span>
                                <TextBoxBigTitle></TextBoxBigTitle>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col type="rel" size={2}></Col>
                </Row>
            </Container>
        </div>
    );
};

export default App;