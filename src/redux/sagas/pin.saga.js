import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// POST new pin to hockey_pins db
function* addPin(action) {
    try {
        yield axios.post('/api/pin', action.payload);
        yield put({ type: 'RESET_ADD_PIN' });
        yield put({ type: 'FETCH_PIN' });
    } catch (error) {
        console.log('Error adding pin', error);
    }
    console.log(action.payload)
};

// PUT pin tradeable status
function* updatePin(action) {
    try {

        yield axios.put(`/api/pin/tradeable/${action.payload.id}`, action.payload);
        console.log(action.payload.id, action.payload)
        yield put({ type: 'FETCH_PIN' });
    } catch (error) {
        console.log('Error updating pin', error);
    }
};

// DELETE pin from hockey_pins db
function* deletePin(action) {
    try {
        yield axios.delete(`/api/pin/${action.payload}`);
        yield put({ type: 'FETCH_PIN' });
    } catch (error) {
        console.log('Error deleting pin', error);
    }
};

// GET all pins to hockey_pins db
function* fetchPins(action) {
    try {
        if (action.payload) {
            console.log('shipping', action.payload)
            const pinResponse = yield axios.get(`/api/pin/${action.payload}`);
        }
        else {
            const pinResponse = yield axios.get('/api/pin');
        }
        yield put({ type: 'SET_PIN', payload: pinResponse.data });
    } catch (error) {
        console.log('Error getting pins', error);
    }
};

function* pinSaga() {
    yield takeLatest('FETCH_PIN', fetchPins);
    yield takeLatest('ADD_PIN', addPin);
    yield takeLatest('DELETE_PIN', deletePin);
    yield takeLatest('UPDATE_PIN_TRADEABLE', updatePin);

};

export default pinSaga;

