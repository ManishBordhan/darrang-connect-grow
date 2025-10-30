// src/reducer/adminSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// --- TYPES ---
interface User { id: number; name: string; email: string; }
interface Alumnus { id: number; name: string; email: string; batch_degree: string; membership_type: string; status: 'Active'|'Pending'|'Expired'; user?: User; }
interface Payment { id: number|string; user_id: number; donation_id: number;  order_id?: string;  amount: number; status: 'Paid'|'Pending'|'Failed'|'Rejected'; created_at: string; user?: { alumni?: { name: string } }; donation?: { title: string }; }
interface Event { id: number; title: string; date: string; time: string; location: string; description?: string; }
interface NewsArticle { id: number; title: string; content: string; author: string; published_at: string; }
interface AppSettings { site_name: string; contact_email?: string; }
interface PaginationInfo { current_page?: number; last_page?: number; per_page?: number; total?: number; }

// --- API CLIENT ---
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --------------------- AUTH ---------------------
interface AuthState { user: User|null; token: string|null; status: 'idle'|'loading'|'succeeded'|'failed'; error: string|null; }

export const loginAdmin = createAsyncThunk<{token:string}, {email:string;password:string}, {rejectValue:string}>(
  'auth/loginAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiClient.post<{token:string}>('/login', credentials);
      localStorage.setItem('auth_token', response.data.token);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{error?:string}>;
      return rejectWithValue(error.response?.data?.error || "Login failed");
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('auth_token')||null, status: 'idle', error: null } as AuthState,
  reducers: {
    logoutAdmin: state => { state.user=null; state.token=null; localStorage.removeItem('auth_token'); }
  },
  extraReducers: builder => {
    builder
      .addCase(loginAdmin.pending, state => { state.status='loading'; state.error=null; })
      .addCase(loginAdmin.fulfilled, (state, action) => { state.status='succeeded'; state.token=action.payload.token; state.error=null; })
      .addCase(loginAdmin.rejected, (state, action) => { state.status='failed'; state.error=action.payload as string; });
  }
});
export const { logoutAdmin } = authSlice.actions;

// --------------------- DASHBOARD ---------------------
interface DashboardState { stats:any[]; collectionGrowth:any[]; membershipDistribution:any[]; recentPayments:any[]; recentRegistrations:any[]; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async (_, { rejectWithValue }) => {
  try {
    const [stats, growth, distribution, payments, registrations] = await Promise.all([
      apiClient.get('/dashboard/stats'),
      apiClient.get('/dashboard/collection-growth'),
      apiClient.get('/dashboard/membership-distribution'),
      apiClient.get('/dashboard/recent-payments'),
      apiClient.get('/dashboard/recent-registrations')
    ]);
    return {
      stats: stats.data||[],
      collectionGrowth: growth.data||[],
      membershipDistribution: distribution.data||[],
      recentPayments: payments.data||[],
      recentRegistrations: registrations.data||[]
    };
  } catch(err) {
    return rejectWithValue('Failed to fetch dashboard data');
  }
});

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { stats:[], collectionGrowth:[], membershipDistribution:[], recentPayments:[], recentRegistrations:[], status:'idle', error:null } as DashboardState,
  reducers:{},
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardData.pending, state => { state.status='loading'; state.error=null; })
      .addCase(fetchDashboardData.fulfilled, (state, action) => { state.status='succeeded'; Object.assign(state, action.payload); })
      .addCase(fetchDashboardData.rejected, (state, action) => { state.status='failed'; state.error=action.payload as string; });
  }
});

// --------------------- ALUMNI ---------------------
interface AlumniState { list:Alumnus[]; pagination:PaginationInfo; selectedHistory:Payment[]; status:'idle'|'loading'|'succeeded'|'failed'; historyStatus:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchAllAlumni = createAsyncThunk('alumni/fetchAll', async (filters:Record<string,any>={}, {rejectWithValue})=>{
  try { const res = await apiClient.get('/alumni',{params:filters}); return res.data; } 
  catch(err){ return rejectWithValue('Failed to fetch alumni'); }
});

export const fetchAlumniPaymentHistory = createAsyncThunk('alumni/fetchHistory', async (alumniId:number,{rejectWithValue})=>{
  try { const res = await apiClient.get(`/alumni/${alumniId}/payment-history`); return res.data; } 
  catch(err){ return rejectWithValue('Failed to fetch payment history'); }
});

export const alumniSlice = createSlice({
  name:'alumni',
  initialState:{ list:[], pagination:{}, selectedHistory:[], status:'idle', historyStatus:'idle', error:null } as AlumniState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchAllAlumni.pending, state=>{state.status='loading'; state.error=null;})
      .addCase(fetchAllAlumni.fulfilled, (state, action)=>{ state.status='succeeded'; state.list=action.payload.data||[]; const {data,...pagination}=action.payload; state.pagination=pagination||{}; })
      .addCase(fetchAllAlumni.rejected, (state, action)=>{ state.status='failed'; state.error=action.payload as string; })
      .addCase(fetchAlumniPaymentHistory.pending, state=>{state.historyStatus='loading'; state.error=null;})
      .addCase(fetchAlumniPaymentHistory.fulfilled, (state, action)=>{state.historyStatus='succeeded'; state.selectedHistory=action.payload||[];})
      .addCase(fetchAlumniPaymentHistory.rejected,(state, action)=>{state.historyStatus='failed'; state.error=action.payload as string;});
  }
});

// --------------------- PAYMENTS ---------------------
interface PaymentsState { list:Payment[]; pagination:PaginationInfo; stats:any[]; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchAllPayments = createAsyncThunk('payments/fetchAll', async (filters:Record<string,any>={}, {rejectWithValue})=>{
  try { const res=await apiClient.get('/payments',{params:filters}); return res.data; } 
  catch(err){ return rejectWithValue('Failed to fetch payments'); }
});

export const fetchPaymentStats = createAsyncThunk('payments/fetchStats', async (_,{rejectWithValue})=>{
  try { const res=await apiClient.get('/payments/stats'); return res.data; } 
  catch(err){ return rejectWithValue('Failed to fetch payment stats'); }
});

export const paymentsSlice = createSlice({
  name:'payments',
  initialState:{ list:[], pagination:{}, stats:[], status:'idle', error:null } as PaymentsState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchAllPayments.fulfilled,(state, action)=>{ state.list=action.payload.data||[]; const {data,...pagination}=action.payload; state.pagination=pagination||{}; state.status='succeeded'; })
      .addCase(fetchAllPayments.rejected,(state,action)=>{state.status='failed'; state.error=action.payload as string;})
      .addCase(fetchPaymentStats.fulfilled,(state, action)=>{ state.stats = action.payload||[]; })
      .addCase(fetchPaymentStats.rejected,(state,action)=>{state.error=action.payload as string;});
  }
});

// --------------------- PAYMENT REQUESTS ---------------------
export const fetchPaymentRequests = createAsyncThunk('requests/fetchAll', async (_, {rejectWithValue})=>{
  try { const res = await apiClient.get('/payment-requests'); return res.data; }
  catch(err){ return rejectWithValue('Failed to fetch payment requests'); }
});

export const approvePaymentRequest = createAsyncThunk('requests/approve', async (requestId:number|string, {rejectWithValue})=>{
  try { await apiClient.post(`/payment-requests/${requestId}/approve`); return requestId; } 
  catch(err){ return rejectWithValue('Failed to approve request'); }
});

export const rejectPaymentRequest = createAsyncThunk('requests/reject', async (requestId:number|string, {rejectWithValue})=>{
  try { await apiClient.post(`/payment-requests/${requestId}/reject`); return requestId; } 
  catch(err){ return rejectWithValue('Failed to reject request'); }
});

interface PaymentRequestsState { list:Payment[]; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const paymentRequestsSlice = createSlice({
  name:'paymentRequests',
  initialState:{ list:[], status:'idle', error:null } as PaymentRequestsState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchPaymentRequests.fulfilled,(state,action)=>{ state.list=action.payload; state.status='succeeded'; })
      .addCase(approvePaymentRequest.fulfilled,(state,action)=>{ state.list=state.list.filter(req=>req.id!==action.payload); })
      .addCase(rejectPaymentRequest.fulfilled,(state,action)=>{ state.list=state.list.filter(req=>req.id!==action.payload); });
  }
});

// --------------------- EVENTS ---------------------
interface EventsState { list:Event[]; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchAllEvents = createAsyncThunk('events/fetchAll', async (_,{rejectWithValue})=>{
  try { const res=await apiClient.get('/events'); return res.data||[]; } 
  catch(err){ return rejectWithValue('Failed to fetch events'); }
});

export const createEvent = createAsyncThunk('events/create', async (eventData:Omit<Event,'id'>,{rejectWithValue})=>{
  try { const res=await apiClient.post('/events', eventData); return res.data.event; } 
  catch(err){ return rejectWithValue('Failed to create event'); }
});

export const updateEvent = createAsyncThunk('events/update', async ({id,eventData}:{id:number,eventData:Omit<Event,'id'>},{rejectWithValue})=>{
  try { const res=await apiClient.put(`/events/${id}`, eventData); return res.data.event; } 
  catch(err){ return rejectWithValue('Failed to update event'); }
});

export const deleteEvent = createAsyncThunk('events/delete', async (eventId:number,{rejectWithValue})=>{
  try { await apiClient.delete(`/events/${eventId}`); return eventId; } 
  catch(err){ return rejectWithValue('Failed to delete event'); }
});

export const eventsSlice = createSlice({
  name:'events',
  initialState:{ list:[], status:'idle', error:null } as EventsState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchAllEvents.fulfilled,(state,action)=>{ state.list=action.payload; state.status='succeeded'; })
      .addCase(fetchAllEvents.rejected,(state,action)=>{ state.status='failed'; state.error=action.payload as string; })
      .addCase(createEvent.fulfilled,(state,action)=>{ state.list.unshift(action.payload); })
      .addCase(updateEvent.fulfilled,(state,action)=>{ const i = state.list.findIndex(e=>e.id===action.payload.id); if(i!==-1) state.list[i]=action.payload; })
      .addCase(deleteEvent.fulfilled,(state,action)=>{ state.list=state.list.filter(e=>e.id!==action.payload); });
  }
});

// --------------------- NEWS ---------------------
interface NewsState { articles:NewsArticle[]; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchAllNews = createAsyncThunk('news/fetchAll', async (_,{rejectWithValue})=>{
  try { const res=await apiClient.get('/news'); return res.data||[]; } 
  catch(err){ return rejectWithValue('Failed to fetch news'); }
});

export const newsSlice = createSlice({
  name:'news',
  initialState:{ articles:[], status:'idle', error:null } as NewsState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchAllNews.pending,state=>{state.status='loading'; state.error=null;})
      .addCase(fetchAllNews.fulfilled,(state,action)=>{ state.articles=action.payload; state.status='succeeded'; })
      .addCase(fetchAllNews.rejected,(state,action)=>{ state.status='failed'; state.error=action.payload as string; });
  }
});

// --------------------- SETTINGS ---------------------
interface SettingsState { data:AppSettings|null; status:'idle'|'loading'|'succeeded'|'failed'; error:string|null; }

export const fetchSettings = createAsyncThunk('settings/fetch', async (_,{rejectWithValue})=>{
  try { const res=await apiClient.get('/settings'); return res.data; } 
  catch(err){ return rejectWithValue('Failed to fetch settings'); }
});

export const updateSettings = createAsyncThunk('settings/update', async (settingsData:AppSettings,{rejectWithValue})=>{
  try { const res=await apiClient.post('/settings', settingsData); return res.data; } 
  catch(err){ return rejectWithValue('Failed to update settings'); }
});

export const settingsSlice = createSlice({
  name:'settings',
  initialState:{ data:null, status:'idle', error:null } as SettingsState,
  reducers:{},
  extraReducers: builder=>{
    builder
      .addCase(fetchSettings.pending,state=>{state.status='loading'; state.error=null;})
      .addCase(fetchSettings.fulfilled,(state,action)=>{ state.data=action.payload; state.status='succeeded'; })
      .addCase(fetchSettings.rejected,(state,action)=>{ state.status='failed'; state.error=action.payload as string; })
      .addCase(updateSettings.pending,state=>{state.status='loading'; state.error=null;})
      .addCase(updateSettings.fulfilled,(state,action)=>{ state.data=action.payload; state.status='succeeded'; })
      .addCase(updateSettings.rejected,(state,action)=>{ state.status='failed'; state.error=action.payload as string; });
  }
});

// ✅ EXPORT ALL SLICES
