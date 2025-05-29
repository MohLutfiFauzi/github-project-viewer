// src/store/githubSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Repo = {
  id: string;
  name: string;
  description: string | null;
  language: string;
  html_url: string;
};

type GithubState = {
  username: string;
  repos: Repo[];
  readme: string;
  loading: boolean;
  error: string | null;
};

const initialState: GithubState = {
  username: "",
  repos: [],
  readme: "",
  loading: false,
  error: null,
};

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const fetchRepos = createAsyncThunk<
  Repo[],
  string,
  { rejectValue: string }
>("github/fetchRepos", async (username, { rejectWithValue }) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
    },
  });
  if (!res.ok) {
    return rejectWithValue(`User '${username}' not found on GitHub`);
  }
  const data = await res.json();
  return data;
});

export const fetchReadme = createAsyncThunk(
  "github/fetchReadme",
  async ({ username, repo }: { username: string; repo: string }) => {
    const res = await fetch(
      `https://api.github.com/repos/${username}/${repo}/readme`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    const data = await res.json();
    return decodeURIComponent(escape(atob(data.content)));
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.loading = false;
        state.repos = action.payload;
      })
      .addCase(fetchRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch repos";
        state.repos = [];
      })
      .addCase(fetchReadme.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.readme = "";
      })
      .addCase(fetchReadme.fulfilled, (state, action) => {
        state.loading = false;
        state.readme = action.payload;
      })
      .addCase(fetchReadme.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch README";
        state.readme = "";
      });
  },
});

export const { setUsername } = githubSlice.actions;
export default githubSlice.reducer;
