import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContinent, defaultValue } from 'app/shared/model/continent.model';

export const ACTION_TYPES = {
  FETCH_CONTINENT_LIST: 'continent/FETCH_CONTINENT_LIST',
  FETCH_CONTINENT: 'continent/FETCH_CONTINENT',
  CREATE_CONTINENT: 'continent/CREATE_CONTINENT',
  UPDATE_CONTINENT: 'continent/UPDATE_CONTINENT',
  DELETE_CONTINENT: 'continent/DELETE_CONTINENT',
  RESET: 'continent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContinent>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContinentState = Readonly<typeof initialState>;

// Reducer

export default (state: ContinentState = initialState, action): ContinentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTINENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTINENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTINENT):
    case REQUEST(ACTION_TYPES.UPDATE_CONTINENT):
    case REQUEST(ACTION_TYPES.DELETE_CONTINENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTINENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTINENT):
    case FAILURE(ACTION_TYPES.CREATE_CONTINENT):
    case FAILURE(ACTION_TYPES.UPDATE_CONTINENT):
    case FAILURE(ACTION_TYPES.DELETE_CONTINENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTINENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTINENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTINENT):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTINENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTINENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/continents';

// Actions

export const getEntities: ICrudGetAllAction<IContinent> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTINENT_LIST,
  payload: axios.get<IContinent>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContinent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTINENT,
    payload: axios.get<IContinent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContinent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTINENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContinent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTINENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContinent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTINENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
