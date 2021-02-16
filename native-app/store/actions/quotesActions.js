import * as actionTypes from './actionTypes';
import * as FileSystem from 'expo-file-system';
import mockQuotes from './../../mockData/quotes.mock';

/**
 * Write the mock quotes in the csv file and set the state equal to the mock quotes.
 *
 * @param {string} fileUri, location of the csv file.
 */
export const setQuotes = (fileUri) => {
  return (dispatch) => {
    writeFile(mockQuotes, fileUri, dispatch, actionTypes.SET_QUOTES);
  };
};

/**
 * Remove a quote from the csv file and from the global state.
 *
 * @param {string} fileUri, location of the csv file.
 * @param {array} quotes, quotes saved in the global state.
 * @param {number} quoteId, id of the quote to remove.
 */
export const removeQuote = (fileUri, quotes, quoteId) => {
  const updatedQuotes = quotes.filter((quote) => quote.id !== quoteId);
  return (dispatch) => {
    writeFile(updatedQuotes, fileUri, dispatch, actionTypes.REMOVE_QUOTE);
  };
};

export const addQuote = (fileUri, quotes, newQuote) => {
  const updatedQuotes = quotes.slice();
  updatedQuotes.push({ id: quotes.length, text: newQuote });
  return (dispatch) => {
    writeFile(updatedQuotes, fileUri, dispatch, actionTypes.ADD_QUOTE);
  };
};

/**
 * Write the .csv file and update the global state once the writing of the .csv is finished.
 *
 * @param {array} updatedQuotes, updated quotes to write in the file system and in the global state.
 * @param {string} fileUri, location of the csv file.
 * @param {function} dispatch, function for dispatching an action.
 * @param {string} action, action to dispatch.
 */
const writeFile = (updatedQuotes, fileUri, dispatch, action) => {
  const quotes = updatedQuotes.map((quote) => quote.text);
  FileSystem.writeAsStringAsync(fileUri, quotes.join(';')).then(() => {
    dispatch({ type: action, payload: updatedQuotes });
  });
};

/**
 * Read the quotes saved in the csv file and set the state equal to the read quotes.
 *
 * @param {string} fileUri, location of the csv file.
 */
export const fetchQuotes = (fileUri) => {
  return (dispatch) => {
    FileSystem.readAsStringAsync(fileUri).then((data) => {
      const payload = data.split(';');
      let id = 0;
      const quotes = payload.map((quote) => {
        return { id: id++, text: quote };
      });
      dispatch({ type: actionTypes.SET_QUOTES, payload: quotes });
    });
  };
};
