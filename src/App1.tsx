import React from 'react';
// createGlobalStyle нужен для создания глобальных стилей
import styled, { createGlobalStyle } from 'styled-components';

// получаем значение для целевой платформы
import { sberBox } from '@sberdevices/plasma-tokens/typo';
// получаем стилевые объекты для нашего интерфейса
import { body1, headline2 } from '@sberdevices/plasma-tokens';

// получаем тему персонажа
import { darkEva, darkJoy, darkSber, lightEva } from '@sberdevices/plasma-tokens/themes';
// получаем цвета для нашего интерфейса
import { text, background, gradient } from '@sberdevices/plasma-tokens';

import { Button } from '@sberdevices/ui/components/Button/Button'

import {
    FC,
    memo,
    useReducer,
    useState,
    useRef,
    useEffect,
  } from "react";

import {
    createSmartappDebugger,
    createAssistant,
    AssistantAppState,
} from "@sberdevices/assistant-client";

import { reducer } from "./store";

const AppStyled = styled.div`
    padding: 30px;
    ${body1}
`;

// создаем react-компонент c глобальными стилями типографики
const TypoScale = createGlobalStyle(sberBox);

// создаем react-компонент для подложки
const DocStyles = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};

        /** необходимо залить градиентом всю подложку */
        min-height: 100vh;
    }
`;

// создаем react-компонент для персонажа
const Theme = createGlobalStyle(lightEva);

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

export const App: FC = memo(() => {
const [appState, dispatch] = useReducer(reducer, { notes: [] });

const [note, setNote] = useState("");

const assistantStateRef = useRef<AssistantAppState>();
const assistantRef = useRef<ReturnType<typeof createAssistant>>();

useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
    if (action) {
        dispatch(action);
    }
    });
}, []);

useEffect(() => {
    assistantStateRef.current = {
    item_selector: {
        items: appState.notes.map(({ id, title }, index) => ({
        number: index + 1,
        id,
        title,
        })),
    },
    };
}, [appState]);

return (
    <main className="container">
    {/* <Theme />
    <Button view='checked'>Kek</Button> */}
    <form
        onSubmit={(event) => {
        event.preventDefault();
        dispatch({ type: "add_note", note });
        setNote("");
        }}
    >
        <input
        className="add-note"
        type="text"
        placeholder="Add Note"
        value={note}
        onChange={({ target: { value } }) => setNote(value)}
        required
        autoFocus
        />
    </form>
    <ul className="notes">
        {appState.notes.map((note, index) => (
        <li className="note" key={note.id}>
            <span>
            <span style={{ fontWeight: "bold" }}>{index + 1}. </span>
            <span
                style={{
                textDecorationLine: note.completed ? "line-through" : "none",
                }}
            >
                {note.title}
            </span>
            </span>
            <input
            className="done-note"
            type="checkbox"
            checked={note.completed}
            onChange={() => dispatch({ type: "done_note", id: note.id })}
            />
        </li>
        ))}
    </ul>
    </main>
);
});

// const App = () => {
//     return (
//         <AppStyled>
//             {/* Используем глобальные react-компоненты один раз */}
//             <TypoScale />
//             <DocStyles />
//             <Theme />

//             <h2 style={headline2}>Hello Plasma Tokens</h2>
//             <div>
//                 <Button view='checked'>Kek</Button>
//                 <span>Сил человеческих хватает до известного предела.</span>
//                 <br />
//                 <span>Кто виноват, что именно этот предел играет решающую роль?</span>
//             </div>
//         </AppStyled>
//     );
// };

// export default App;
