import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Marker } from '../types/marker';

interface MarkerState {
  markers: Marker[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MarkerState = {
  markers: [],
  status: 'idle',
  error: null,
};

export const fetchMarkers = createAsyncThunk('markers/fetchMarkers', async () => {
  const response = await axios.get('http://localhost:3001/markers');
  return response.data;
});

export const addMarkerAsync = createAsyncThunk(
  'markers/addMarker',
  async (marker: Omit<Marker, 'id'>) => {
    const response = await axios.post('http://localhost:3001/markers', marker);
    return response.data;
  }
);

const markerSlice = createSlice({
  name: 'markers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarkers.fulfilled, (state, action: PayloadAction<Marker[]>) => {
        state.status = 'succeeded';
        state.markers = action.payload;
      })
      .addCase(fetchMarkers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addMarkerAsync.fulfilled, (state, action: PayloadAction<Marker>) => {
        state.markers.push(action.payload);
      });
  },
});

export default markerSlice.reducer;
