type Card = {
  name: string;
  selected: boolean;
};

type Note = {
  id: string;
  title: string;
  completed: boolean;
};

type State = {
  notes: Array<Note>;
  button_state: boolean;
  cards: Array<Card>;
};

type Action =
  | {
      type: "add_note";
      note: string;
    }
  | {
      type: "done_note";
      id: string;
    }
  | {
      type: "delete_note";
      id: string;
    }
  | {
      type: "button_action";
    }
  | {
      type: "choose_action";
      name: string;
    }
  | {
      type: "unchoose_action";
      name: string;
    };

const compare_names = (card_name: string, request_name: string) => {
  let len = Math.max(card_name.length, request_name.length) - 1;
  return card_name.toLowerCase().substr(0, len) === request_name.toLowerCase().substr(0, len);
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "add_note":
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            id: Math.random().toString(36).substring(7),
            title: action.note,
            completed: false,
          },
        ],
      };

    case "done_note":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.id ? { ...note, completed: !note.completed } : note
        ),
      };

    case "delete_note":
      return {
        ...state,
        notes: state.notes.filter(({ id }) => id !== action.id),
      };

    case "button_action":
      return {
        ...state,
        button_state: true,
      };

    case "choose_action":
      return {
        ...state,
        cards: state.cards.map((card) =>
          compare_names(card.name, action.name) ? { ...card, selected: true } : card
        ),
      };
    
    case "unchoose_action":
      return {
        ...state,
        cards: state.cards.map((card) =>
          !compare_names(card.name, action.name) ? { ...card, selected: true } : card
        ),
      };


    default:
      throw new Error();
  }
};
